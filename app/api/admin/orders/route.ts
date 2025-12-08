import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// Use anon key for server-side fetch (RLS must be disabled for admin orders table)
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL ?? "",
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? ""
);

export async function GET() {
  console.log("[DEBUG] Admin orders API called");

  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    console.error("[DEBUG] Supabase env variables missing");
    return NextResponse.json(
      { error: "Supabase env variables missing" },
      { status: 500 }
    );
  }

  try {
    // Fetch all orders from "orderz" table
    const { data, error } = await supabase
      .from("orderz") // correct table name
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("[DEBUG] Supabase fetch error:", error.message);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    console.log(`[DEBUG] Fetched ${data?.length || 0} orders`);
    return NextResponse.json({ orders: data });
  } catch (err) {
    console.error("[DEBUG] Unexpected error:", err);
    return NextResponse.json({ error: "Unexpected error occurred" }, { status: 500 });
  }
}
