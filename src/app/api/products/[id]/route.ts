import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: Request, { params }: { params: { id: string } }) {
  const product = await prisma.product.findUnique({ where: { id: params.id } });
  if (!product) return NextResponse.json({ message: "Not Found" }, { status: 404 });

  return NextResponse.json(product);
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const { name, description, price } = await req.json();
  const updatedProduct = await prisma.product.update({
    where: { id: params.id },
    data: { name, description, price },
  });

  return NextResponse.json(updatedProduct);
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  await prisma.product.delete({ where: { id: params.id } });
  return NextResponse.json({ message: "Deleted" });
}
