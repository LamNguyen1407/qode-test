import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const page = Number(searchParams.get("page") || 1);
  const limit = Number(searchParams.get("limit") || 12);

  const skip = (page - 1) * limit;

  const [photos, total] = await Promise.all([
    prisma.photo.findMany({
      include: {
        _count: {
          select: { comments: true },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      skip,
      take: limit,
    }),

    prisma.photo.count(),
  ]);

  return NextResponse.json({
    data: photos,
    total,
    page,
    limit,
  });
}
