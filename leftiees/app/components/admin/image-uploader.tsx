"use client";

import { useRef, useState } from "react";
import Image from "next/image";

import ConfirmDialog from "@/app/components/confirm-dialog";

export default function ImageUploader({
  value,
  onChange,
}: {
  value: string[];
  onChange: (images: string[]) => void;
}) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pendingRemoval, setPendingRemoval] = useState<number | null>(null);

  async function handleFiles(files: FileList | null) {
    if (!files || files.length === 0) return;
    setUploading(true);
    setError(null);

    const uploaded: string[] = [];
    for (const file of Array.from(files)) {
      if (!file.type.startsWith("image/")) continue;

      const formData = new FormData();
      formData.append("file", file);
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      const data = await response.json().catch(() => null);

      if (!response.ok) {
        setError(data?.error ?? "Upload failed");
        continue;
      }
      uploaded.push(data.url);
    }

    if (uploaded.length > 0) {
      onChange([...value, ...uploaded]);
    }
    setUploading(false);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  function confirmRemoval() {
    if (pendingRemoval === null) return;
    onChange(value.filter((_, index) => index !== pendingRemoval));
    setPendingRemoval(null);
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap gap-3">
        {value.map((url, index) => (
          <div
            key={`${url}-${index}`}
            className="group relative h-24 w-20 overflow-hidden rounded-xl border border-black/10 bg-zinc-100"
          >
            <Image src={url} alt="" fill sizes="80px" className="object-cover" />
            <button
              type="button"
              onClick={() => setPendingRemoval(index)}
              aria-label="Delete image"
              className="absolute right-1 top-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-white/90 text-sm text-red-600 shadow-sm transition-colors hover:bg-white"
            >
              ×
            </button>
          </div>
        ))}

        <label className="flex h-24 w-20 cursor-pointer flex-col items-center justify-center gap-1 rounded-xl border border-dashed border-black/20 text-xs text-zinc-500 transition-colors hover:bg-black/5">
          <span className="text-lg leading-none">+</span>
          {uploading ? "Uploading…" : "Upload"}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            disabled={uploading}
            onChange={(event) => handleFiles(event.target.files)}
          />
        </label>
      </div>

      <p className="text-xs text-zinc-500">
        Upload images from your device.
      </p>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <ConfirmDialog
        open={pendingRemoval !== null}
        title="Delete this image?"
        message="This image will be removed from the product. This can't be undone."
        confirmLabel="Delete image"
        onConfirm={confirmRemoval}
        onCancel={() => setPendingRemoval(null)}
      />
    </div>
  );
}
