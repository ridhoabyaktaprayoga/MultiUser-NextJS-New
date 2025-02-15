import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

// Definisikan tipe untuk payload JWT
interface JwtPayload {
  id: number;
  email: string;
  role: "ADMIN" | "USER";
}

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  try {
    // Verifikasi token dan casting ke tipe JwtPayload
    const decoded = jwt.verify(
      token,
      process.env.NEXTAUTH_SECRET || "default_secret"
    ) as JwtPayload;

    // Proteksi halaman admin: jika role bukan ADMIN, redirect ke dashboard user
    if (req.nextUrl.pathname.startsWith("/dashboard/admin") && decoded.role !== "ADMIN") {
      return NextResponse.redirect(new URL("/dashboard/user", req.url));
    }

    // Proteksi halaman user: jika role bukan USER, redirect ke dashboard admin
    if (req.nextUrl.pathname.startsWith("/dashboard/user") && decoded.role !== "USER") {
      return NextResponse.redirect(new URL("/dashboard/admin", req.url));
    }

    return NextResponse.next();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (_error) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
