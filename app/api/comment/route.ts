import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();

  const { photoId, authorName, text } = body;

  const comment = await prisma.comment.create({
    data: {
      photoId,
      authorName,
      text,
    },
  });

  return NextResponse.json(comment);
}
