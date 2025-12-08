import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Define paths that require auth
const protectedPaths = ["/order"];

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("sb-access-token")?.value;

  // If user tries to access a protected path
  if (protectedPaths.some((path) => req.nextUrl.pathname.startsWith(path))) {
    if (!token) {
      // Redirect to register page if not authenticated
      return NextResponse.redirect(new URL("/register", req.url));
    }
  }

  return NextResponse.next();
}

// Apply middleware only to relevant routes
export const config = {
  matcher: ["/order/:path*", "/order"],
};
