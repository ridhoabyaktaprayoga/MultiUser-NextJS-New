/* eslint-disable @typescript-eslint/no-unused-vars */
import { prisma } from "@/lib/prisma";
import { NextResponse, NextRequest } from "next/server";

// Middleware CORS
const corsHeaders = {
  "Access-Control-Allow-Origin": "*", // Bisa diganti dengan domain spesifik
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

// Handle permintaan OPTIONS (Preflight Request)
export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

// GET: Ambil semua buku
export async function GET() {
  try {
    const books = await prisma.book.findMany();
    return NextResponse.json(books, { headers: corsHeaders });
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500, headers: corsHeaders });
  }
}

// POST: Tambah buku baru
export async function POST(req: NextRequest) {
  try {
    const { title, author, price, description } = await req.json();
    const newBook = await prisma.book.create({
      data: { title, author, price, description },
    });

    return NextResponse.json(newBook, { status: 201, headers: corsHeaders });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create book" }, { status: 400, headers: corsHeaders });
  }
}
