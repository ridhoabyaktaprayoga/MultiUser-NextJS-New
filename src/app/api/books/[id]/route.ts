import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: Request, { params }: { params: { id: string } }) {
  const book = await prisma.book.findUnique({ where: { id: params.id } });
  if (!book) return NextResponse.json({ message: "Not Found" }, { status: 404 });

  return NextResponse.json(book);
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const { title, author, price, description } = await req.json();
  const updatedBook = await prisma.book.update({
    where: { id: params.id },
    data: { title, author, price, description },
  });

  return NextResponse.json(updatedBook);
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  await prisma.book.delete({ where: { id: params.id } });
  return NextResponse.json({ message: "Deleted" });
}