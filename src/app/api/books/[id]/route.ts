/* eslint-disable @typescript-eslint/no-unused-vars */
import { prisma } from "@/lib/prisma";
import { NextResponse, NextRequest } from "next/server";

// CORS headers
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

// OPTIONS handler (Preflight)
export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

// GET: Ambil detail buku berdasarkan ID
export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const book = await prisma.book.findUnique({
      where: { id: Number(params.id) }, // pastikan ID adalah number
    });

    if (!book) {
      return NextResponse.json({ message: "Not Found" }, { status: 404, headers: corsHeaders });
    }

    return NextResponse.json(book, { headers: corsHeaders });
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500, headers: corsHeaders });
  }
}

// PUT: Update buku
export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { title, author, price, description } = await req.json();

    const updatedBook = await prisma.book.update({
      where: { id: Number(params.id) },
      data: { title, author, price, description },
    });

    return NextResponse.json(updatedBook, { headers: corsHeaders });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update book" }, { status: 400, headers: corsHeaders });
  }
}

// DELETE: Hapus buku
export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await prisma.book.delete({ where: { id: Number(params.id) } });
    return NextResponse.json({ message: "Deleted" }, { headers: corsHeaders });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete book" }, { status: 400, headers: corsHeaders });
  }
}
