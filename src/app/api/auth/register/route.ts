import { prisma } from "@/lib/prisma"; // Pastikan alias sudah benar atau gunakan path relatif
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(req: Request) {
  try {
    // Ambil data name, email, dan password dari request body
    const { name, email, password } = await req.json();

    // Cek apakah email sudah digunakan
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json({ error: "Email already exists" }, { status: 400 });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Buat user baru dengan role default 'USER'
    await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: "USER",
      },
    });

    return NextResponse.json({ message: "User registered successfully" }, { status: 201 });
  
} catch (error) {
  console.error("Error in register API:", error);
  return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
}

}
