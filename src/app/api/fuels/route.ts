import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const createFuelScheme = z.object({
  name: z.string().min(3).max(32),
});

export async function GET() {
  const fuels = await prisma.fuel.findMany();

  return NextResponse.json({ data: fuels, cursor: { offset: 0, limit: 20 } });
}

export async function POST(request: NextRequest) {
  const createFuelDto = createFuelScheme.parse(request.body);

  const fuel = await prisma.fuel.create({
    data: createFuelDto,
  });

  return NextResponse.json(fuel);
}
