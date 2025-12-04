import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// Use service role key on server only
const supabase = createClient(
  "https://ulzvcktqhdielmkjrpwk.supabase.co",
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET() {
  try {
    const { data, error } = await supabase.from("order").select("*").order("created_at", { ascending: false });

    if (error) {
      console.error("Supabase fetch error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ orders: data });
  } catch (err) {
    console.error("Unexpected error:", err);
    return NextResponse.json({ error: "Unexpected error occurred" }, { status: 500 });
  }
}
