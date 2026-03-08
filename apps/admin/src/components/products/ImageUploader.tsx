'use client'

import { useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { X, UploadCloud, Image as ImageIcon } from 'lucide-react'
import { adminService } from '../../services/adminService'
import { toast } from 'sonner'
import Image from 'next/image'

interface ImageUploaderProps {
  images: string[]
  onChange: (images: string[]) => void
  maxFiles?: number
}

export function ImageUploader({ images, onChange, maxFiles = 5 }: ImageUploaderProps) {
  const [isUploading, setIsUploading] = useState(false)

  const onDrop = async (acceptedFiles: File[]) => {
    if (images.length + acceptedFiles.length > maxFiles) {
      toast.error(`You can only upload up to ${maxFiles} images.`)
      return
    }

    setIsUploading(true)
    try {
      const { urls } = await adminService.uploadImages(acceptedFiles)
      onChange([...images, ...urls])
      toast.success('Images uploaded successfully')
    } catch (error) {
      toast.error('Failed to upload images')
    } finally {
      setIsUploading(false)
    }
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.webp']
    },
    maxSize: 5 * 1024 * 1024, // 5MB
    disabled: isUploading || images.length >= maxFiles
  })

  const removeImage = (index: number) => {
    const newImages = [...images]
    newImages.splice(index, 1)
    onChange(newImages)
  }

  return (
    <div className="space-y-4">
      <div 
        {...getRootProps()} 
        className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-colors ${
          isDragActive ? 'border-primary bg-primary/5' : 'border-border bg-black/5 hover:bg-border/40'
        } ${isUploading || images.length >= maxFiles ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center justify-center space-y-3">
          <div className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center">
             {isUploading ? (
               <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
             ) : (
               <UploadCloud className="w-6 h-6 text-muted" />
             )}
          </div>
          <div className="text-sm">
            <span className="font-semibold text-primary">Click to upload</span> or drag and drop
          </div>
          <p className="text-xs text-muted">SVG, PNG, JPG or GIF (max. 5MB)</p>
        </div>
      </div>

      {images.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {images.map((url, index) => (
            <div key={url} className="relative group rounded-xl overflow-hidden bg-border/40 aspect-square border border-border">
              {/* Note: In a real app we'd use next/image with configured domains. Since this is generic URLs we'll use a normal img tag for safety or unoptimized Next Image */}
              <img
                src={url}
                alt={`Uploaded ${index + 1}`}
                className="w-full h-full object-cover"
              />
              <button
                type="button"
                onClick={() => removeImage(index)}
                className="absolute top-2 right-2 p-1.5 bg-black/50 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/70"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
