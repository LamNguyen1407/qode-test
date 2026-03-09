import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const photos = await prisma.photo.findMany({
    include: {
      comments: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return NextResponse.json(photos);
}
