import { S3Client, PutObjectCommand  } from "@aws-sdk/client-s3";
import { NextRequest } from "next/server";

const s3 = new S3Client({
  region: "auto",
  endpoint: process.env.R2_URL,
  credentials: {
    accessKeyId: process.env.R2_ACCESSKEY!,
    secretAccessKey: process.env.R2_SECRETACCESSKEY!,
  },
  forcePathStyle: true,
});

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return new Response("No file provided", { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const fileName = `${Date.now()}_${file.name}`;

    const command = new PutObjectCommand({
      Bucket: process.env.R2_BUCKET_NAME!,
      Key: `uploads/${fileName}`,
      Body: buffer,
      ContentType: file.type,
    });

    await s3.send(command);

    const publicUrl = `${process.env.R2_PUBLIC_URL}/uploads/${fileName}`;
    return new Response(publicUrl, { status: 200 });
  } catch (err) {
    console.error("R2 upload error:", err);
    return new Response("Failed to upload file", { status: 500 });
  }
}

export async function GET(req: Request) {
    const env = process.env.R2_URL;
    console.log(env, req.url);
    return new Response('In Upload Route', { status: 200 }); 
}