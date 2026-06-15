const { supabase, supabaseAdmin } = require('../config/supabase');

const registerUser = async (req, res) => {
  const { email, password, full_name } = req.body;

  try {
    // Check existing email safe handling
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
      return res.status(400).json({ success: false, message: 'Operator email is already registered' });
    }

    // Create user configuration state
    const { data, error } = await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: { full_name },
    });

    if (error) {
      const isDuplicate = error.message.toLowerCase().includes('already registered') || error.message.toLowerCase().includes('already exists');
      return res.status(isDuplicate ? 409 : 400).json({
        success: false,
        message: isDuplicate ? 'An account with this email already exists' : error.message,
      });
    }

    return res.status(201).json({
      success: true,
      message: 'Account created successfully.',
      data: { id: data.user.id, email: data.user.email, full_name },
    });

  } catch (catchErr) {
    console.error('Registration crash catch:', catchErr);
    return res.status(500).json({ success: false, message: 'Critical system registration failure.' });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }

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
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Internal authentication server exception.' });
  }
};

//LOGOUT

const logoutUser = async (req, res) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ success: false, message: 'No active session' });
  }


  const { error } = await supabase.auth.signOut();

  if (error) {
    return res.status(500).json({ success: false, message: 'Logout failed' });
  }

  return res.json({ success: true, message: 'Logged out successfully' });
};

const forgotPassword = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ success: false, message: 'Email is required' });
  }

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${process.env.FRONTEND_URL}/reset-password`,
  });

  if (error) {
    return res.status(500).json({ success: false, message: 'Failed to send reset email' });
  }

  return res.json({
    success: true,
    message: 'If an account with that email exists, a reset link has been sent',
  });
};

const resetPassword = async (req, res) => {
  const { access_token, new_password } = req.body;

  if (!access_token || !new_password) {
    return res.status(400).json({ success: false, message: 'Access token and new password are required' });
  }

  if (new_password.length < 8) {
    return res.status(400).json({ success: false, message: 'Password must be at least 8 characters' });
  }

  const { error: sessionError } = await supabase.auth.setSession({
    access_token,
    refresh_token: access_token,
  });

  if (sessionError) {
    return res.status(401).json({ success: false, message: 'Invalid or expired reset token' });
  }

  const { error } = await supabase.auth.updateUser({ password: new_password });

  if (error) {
    return res.status(500).json({ success: false, message: 'Failed to reset password' });
  }

  return res.json({ success: true, message: 'Password reset successfully. You can now log in.' });
};

module.exports = { registerUser, loginUser, logoutUser, forgotPassword, resetPassword };