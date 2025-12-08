// app/api/admin/orders/confirm/route.ts
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export async function POST(req: Request) {
  try {
    const { id } = await req.json();

    if (!supabaseAdmin) {
      return new Response(JSON.stringify({ error: "Supabase not initialized" }), { status: 500 });
    }

    if (!id) return new Response(JSON.stringify({ error: "Order ID missing" }), { status: 400 });

    const { data: order, error: fetchError } = await supabaseAdmin
      .from("orderz")
      .select("*")
      .eq("id", id)
      .single();

    if (fetchError) return new Response(JSON.stringify({ error: fetchError.message }), { status: 404 });

    const { error: updateError } = await supabaseAdmin
      .from("orderz")
      .update({ payment_status: "confirmed" })
      .eq("id", id);

    if (updateError) return new Response(JSON.stringify({ error: updateError.message }), { status: 500 });

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (err) {
    console.error("Unexpected error:", err);
    return new Response(JSON.stringify({ error: "Unexpected error" }), { status: 500 });
  }
}
