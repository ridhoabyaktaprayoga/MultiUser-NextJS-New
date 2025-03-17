import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const products = await prisma.product.findMany();
  return NextResponse.json(products);
}

export async function POST(req: Request) {
  const { name, description, price } = await req.json();
  const newProduct = await prisma.product.create({
    data: { name, description, price },
  });

  return NextResponse.json(newProduct, { status: 201 });
}
