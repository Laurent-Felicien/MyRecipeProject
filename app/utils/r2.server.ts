import { S3Client, PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';
import { v4 as uuidv4 } from 'uuid';

const s3 = new S3Client({
  region: 'auto',
  endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID!,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
  },
});

const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
const MAX_SIZE = 5 * 1024 * 1024; // 5 Mo

export function validateImage(file: File): string | null {
  if (file.size > MAX_SIZE) return 'Image trop grande (max 5 Mo)';
  if (!ALLOWED_TYPES.includes(file.type)) return 'Format non supporté (JPEG, PNG, WebP)';
  return null;
}

export async function uploadImage(file: File, folder: string = 'recipes'): Promise<string> {
  const ext = file.name.split('.').pop() || 'jpg';
  const key = `${folder}/${uuidv4()}.${ext}`;
  const buffer = Buffer.from(await file.arrayBuffer());

  await s3.send(new PutObjectCommand({
    Bucket: process.env.R2_BUCKET_NAME!,
    Key: key, Body: buffer, ContentType: file.type,
  }));

  return `${process.env.R2_PUBLIC_URL}/${key}`;
}

export async function deleteImage(url: string): Promise<void> {
  const key = url.replace(`${process.env.R2_PUBLIC_URL}/`, '');
  await s3.send(new DeleteObjectCommand({ Bucket: process.env.R2_BUCKET_NAME!, Key: key }));
}
