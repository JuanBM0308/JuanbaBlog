import { createClient } from '@supabase/supabase-js';
import { environment } from '@env/environment.prod';

export const supabase = createClient(environment.supabaseUrl, environment.supabaseKey, {
    auth: { persistSession: false },
    global: {
        headers: { 'Accept': 'application/json' },
    },
});
