import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {

    const body = await req.json();

    const comment = await prisma.comment.create({
        data: {
            text: body.text,
            photoId: body.photoId,
        }
    })

    return NextResponse.json(comment);
}
    