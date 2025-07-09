'use client';

import { useState } from 'react';
import {
  Dropzone,
  DropzoneContent,
  DropzoneEmptyState,
} from '@/components/ui/dropzone';
import { UploadIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function UploadPage() {
  const [files, setFiles] = useState<File[] | undefined>();
  const [uploading, setUploading] = useState(false);

  const handleUpload = async () => {
    if (!files || files.length === 0) return;

    setUploading(true);

    for (const file of files) {
      const formData = new FormData();
      formData.append('file', file);

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) {
        console.error(' Upload failed:', await res.text());
      } else {
        console.log('Upload success:', await res.text());
      }
    }

    setUploading(false);
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-background p-4">
      <div className="w-full max-w-xl rounded-2xl border bg-white p-6 shadow-sm">
        <h1 className="mb-2 text-lg font-semibold text-gray-800">Upload Files</h1>
        <p className="mb-4 text-sm text-muted-foreground">
          Images, PDF, Word, Excel — up to 100MB.
        </p>

        <Dropzone
          maxSize={1024 * 1024 * 100}
          accept={{
            'image/*': [],
            'application/pdf': [],
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document': [],
            'application/msword': [],
            'application/vnd.ms-excel': [],
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': [],
          }}
          onDrop={(acceptedFiles) => {
            setFiles(acceptedFiles);
          }}
        >
          <DropzoneEmptyState>
            <div className="flex size-8 items-center justify-center rounded-md bg-muted text-muted-foreground">
              <UploadIcon size={16} />
            </div>
            <p className="mt-2 text-sm font-medium">Drop or click to select</p>
            <p className="text-xs text-muted-foreground">Max 100MB each</p>
          </DropzoneEmptyState>
          <DropzoneContent />
        </Dropzone>

        {files && files.length > 0 && (
          <div className="mt-5 text-sm text-gray-700">
            <h2 className="mb-1 font-medium">Selected Files:</h2>
            <ul className="list-disc list-inside text-xs mb-4">
              {files.map((file, i) => (
                <li key={i}>
                  {file.name} ({(file.size / 1024 / 1024).toFixed(1)} MB)
                </li>
              ))}
            </ul>
            <Button onClick={handleUpload} disabled={uploading}>
              {uploading ? 'Uploading...' : 'Upload'}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
