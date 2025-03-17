import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const books = await prisma.book.findMany();
  return NextResponse.json(books);
}

export async function POST(req: Request) {
  const { title, author, price, description } = await req.json();
  const newBook = await prisma.book.create({
    data: { title, author, price, description },
  });

  return NextResponse.json(newBook, { status: 201 });
}
