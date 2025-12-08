// app/api/live-news/route.ts
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const res = await fetch(
      `https://api.currentsapi.services/v1/latest-news?apiKey=f8pWi6KeshSASXyFZgt3fyZQtgBZ4XLgV6PpnEdTZsnRwVjx&category=food,wellness&language=en`
    );

    if (!res.ok) {
      console.error("Currents API error:", res.status, res.statusText);
      throw new Error("Failed to fetch news");
    }

    const data = await res.json();

    // Only return news array
    return NextResponse.json({ news: data.news || [] });
  } catch (err) {
    console.error("Error fetching live news:", err);

    // Fallback news if API fails
    return NextResponse.json({
      news: [
        {
          title: "Welcome to Treasure Kitchen!",
          image: "/images/hero-bg.jpg",
          url: "#",
        },
      ],
    });
  }
}

