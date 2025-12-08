// lib/supabaseAdmin.ts
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

if (!supabaseUrl || !anonKey) {
  console.warn("Supabase not initialized, missing environment variables.");
}

export const supabaseAdmin =
  supabaseUrl && anonKey
    ? createClient(supabaseUrl, anonKey)
    : null;

console.log("Supabase Admin initialized:", supabaseAdmin ? "✅" : "❌");
