import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { z } from "zod";

interface QueryParams {
  params: Promise<{
    id: string;
  }>;
}

const updateUserSchema = z.object({
  fullName: z.string().optional(),
  email: z.string().email().optional(),
  password: z.string().optional(),
});

export async function GET(_: Request, { params }: QueryParams) {
  const { id } = await params;
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
  });

  if (!user) {
    return NextResponse.json(
      { message: `The user id ${id} not found!` },
      { status: 404 }
    );
  }

  return NextResponse.json(user);
}

export async function DELETE(_: Request, { params }: QueryParams) {
  const { id } = await params;
  const user = await prisma.user.delete({
    where: {
      id,
    },
  });

  if (!user) {
    return NextResponse.json(
      { message: `The user id ${id} not found!` },
      { status: 404 }
    );
  }

  return NextResponse.json(user);
}

export async function PATCH(request: Request, { params }: QueryParams) {
  const { id } = await params;
  const updateUserDto = updateUserSchema.parse(request.body);

  const user = await prisma.user.update({
    where: {
      id,
    },
    data: updateUserDto,
  });

  return NextResponse.json(user);
}
