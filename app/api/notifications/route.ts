import { supabaseAdmin } from "@/lib/supabaseAdmin";

export async function GET(req: Request) {
  if (!supabaseAdmin) {
    return new Response(JSON.stringify({ error: "Supabase not initialized" }), { status: 500 });
  }

  const url = new URL(req.url);
  const phone = url.searchParams.get("phone");

  if (!phone) {
    return new Response(JSON.stringify({ error: "Phone number required" }), { status: 400 });
  }

  const { data, error } = await supabaseAdmin
    .from("notifications")
    .select("*")
    .eq("phone", phone)
    .eq("read", false)
    .order("created_at", { ascending: false });

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }

  return new Response(JSON.stringify({ notifications: data }), { status: 200 });
}
