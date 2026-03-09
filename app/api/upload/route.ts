import prisma from "@/lib/prisma";
import s3 from "@/lib/s3";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const formData = await req.formData();

  const file = formData.get("file") as File | null;
  const title = formData.get("title") as string;
  const authorName = formData.get("author") as string;
  const description = formData.get("description") as string;

  if (!file) {
    return NextResponse.json({ error: "File is required" }, { status: 400 });
  }

  const buffer = Buffer.from(await file.arrayBuffer());

  const fileName = `${Date.now()}-${file.name}`;

  await s3
    .upload({
      Bucket: process.env.AWS_BUCKET!,
      Key: fileName,
      Body: buffer,
      ContentType: file.type,
    })
    .promise();

  const url = `https://${process.env.AWS_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileName}`;

  const photo = await prisma.photo.create({
    data: {
      url,
      title,
      authorName,
      description,
    },
  });

  return NextResponse.json(photo);
}
