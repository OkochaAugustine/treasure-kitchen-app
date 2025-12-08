// app/api/live-news/route.ts
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const res = await fetch(
      "https://api.currentsapi.services/v1/latest-news?category=food,wellness&language=en",
      {
        headers: {
          Authorization: "f8pWi6KeshSASXyFZgt3fyZQtgBZ4XLgV6PpnEdTZsnRwVjx", // Your secret API key
        },
      }
    );

    if (!res.ok) {
      throw new Error(`Currents API error: ${res.status}`);
    }

    const data = await res.json();

    // Send back only first 5 articles to keep it light
    const news = data.news?.slice(0, 5).map((article: any) => ({
      title: article.title || "Untitled",
      description: article.description || "",
      url: article.url || "#",
      image: article.image || "/images/hero-bg.jpg",
      published: article.published || "",
      source: article.source || "",
    })) || [];

    return NextResponse.json({ news });
  } catch (err) {
    console.error("Failed to fetch live news:", err);
    return NextResponse.json({
      news: [
        {
          title: "Welcome to Treasure Kitchen!",
          description: "Check back later for fresh food and wellness news.",
          url: "#",
          image: "/images/hero-bg.jpg",
          published: "",
          source: "Treasure Kitchen",
        },
      ],
    });
  }
}
