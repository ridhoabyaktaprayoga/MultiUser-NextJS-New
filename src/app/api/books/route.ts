/* eslint-disable @typescript-eslint/no-unused-vars */
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const books = await prisma.book.findMany();
    return NextResponse.json(books);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch books" },
      { status: 500 }
    );
  }
}

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
      );
    }

    const newBook = await prisma.book.create({
      data: { title, author, price, description },
    });

    return NextResponse.json(newBook, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create book" },
      { status: 500 }
    );
  }
}
