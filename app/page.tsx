'use client';

import { useState } from 'react';
import {
  Dropzone,
  DropzoneContent,
  DropzoneEmptyState,
} from '@/components/ui/dropzone';
import { UploadIcon, XIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export default function UploadPage() {
  const [files, setFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleUpload = async () => {
    if (files.length === 0) return;
    setUploading(true);

    for (const file of files) {
      const formData = new FormData();
      formData.append('file', file);

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) {
        console.error('Upload failed:', await res.text());
      } else {
        console.log('Upload success:', await res.text());
      }
    }

    setUploading(false);
  };

  const handleDrop = (acceptedFiles: File[]) => {
    setError(null);

    const combined = [...files, ...acceptedFiles];

    if (combined.length > 10) {
      setError('File limit exceeded (max 10)');
      setTimeout(() => {
        setError(null);
      }, 2500);
      return;
    }

    for (const file of acceptedFiles) {
      if (file.size > 1024 * 1024 * 100) {
        setError(' File too large (max 100MB)');
        setTimeout(() => {
          setError(null);
        }, 5000);
        return;
      }
    }

    setFiles(combined);
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-background p-4">
      <div className="w-full max-w-xl rounded-2xl border bg-white p-6 shadow-sm">
        <h1 className="mb-2 text-lg font-semibold text-gray-800">Upload Files</h1>
        <p className="mb-4 text-sm text-muted-foreground">
          Images, PDF, Word, Excel — up to 100MB each.
        </p>

        <Dropzone
          maxSize={1024 * 1024 * 100}
          maxFiles={10}
          multiple
          accept={{
            'image/*': [],
            'application/pdf': [],
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document': [],
            'application/msword': [],
            'application/vnd.ms-excel': [],
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': [],
          }}
          className={cn(
            'border-2 p-8 transition-colors hover:border-gray-300',
            error ? 'border-red-500 ring-1 ring-red-300' : 'border-gray-300'
          )}
          onDrop={handleDrop}
        >
          <DropzoneEmptyState>
            <div className="flex size-8 items-center justify-center rounded-md bg-muted text-muted-foreground">
              <UploadIcon size={16} />
            </div>
            <p className="mt-2 text-sm font-medium">Drop or click to select</p>
            <p className="text-xs text-muted-foreground">Max 10 files • 100MB each</p>
          </DropzoneEmptyState>
          <DropzoneContent />
        </Dropzone>

        {error && (
          <p className="mt-2 text-sm text-red-500 font-medium">{error}</p>
        )}

        {files.length > 0 && (
          <div className="mt-6 text-sm text-gray-700">
            <h2 className="mb-2 font-medium">Selected Files:</h2>
            <div className="grid grid-cols-2 gap-2 max-h-[250px] overflow-y-auto">
              {files.map((file, index) => (
                <div
                  key={index}
                  className="relative rounded-md border p-3 text-xs bg-gray-50"
                >
                  <button
                    type="button"
                    className="absolute top-1 right-1 text-black-500 hover:text-red-700"
                    onClick={() => removeFile(index)}
                  >
                    <XIcon size={14} />
                  </button>
                  <p className="font-medium truncate">{file.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {(file.size / 1024 / 1024).toFixed(1)} MB
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-4 flex gap-2">
              <Button onClick={handleUpload} disabled={uploading}>
                {uploading ? 'Uploading...' : 'Upload'}
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setFiles([]);
                  setError(null);
                }}
              >
                Clear Files
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
