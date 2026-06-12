const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

// For auth operations (login, register) — use ANON key
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

// For admin operations (createUser, bypass RLS) — use SERVICE ROLE key
const supabaseAdmin = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

module.exports = { supabase, supabaseAdmin };