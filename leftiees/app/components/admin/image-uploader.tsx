"use client";

import { useRef, useState } from "react";
import Image from "next/image";

export default function ImageUploader({
  value,
  onChange,
}: {
  value: string[];
  onChange: (images: string[]) => void;
}) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [urlInput, setUrlInput] = useState("");
  const [error, setError] = useState<string | null>(null);

  async function handleFiles(files: FileList | null) {
    if (!files || files.length === 0) return;
    setUploading(true);
    setError(null);

    const uploaded: string[] = [];
    for (const file of Array.from(files)) {
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

    onChange([...value, ...uploaded]);
    setUploading(false);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  function addUrl() {
    const url = urlInput.trim();
    if (!url) return;
    onChange([...value, url]);
    setUrlInput("");
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
              onClick={() => onChange(value.filter((_, i) => i !== index))}
              aria-label="Remove image"
              className="absolute right-1 top-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-white/90 text-sm text-red-600 shadow-sm"
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

      <div className="flex gap-2">
        <input
          type="url"
          value={urlInput}
          onChange={(event) => setUrlInput(event.target.value)}
          placeholder="…or paste an image URL"
          className="h-11 flex-1 rounded-xl border border-black/15 bg-background px-3.5 text-sm text-foreground transition-colors placeholder:text-zinc-400 focus:border-denim"
        />
        <button
          type="button"
          onClick={addUrl}
          className="h-11 shrink-0 rounded-full border border-black/15 px-4 text-sm font-medium transition-colors hover:bg-black/5"
        >
          Add
        </button>
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
}
