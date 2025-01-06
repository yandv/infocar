import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const createCarSchema = z.object({
  make: z.string().min(3).max(32),
  model: z.string().min(3).max(32),
  year: z.number().int().min(1900).max(2050),
  plate: z.string().min(3).max(8),
});

export async function GET() {
  const cars = await prisma.car.findMany();

  return NextResponse.json({ data: cars, cursor: { offset: 0, limit: 20 } });
}

export async function POST(request: NextRequest) {
  const createCarDto = createCarSchema.parse(request.body);

  const car = await prisma.car.create({
    data: createCarDto,
  });

  return NextResponse.json(car);
}
