import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// Service role key only on server
const supabase = createClient(
  "https://ulzvcktqhdielmkjrpwk.supabase.co",
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { data, error } = await supabase.from("order").insert([body]);

    if (error) {
      console.error("Supabase insert error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ data });
  } catch (err) {
    console.error("Unexpected error:", err);
    return NextResponse.json({ error: "Unexpected error occurred" }, { status: 500 });
  }
}
