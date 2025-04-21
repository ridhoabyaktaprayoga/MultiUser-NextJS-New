/* eslint-disable @typescript-eslint/no-unused-vars */
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

<<<<<<< HEAD
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
=======
>>>>>>> 1c53abac87371bee113eff02548f880dd7ef961b
export async function GET() {
  try {
    const books = await prisma.book.findMany();
    return NextResponse.json(books);
  } catch (error) {
    return NextResponse.json(
<<<<<<< HEAD
      { error: "Internal Server Error" },
      { status: 500, headers: corsHeaders }
=======
      { error: "Failed to fetch books" },
      { status: 500 }
>>>>>>> 1c53abac87371bee113eff02548f880dd7ef961b
    );
  }
}

<<<<<<< HEAD
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
=======
export async function POST(req: Request) {
  try {
    const { title, author, price, description } = await req.json();

    // Validasi input
    if (!title || !author || price == null || !description) {
      return NextResponse.json(
        { error: "All fields (title, author, price, description) are required" },
        { status: 400 }
      );
    }

    // Pastikan price adalah angka
    if (typeof price !== "number") {
      return NextResponse.json(
        { error: "Price must be a number" },
        { status: 400 }
>>>>>>> 1c53abac87371bee113eff02548f880dd7ef961b
      );
    }

    const newBook = await prisma.book.create({
      data: { title, author, price, description },
    });

    return NextResponse.json(newBook, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create book" },
<<<<<<< HEAD
      { status: 400, headers: corsHeaders }
=======
      { status: 500 }
>>>>>>> 1c53abac87371bee113eff02548f880dd7ef961b
    );
  }
}
