import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const createGasStationSchema = z.object({
  name: z.string().min(3).max(32),
  address: z.string().min(3).max(256),
  city: z.string().min(3).max(32),
  state: z.string().min(2).max(2),
});

export async function GET() {
  const gasStations = await prisma.gasStation.findMany();

  return NextResponse.json({
    data: gasStations,
    cursor: { offset: 0, limit: 20 },
  });
}

export async function POST(request: NextRequest) {
  const createGasStationDto = createGasStationSchema.parse(request.body);

  const gasStation = await prisma.gasStation.create({
    data: createGasStationDto,
  });

  return NextResponse.json(gasStation);
}
