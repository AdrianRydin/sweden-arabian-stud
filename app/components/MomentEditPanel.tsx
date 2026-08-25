/* eslint-disable @next/next/no-img-element */

"use client";

import { useState, useEffect } from "react";
import { X, Save, Trash2 } from "lucide-react";
import { createEmptyMoment, Moment } from "../data/momentData";

interface MomentEditPanelProps {
  moment: Moment;
  isCreating: boolean;
  isSaving: boolean;
  onSave: (moment: Moment) => void | Promise<void>;
  onCancel: () => void;
}

function normalizeMoment(moment: Moment): Moment {
  return {
    ...createEmptyMoment(),
    ...moment,
    images: moment.images || [],
    isVisible: typeof moment.isVisible === "boolean" ? moment.isVisible : true,
  };
}

export function MomentEditPanel({
  moment,
  isCreating,
  isSaving,
  onSave,
  onCancel,
}: MomentEditPanelProps) {
  const [formData, setFormData] = useState<Moment>(() =>
    normalizeMoment(moment),
  );
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");

  useEffect(() => {
    setFormData(normalizeMoment(moment));
  }, [moment]);

  const updateField = <K extends keyof Moment>(field: K, value: Moment[K]) => {
    setFormData((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (!files || files.length === 0) return;

    try {
      setIsUploading(true);
      setUploadError("");

      const uploadedUrls: string[] = [];

      for (const file of Array.from(files)) {
        const body = new FormData();
        body.append("file", file);
        body.append("folder", "sweden-arabian-stud/moments");

        const res = await fetch("/api/admin/upload", {
          method: "POST",
          body,
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message || "Failed to upload image");
        }

        uploadedUrls.push(data.url);
      }

      setFormData((current) => ({
        ...current,
        images: [...current.images, ...uploadedUrls],
      }));
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

  const handleRemoveImage = (index: number) => {
    setFormData((current) => ({
      ...current,
      images: current.images.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.images.length === 0) {
      setUploadError("At least one image is required.");
      return;
    }

    await onSave(formData);
  };

  return (
    <div className="fixed top-0 right-0 bottom-0 z-[1000] w-full max-w-[700px] overflow-y-auto bg-white shadow-[-4px_0_20px_rgba(0,0,0,0.15)]">
      <div className="sticky top-0 z-10 border-b border-[#e0e0e0] bg-white px-8 py-6">
        <div className="flex items-center justify-between">
          <h2 className="m-0 font-['Cormorant_SC'] text-[1.4rem] tracking-[0.1em] text-[#2a2a2a]">
            {isCreating ? "Create New Moment" : "Edit Moment"}
          </h2>

          <button
            type="button"
            onClick={onCancel}
            className="flex cursor-pointer items-center border-0 bg-transparent p-2 text-[var(--text-muted)] transition-colors hover:text-[#2a2a2a]"
          >
            <X size={24} />
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="p-8">
        <section className="mb-10">
          <h3 className="mb-5 border-b border-[var(--beige)] pb-3 font-['Cormorant_SC'] text-base tracking-[0.1em] text-[var(--sage-dark)]">
            Moment Details
          </h3>

          <div className="mb-5">
            <label className="edit-panel-label">Title *</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => updateField("title", e.target.value)}
              required
              className="edit-panel-input"
            />
          </div>

          <div className="mb-5">
            <label className="edit-panel-label">Description *</label>
            <textarea
              value={formData.description}
              onChange={(e) => updateField("description", e.target.value)}
              required
              rows={6}
              className="edit-panel-input resize-y"
            />
          </div>

          <div className="mb-5">
            <label className="edit-panel-label">Visibility</label>
            <select
              value={formData.isVisible ? "visible" : "hidden"}
              onChange={(e) =>
                updateField("isVisible", e.target.value === "visible")
              }
              className="edit-panel-input"
            >
              <option value="visible">Visible on website</option>
              <option value="hidden">Hidden from website</option>
            </select>
          </div>

          <div className="mb-5">
            <label className="edit-panel-label">Upload Images *</label>

            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageUpload}
              disabled={isUploading}
              className="edit-panel-input"
            />

            <p className="mt-2 font-['Raleway',sans-serif] text-[0.68rem] text-[var(--text-muted)]">
              The first image is used as the cover image on the Moments page.
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

            {formData.images.length > 0 && (
              <div className="mt-4 grid grid-cols-3 gap-3">
                {formData.images.map((image, index) => (
                  <div key={image + index} className="relative">
                    <img
                      src={image}
                      alt={`Moment image ${index + 1}`}
                      className="h-24 w-full rounded object-cover"
                    />

                    {index === 0 && (
                      <span className="absolute top-1 left-1 bg-(--teal) px-1.5 py-0.5 font-['Raleway',sans-serif] text-[0.55rem] tracking-[0.08em] text-white uppercase">
                        Cover
                      </span>
                    )}

                    <button
                      type="button"
                      onClick={() => handleRemoveImage(index)}
                      aria-label="Remove image"
                      className="absolute top-1 right-1 flex h-6 w-6 cursor-pointer items-center justify-center rounded-full border-0 bg-black/60 text-white transition hover:bg-[#d4183d]"
                    >
                      <Trash2 size={12} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        <div className="sticky bottom-0 mt-10 flex justify-end gap-3 border-t border-[#e0e0e0] bg-white pt-5">
          <button
            type="button"
            onClick={onCancel}
            disabled={isSaving || isUploading}
            className="cursor-pointer rounded border border-[#d0d0d0] bg-white px-7 py-3 font-['Raleway'] text-[0.7rem] tracking-[0.1em] text-[var(--text-secondary)] uppercase transition hover:bg-[#f5f5f5] disabled:cursor-not-allowed disabled:opacity-60"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={isSaving || isUploading}
            className="flex cursor-pointer items-center gap-2 rounded border-0 bg-[var(--teal)] px-7 py-3 font-['Raleway'] text-[0.7rem] tracking-[0.1em] text-white uppercase transition hover:bg-[var(--teal-dark)] disabled:cursor-not-allowed disabled:opacity-60"
          >
            <Save size={16} />
            {isUploading
              ? "Uploading..."
              : isSaving
                ? "Saving..."
                : isCreating
                  ? "Create Moment"
                  : "Save Changes"}
          </button>
        </div>
      </form>

      <style>{`
        .edit-panel-label {
          font-family: 'Raleway', sans-serif;
          font-size: 0.7rem;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--text-muted);
          display: block;
          margin-bottom: 8px;
          font-weight: 600;
        }

        .edit-panel-input {
          width: 100%;
          padding: 10px 14px;
          border: 1px solid #d0d0d0;
          border-radius: 3px;
          font-family: 'Raleway', sans-serif;
          font-size: 0.8rem;
          color: var(--text-primary);
          transition: border-color 0.2s;
          outline: none;
        }

        .edit-panel-input:focus {
          border-color: var(--teal);
        }
      `}</style>
    </div>
  );
}
