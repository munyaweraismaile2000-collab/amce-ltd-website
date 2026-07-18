const SUPABASE_URL = "https://cranmxdtunqxdniueepv.supabase.co";

const SUPABASE_ANON_KEY = "sb_publishable_Fpx3GWmz5l6JK2-xTMKrdw_fs75Q2O3";

window.supabaseClient = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_ANON_KEY
);