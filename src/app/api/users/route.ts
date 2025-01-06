import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const createUserSchema = z.object({
  fullName: z.string(),
  email: z.string().email(),
  password: z.string(),
});

export async function GET() {
  const users = await prisma.user.findMany();

  return NextResponse.json({ data: users, cursor: { offset: 0, limit: 20 } });
}

export async function POST(request: NextRequest) {
  const createUserDto = createUserSchema.parse(request.body);

  const user = await prisma.user.create({
    data: createUserDto,
  });

  return NextResponse.json(user);
}
