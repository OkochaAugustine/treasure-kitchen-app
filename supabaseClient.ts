// supabaseClient.ts
import { createClient } from "@supabase/supabase-js";

// Use the values from your .env file
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Create a Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
