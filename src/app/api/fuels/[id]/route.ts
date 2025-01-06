import { prisma } from "@/lib/prisma";
import { BaseQueryParams } from "@/utils/base-query-params";
import { NextResponse } from "next/server";

export async function DELETE(
  _: Request,
  { params }: BaseQueryParams<{ id: string }>
) {
  const { id } = await params;
  const fuel = await prisma.fuel.delete({
    where: {
      id,
    },
  });

  if (!fuel) {
    return NextResponse.json(
      { message: `The fuel id ${id} not found!` },
      { status: 404 }
    );
  }

  return NextResponse.json(fuel);
}
