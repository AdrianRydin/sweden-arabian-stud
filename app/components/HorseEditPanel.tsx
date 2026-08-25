"use client";

import { useState, useEffect } from "react";
import { X, Save } from "lucide-react";
import {
  createEmptyHorse,
  Horse,
  HorseSection,
  horseSectionLabels,
  horseSections,
} from "../data/horseData";
import { ImageManager } from "./ImageManager";

interface HorseEditPanelProps {
  horse: Horse;
  isCreating: boolean;
  isSaving: boolean;
  onSave: (horse: Horse) => void | Promise<void>;
  onCancel: () => void;
}

function normalizePedigreeEntry(entry: unknown, fallbackName = "") {
  if (entry && typeof entry === "object") {
    const value = entry as { name?: string; info?: string };

    return {
      name: value.name || fallbackName,
      info: value.info || "",
    };
  }

  return {
    name: fallbackName,
    info: "",
  };
}

function normalizeHorse(horse: Horse): Horse {
  const emptyHorse = createEmptyHorse();
  const pedigree = horse.pedigree || emptyHorse.pedigree;

  return {
    ...emptyHorse,
    ...horse,
    images: horse.images?.length
      ? horse.images
      : horse.image
        ? [horse.image]
        : [],
    status: horse.status || "available",
    isVisible: typeof horse.isVisible === "boolean" ? horse.isVisible : true,
    price: horse.price || "",
    pedigree: {
      ...emptyHorse.pedigree,
      ...pedigree,
      horse: pedigree.horse || horse.name || "",
      sire: normalizePedigreeEntry(pedigree.sire, horse.sire),
      dam: normalizePedigreeEntry(pedigree.dam, horse.dam),
      sireSire: normalizePedigreeEntry(pedigree.sireSire),
      sireDam: normalizePedigreeEntry(pedigree.sireDam),
      damSire: normalizePedigreeEntry(pedigree.damSire),
      damDam: normalizePedigreeEntry(pedigree.damDam),
      sireSireSire: normalizePedigreeEntry(pedigree.sireSireSire),
      sireSireDam: normalizePedigreeEntry(pedigree.sireSireDam),
      sireDamSire: normalizePedigreeEntry(pedigree.sireDamSire),
      sireDamDam: normalizePedigreeEntry(pedigree.sireDamDam),
      damSireSire: normalizePedigreeEntry(pedigree.damSireSire),
      damSireDam: normalizePedigreeEntry(pedigree.damSireDam),
      damDamSire: normalizePedigreeEntry(pedigree.damDamSire),
      damDamDam: normalizePedigreeEntry(pedigree.damDamDam),
    },
  };
}

