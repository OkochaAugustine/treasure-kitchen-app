import { NextResponse } from "next/server";

export async function GET() {
  try {
    const res = await fetch(
      `https://api.currentsapi.services/v1/latest-news?apiKey=90507567230b9c51ffb1a2d794ae95cd&category=food&language=en`
    );

    const data = await res.json();
    return NextResponse.json(data);
  } catch (err) {
    console.error("Failed to fetch news:", err);
    return NextResponse.json({ error: "Failed to fetch news" }, { status: 500 });
  }
}
