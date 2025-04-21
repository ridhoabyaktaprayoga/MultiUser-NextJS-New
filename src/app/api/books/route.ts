/* eslint-disable @typescript-eslint/no-unused-vars */
import { prisma } from "@/lib/prisma";
import { NextResponse, NextRequest } from "next/server";

// Middleware CORS
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

// OPTIONS handler (Preflight request)
export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

// GET: Get all books
export async function GET() {
  try {
    const books = await prisma.book.findMany();
    return NextResponse.json(books, { headers: corsHeaders });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500, headers: corsHeaders }
    );
  }
}

// POST: Create a new book
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { title, author, price, description } = body;

    // Optional validation
    if (!title || !author || price === undefined || !description) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400, headers: corsHeaders }
      );
    }

    const newBook = await prisma.book.create({
      data: { title, author, price, description },
    });

    return NextResponse.json(newBook, { status: 201, headers: corsHeaders });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create book" },
      { status: 400, headers: corsHeaders }
    );
  }
}
