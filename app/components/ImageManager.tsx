/* eslint-disable @next/next/no-img-element */

"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Trash2 } from "lucide-react";

interface ImageManagerProps {
  images: string[];
  onChange: (images: string[]) => void;
  uploadFolder: string;
  disabled?: boolean;
}

const MAX_DIMENSION = 2200;
const JPEG_QUALITY = 0.85;

// Phone photos (especially iPhone camera-roll originals) can be tens of MB,
// which some hosts reject before our route ever runs, returning a non-JSON
// error page. Downscaling client-side keeps uploads comfortably small.
async function downscaleImage(file: File): Promise<File> {
  if (file.type === "image/svg+xml") {
    return file;
  }

  try {
    const bitmap = await createImageBitmap(file);

    const scale = Math.min(
      1,
      MAX_DIMENSION / Math.max(bitmap.width, bitmap.height),
    );
    const width = Math.round(bitmap.width * scale);
    const height = Math.round(bitmap.height * scale);

    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;

    const ctx = canvas.getContext("2d");
    if (!ctx) return file;

    ctx.drawImage(bitmap, 0, 0, width, height);
    bitmap.close();

    const blob: Blob | null = await new Promise((resolve) =>
      canvas.toBlob(resolve, "image/jpeg", JPEG_QUALITY),
    );

    if (!blob || blob.size >= file.size) {
      return file;
    }

    const newName = file.name.replace(/\.\w+$/, "") + ".jpg";
    return new File([blob], newName, { type: "image/jpeg" });
  } catch {
    // Unsupported format/browser (e.g. an unusual HEIC variant) - fall back
    // to the original file rather than blocking the upload.
    return file;
  }
}

export function ImageManager({
  images,
  onChange,
  uploadFolder,
  disabled = false,
}: ImageManagerProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (!files || files.length === 0) return;

    try {
      setIsUploading(true);
      setUploadError("");

      const uploadedUrls: string[] = [];

      for (const file of Array.from(files)) {
        const uploadFile = await downscaleImage(file);

        const body = new FormData();
        body.append("file", uploadFile);
        body.append("folder", uploadFolder);

        const res = await fetch("/api/admin/upload", {
          method: "POST",
          body,
        });

        let data: { url?: string; message?: string };
        try {
          data = await res.json();
        } catch {
          throw new Error(
            `Upload failed (${res.status}). The photo may be too large, or the connection was interrupted - try again with a smaller image.`,
          );
        }

        if (!res.ok) {
          throw new Error(data.message || "Failed to upload image");
        }

        uploadedUrls.push(data.url!);
      }

      onChange([...images, ...uploadedUrls]);
    } catch (error) {
      console.error(error);
      setUploadError(
        error instanceof Error ? error.message : "Could not upload image.",
      );
    } finally {
      setIsUploading(false);
      e.target.value = "";
    }
  };

  const handleRemove = (index: number) => {
    onChange(images.filter((_, i) => i !== index));
  };

  const handleMove = (index: number, direction: -1 | 1) => {
    const newIndex = index + direction;

    if (newIndex < 0 || newIndex >= images.length) return;

    const next = [...images];
    [next[index], next[newIndex]] = [next[newIndex], next[index]];
    onChange(next);
  };

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        multiple
        onChange={handleUpload}
        disabled={disabled || isUploading}
        className="edit-panel-input"
      />

      <p className="mt-2 font-['Raleway',sans-serif] text-[0.68rem] text-[var(--text-muted)]">
        The first image is used as the thumbnail/cover. Use the arrows to
        reorder.
      </p>

      {isUploading && (
        <p className="mt-2 font-['Raleway',sans-serif] text-[0.7rem] text-[var(--text-muted)]">
          Uploading images...
        </p>
      )}

      {uploadError && (
        <p className="mt-2 font-['Raleway',sans-serif] text-[0.7rem] text-red-600">
          {uploadError}
        </p>
      )}

      {images.length > 0 && (
        <div className="mt-4 grid grid-cols-3 gap-3">
          {images.map((image, index) => (
            <div key={image + index} className="relative">
              <img
                src={image}
                alt={`Image ${index + 1}`}
                className="h-24 w-full rounded object-cover"
              />

              {index === 0 && (
                <span className="absolute top-1 left-1 bg-(--teal) px-1.5 py-0.5 font-['Raleway',sans-serif] text-[0.55rem] tracking-[0.08em] text-white uppercase">
                  Cover
                </span>
              )}

              <button
                type="button"
                onClick={() => handleRemove(index)}
                aria-label="Remove image"
                className="absolute top-1 right-1 flex h-6 w-6 cursor-pointer items-center justify-center rounded-full border-0 bg-black/60 text-white transition hover:bg-[#d4183d]"
              >
                <Trash2 size={12} />
              </button>

              <div className="absolute bottom-1 left-1 flex gap-1">
                <button
                  type="button"
                  onClick={() => handleMove(index, -1)}
                  disabled={index === 0}
                  aria-label="Move image earlier"
                  className="flex h-6 w-6 cursor-pointer items-center justify-center rounded-full border-0 bg-black/60 text-white transition hover:bg-black/80 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <ChevronLeft size={13} />
                </button>

                <button
                  type="button"
                  onClick={() => handleMove(index, 1)}
                  disabled={index === images.length - 1}
                  aria-label="Move image later"
                  className="flex h-6 w-6 cursor-pointer items-center justify-center rounded-full border-0 bg-black/60 text-white transition hover:bg-black/80 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <ChevronRight size={13} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
