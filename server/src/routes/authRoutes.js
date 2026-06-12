// routes/auth.js

const router = require('express').Router();
const { supabase, supabaseAdmin } = require('../config/supabase');

// ─────────────────────────────────────────────
// POST /api/auth/register
// ─────────────────────────────────────────────
router.post('/register', async (req, res) => {
  const { email, password, full_name } = req.body;

  // 1. INPUT VALIDATION FIRST (Saves database overhead)
  if (!email || !password || !full_name) {
    return res.status(400).json({
      success: false,
      message: 'Email, password, and full name are required',
    });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({
      success: false,
      message: 'Invalid email format',
    });
  }

  if (password.length < 8) {
    return res.status(400).json({
      success: false,
      message: 'Password must be at least 8 characters',
    });
  }

  try {
    // 2. CHECK EXISTING EMAIL SAFE HANDLING
    const { data: existing, error: checkError } = await supabase
      .from('users')
      .select('email')
      .eq('email', email)
      .maybeSingle(); 
      
    if (checkError) {
      console.error('Database pre-check error:', checkError);
      return res.status(500).json({ success: false, message: 'Internal server safety check failed.' });
    }

    if (existing) {
      return res.status(400).json({ 
        success: false,
        message: 'Operator email is already registered' 
      });
    }

    // 3. CREATE USER IN SUPABASE AUTH
    const { data, error } = await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      email_confirm: true, // Note: if true, user is auto-confirmed, no verification email is required. Set to false if you want them to verify via email link.
      user_metadata: { full_name },
    });

    if (error) {
      const isDuplicate =
        error.message.toLowerCase().includes('already registered') ||
        error.message.toLowerCase().includes('already exists');

      return res.status(isDuplicate ? 409 : 400).json({
        success: false,
        message: isDuplicate
          ? 'An account with this email already exists'
          : error.message,
      });
    }

    return res.status(201).json({
      success: true,
      message: 'Account created successfully.',
      data: {
        id: data.user.id,
        email: data.user.email,
        full_name,
      },
    });

  } catch (catchErr) {
    console.error('Registration crash catch:', catchErr);
    return res.status(500).json({ success: false, message: 'Critical system registration failure.' });
  }
});

// ─────────────────────────────────────────────
// POST /api/auth/login
// ─────────────────────────────────────────────
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  console.log('=== LOGIN DEBUG ===');
  console.log('Body received:', req.body);
  console.log('Email:', email);
  console.log('Password:', password);


  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: 'Email and password are required',
    });
  }

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  console.log(data)
  console.log(error)
  

  if (error) {
    // Don't expose whether the email or password was wrong specifically
    return res.status(401).json({
      success: false,
      message: 'Invalid email or password',
    });
  }


  // Check email verification status
  // if (!data.user.email_confirmed_at) {
  //   return res.status(403).json({
  //     success: false,
  //     message: 'Please verify your email before logging in',
  //   });
  // }

  return res.json({
    success: true,
    message: 'Login successful',
    data: {
      access_token: data.session.access_token,
      refresh_token: data.session.refresh_token,
      expires_at: data.session.expires_at,
      user: {
        id: data.user.id,
        email: data.user.email,
        full_name: data.user.user_metadata?.full_name ?? null,
        email_verified: !!data.user.email_confirmed_at,
      },
    },
  });
});

// ─────────────────────────────────────────────
// POST /api/auth/logout
// ─────────────────────────────────────────────
router.post('/logout', async (req, res) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      success: false,
      message: 'No active session',
    });
  }

  const { error } = await supabase.auth.signOut();

  if (error) {
    return res.status(500).json({
      success: false,
      message: 'Logout failed',
    });
  }

  return res.json({
    success: true,
    message: 'Logged out successfully',
  });
});

// ─────────────────────────────────────────────
// POST /api/auth/forgot-password
// ─────────────────────────────────────────────
router.post('/forgot-password', async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({
      success: false,
      message: 'Email is required',
    });
  }

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${process.env.FRONTEND_URL}/reset-password`,
  });

  if (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to send reset email',
    });
  }

  // Always return success — never confirm if an email exists (security)
  return res.json({
    success: true,
    message: 'If an account with that email exists, a reset link has been sent',
  });
});

// ─────────────────────────────────────────────
// POST /api/auth/reset-password
// ─────────────────────────────────────────────
router.post('/reset-password', async (req, res) => {
  const { access_token, new_password } = req.body;

  if (!access_token || !new_password) {
    return res.status(400).json({
      success: false,
      message: 'Access token and new password are required',
    });
  }

  if (new_password.length < 8) {
    return res.status(400).json({
      success: false,
      message: 'Password must be at least 8 characters',
    });
  }

  // Set the session from the token provided in the reset email link
  const { error: sessionError } = await supabase.auth.setSession({
    access_token,
    refresh_token: access_token, // Supabase reset tokens are self-contained
  });

  if (sessionError) {
    return res.status(401).json({
      success: false,
      message: 'Invalid or expired reset token',
    });
  }

  const { error } = await supabase.auth.updateUser({
    password: new_password,
  });

  if (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to reset password',
    });
  }

  return res.json({
    success: true,
    message: 'Password reset successfully. You can now log in.',
  });
});

module.exports = router;