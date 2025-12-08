import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export async function POST(req: Request) {
  try {
    const data = await req.json();

    if (!supabaseAdmin) {
      console.log("Supabase not initialized, skipping DB insert.");
      return NextResponse.json({ error: "Supabase not initialized" }, { status: 500 });
    }

    const { error } = await supabaseAdmin
      .from("orderz")
      .insert([{
        phone: data.phone,
        location: data.location,          // ✅ include location
        soup: data.soup,
        plates: data.plates,
        swallow: data.swallow,
        meattype: data.meattype,
        meatqty: data.meatqty,
        totalprice: data.totalprice,
        payment_status: "pending",
        created_at: new Date().toISOString(),
      }]);

    if (error) {
      console.error("Insert error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    console.log("Order inserted successfully:", data.phone);
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Unexpected error:", err);
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
