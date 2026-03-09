import prisma from "@/lib/prisma";
import s3 from "@/lib/s3";
import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const file = formData.get("file") as File;

  const buffer = Buffer.from(await file.arrayBuffer());

  const filename = `${Date.now()}-${file.name}`;

  await s3
    .upload({
      Bucket: process.env.AWS_BUCKET!,
      Key: filename,
      Body: buffer,
      ContentType: file.type,
    })
    .promise();

  const url = `https://${process.env.AWS_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/${filename}`;

  const photo = await prisma.photo.create({
    data: {
      url,
    },
  });

  return NextResponse.json(photo);

  
}
