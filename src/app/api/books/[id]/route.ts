/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// GET: Ambil buku berdasarkan ID
export async function GET(req: NextRequest, context: any) {
  try {
    const id = context.params.id as string; // Pastikan params.id adalah string

    const book = await prisma.book.findUnique({
      where: { id },
    });

    if (!book) {
      return NextResponse.json({ message: "Book not found" }, { status: 404 });
    }

    return NextResponse.json(book);
  } catch (error) {
    return NextResponse.json({ message: "Error fetching book", error }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}

// PUT: Update buku berdasarkan ID
export async function PUT(req: NextRequest, context: any) {
  try {
    const id = context.params.id as string;
    const body = await req.json();
    const { title, author, price, description } = body;

    if (!title || !author || price == null || !description) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
    }

    const updatedBook = await prisma.book.update({
      where: { id },
      data: { title, author, price, description },
    });

    return NextResponse.json(updatedBook);
  } catch (error) {
    return NextResponse.json({ message: "Error updating book", error }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}

// DELETE: Hapus buku berdasarkan ID
export async function DELETE(req: NextRequest, context: any) {
  try {
    const id = context.params.id as string;

    await prisma.book.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Book deleted successfully" });
  } catch (error) {
    return NextResponse.json({ message: "Error deleting book", error }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