export function HorseEditPanel({
  horse,
  isCreating,
  isSaving,
  onSave,
  onCancel,
}: HorseEditPanelProps) {
  const [formData, setFormData] = useState<Horse>(() => normalizeHorse(horse));
  const [imagesError, setImagesError] = useState("");

  useEffect(() => {
    setFormData(normalizeHorse(horse));
  }, [horse]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.images.length === 0) {
      setImagesError("At least one image is required.");
      return;
    }

    const sireName = formData.pedigree.sire.name.trim();
    const damName = formData.pedigree.dam.name.trim();

    const updatedHorse: Horse = {
      ...formData,
      image: formData.images[0],
      sire: sireName,
      dam: damName,
      pedigree: {
        ...formData.pedigree,
        horse: formData.name,
        sire: {
          ...formData.pedigree.sire,
          name: sireName,
        },
        dam: {
          ...formData.pedigree.dam,
          name: damName,
        },
      },
    };

    await onSave(updatedHorse);
  };

  const updateField = <K extends keyof Horse>(field: K, value: Horse[K]) => {
    setFormData((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const updatePedigreeField = (
    field: string,
    subfield: "name" | "info",
    value: string,
  ) => {
    setFormData((current) => {
      const currentEntry =
        current.pedigree[field as keyof typeof current.pedigree];

      return {
        ...current,
        pedigree: {
          ...current.pedigree,
          [field]: {
            name: "",
            info: "",
            ...(currentEntry && typeof currentEntry === "object"
              ? currentEntry
              : {}),
            [subfield]: value,
          },
        },
      };
    });
  };

  return (
    <div className="fixed top-0 right-0 bottom-0 z-[1000] w-full max-w-[700px] overflow-y-auto bg-white shadow-[-4px_0_20px_rgba(0,0,0,0.15)]">
      <div className="sticky top-0 z-10 border-b border-[#e0e0e0] bg-white px-8 py-6">
        <div className="flex items-center justify-between">
          <h2 className="m-0 font-['Cormorant_SC'] text-[1.4rem] tracking-[0.1em] text-[#2a2a2a]">
            {isCreating ? "Create New Horse" : "Edit Horse"}
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
            Basic Information
          </h3>

          <div className="mb-5">
            <label className="edit-panel-label">Horse Name *</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => updateField("name", e.target.value)}
              required
              className="edit-panel-input"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="mb-5">
              <label className="edit-panel-label">Birth Year *</label>
              <input
                type="number"
                value={formData.birthYear}
                onChange={(e) =>
                  updateField("birthYear", Number(e.target.value))
                }
                required
                className="edit-panel-input"
              />
            </div>

            <div className="mb-5">
              <label className="edit-panel-label">Section *</label>
              <select
                value={formData.section}
                onChange={(e) =>
                  updateField("section", e.target.value as HorseSection)
                }
                required
                className="edit-panel-input"
              >
                {horseSections.map((section) => (
                  <option key={section} value={section}>
                    {horseSectionLabels[section]}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mb-5">
            <label className="edit-panel-label">Breed *</label>
            <input
              type="text"
              value={formData.breed}
              onChange={(e) => updateField("breed", e.target.value)}
              required
              className="edit-panel-input"
              placeholder="Arabian Horse"
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
            <label className="edit-panel-label">Upload Images *</label>

            <ImageManager
              images={formData.images}
              onChange={(images) => {
                updateField("images", images);
                setImagesError("");
              }}
              uploadFolder="sweden-arabian-stud/horses"
            />

            {imagesError && (
              <p className="mt-2 font-['Raleway',sans-serif] text-[0.7rem] text-red-600">
                {imagesError}
              </p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="mb-5">
              <label className="edit-panel-label">Status</label>
              <select
                value={formData.status}
                onChange={(e) =>
                  updateField("status", e.target.value as "available" | "sold")
                }
                className="edit-panel-input"
              >
                <option value="available">Available</option>
                <option value="sold">Sold</option>
              </select>
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
          </div>

          <div className="mb-5">
            <label className="edit-panel-label">Price optional</label>
            <input
              type="text"
              value={formData.price || ""}
              onChange={(e) => updateField("price", e.target.value)}
              className="edit-panel-input"
              placeholder="Contact for pricing"
            />
          </div>
        </section>

        <section className="mb-10">
          <h3 className="mb-5 border-b border-[var(--beige)] pb-3 font-['Cormorant_SC'] text-base tracking-[0.1em] text-[var(--sage-dark)]">
            Ownership & Breeding
          </h3>

          <div className="mb-5">
            <label className="edit-panel-label">Owner *</label>
            <input
              type="text"
              value={formData.owner}
              onChange={(e) => updateField("owner", e.target.value)}
              required
              className="edit-panel-input"
            />
          </div>

          <div className="mb-5">
            <label className="edit-panel-label">Breeder *</label>
            <input
              type="text"
              value={formData.breeder}
              onChange={(e) => updateField("breeder", e.target.value)}
              required
              className="edit-panel-input"
            />
          </div>
        </section>

        <section className="mb-10">
          <h3 className="mb-5 border-b border-[var(--beige)] pb-3 font-['Cormorant_SC'] text-base tracking-[0.1em] text-[var(--sage-dark)]">
            Pedigree Generation 1 - Parents
          </h3>

          <div className="grid grid-cols-2 gap-4">
            <div className="mb-5">
              <label className="edit-panel-label">Sire Name</label>
              <input
                type="text"
                value={formData.pedigree.sire.name}
                onChange={(e) =>
                  updatePedigreeField("sire", "name", e.target.value)
                }
                className="edit-panel-input"
                required
              />

              <input
                type="text"
                value={formData.pedigree.sire.info || ""}
                onChange={(e) =>
                  updatePedigreeField("sire", "info", e.target.value)
                }
                className="edit-panel-input mt-2"
                placeholder="Info e.g. Grey Stallion"
              />
            </div>

            <div className="mb-5">
              <label className="edit-panel-label">Dam Name</label>
              <input
                type="text"
                value={formData.pedigree.dam.name}
                onChange={(e) =>
                  updatePedigreeField("dam", "name", e.target.value)
                }
                className="edit-panel-input"
                required
              />

              <input
                type="text"
                value={formData.pedigree.dam.info || ""}
                onChange={(e) =>
                  updatePedigreeField("dam", "info", e.target.value)
                }
                className="edit-panel-input mt-2"
                placeholder="Info e.g. Bay Mare"
              />
            </div>
          </div>
        </section>

        <section className="mb-10">
          <h3 className="mb-5 border-b border-[var(--beige)] pb-3 font-['Cormorant_SC'] text-base tracking-[0.1em] text-[var(--sage-dark)]">
            Pedigree Generation 2 - Grandparents
          </h3>

          <div className="grid grid-cols-2 gap-4">
            <div className="mb-5">
              <label className="edit-panel-label-small">Sire&apos;s Sire</label>
              <input
                type="text"
                value={formData.pedigree.sireSire.name}
                onChange={(e) =>
                  updatePedigreeField("sireSire", "name", e.target.value)
                }
                className="edit-panel-input"
              />

              <input
                type="text"
                value={formData.pedigree.sireSire.info || ""}
                onChange={(e) =>
                  updatePedigreeField("sireSire", "info", e.target.value)
                }
                className="edit-panel-input mt-2"
                placeholder="Info"
              />
            </div>

            <div className="mb-5">
              <label className="edit-panel-label-small">Sire&apos;s Dam</label>
              <input
                type="text"
                value={formData.pedigree.sireDam.name}
                onChange={(e) =>
                  updatePedigreeField("sireDam", "name", e.target.value)
                }
                className="edit-panel-input"
              />

              <input
                type="text"
                value={formData.pedigree.sireDam.info || ""}
                onChange={(e) =>
                  updatePedigreeField("sireDam", "info", e.target.value)
                }
                className="edit-panel-input mt-2"
                placeholder="Info"
              />
            </div>

            <div className="mb-5">
              <label className="edit-panel-label-small">Dam&apos;s Sire</label>
              <input
                type="text"
                value={formData.pedigree.damSire.name}
                onChange={(e) =>
                  updatePedigreeField("damSire", "name", e.target.value)
                }
                className="edit-panel-input"
              />

              <input
                type="text"
                value={formData.pedigree.damSire.info || ""}
                onChange={(e) =>
                  updatePedigreeField("damSire", "info", e.target.value)
                }
                className="edit-panel-input mt-2"
                placeholder="Info"
              />
            </div>

            <div className="mb-5">
              <label className="edit-panel-label-small">Dam&apos;s Dam</label>
              <input
                type="text"
                value={formData.pedigree.damDam.name}
                onChange={(e) =>
                  updatePedigreeField("damDam", "name", e.target.value)
                }
                className="edit-panel-input"
              />

              <input
                type="text"
                value={formData.pedigree.damDam.info || ""}
                onChange={(e) =>
                  updatePedigreeField("damDam", "info", e.target.value)
                }
                className="edit-panel-input mt-2"
                placeholder="Info"
              />
            </div>
          </div>
        </section>

        <div className="sticky bottom-0 mt-10 flex justify-end gap-3 border-t border-[#e0e0e0] bg-white pt-5">
          <button
            type="button"
            onClick={onCancel}
            disabled={isSaving}
            className="cursor-pointer rounded border border-[#d0d0d0] bg-white px-7 py-3 font-['Raleway'] text-[0.7rem] tracking-[0.1em] text-[var(--text-secondary)] uppercase transition hover:bg-[#f5f5f5] disabled:cursor-not-allowed disabled:opacity-60"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={isSaving}
            className="flex cursor-pointer items-center gap-2 rounded border-0 bg-[var(--teal)] px-7 py-3 font-['Raleway'] text-[0.7rem] tracking-[0.1em] text-white uppercase transition hover:bg-[var(--teal-dark)] disabled:cursor-not-allowed disabled:opacity-60"
          >
            <Save size={16} />
            {isSaving
              ? "Saving..."
              : isCreating
                ? "Create Horse"
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

        .edit-panel-label-small {
          font-family: 'Raleway', sans-serif;
          font-size: 0.65rem;
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
