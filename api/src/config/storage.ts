import { Storage } from '@google-cloud/storage'
import { env } from './env'
import crypto from 'crypto'

export const storage = new Storage({
  projectId: env.GCS_PROJECT_ID,
})

export const bucket = storage.bucket(env.GCS_BUCKET_NAME)

export async function uploadToGCS(
  file: Express.Multer.File,
  folder: string
): Promise<string> {
  const filename = `${folder}/${Date.now()}-${crypto.randomUUID()}`
  const blob = bucket.file(filename)
  
  await blob.save(file.buffer, {
    contentType: file.mimetype,
    resumable: false,
  })
  
  await blob.makePublic()
  
  return `https://storage.googleapis.com/${env.GCS_BUCKET_NAME}/${filename}`
}
