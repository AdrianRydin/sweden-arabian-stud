"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { HorsePedigree, PedigreeHorse } from "../data/horseData";

interface PedigreeButtonProps {
  horseName: string;
  pedigree?: HorsePedigree;
}

function PedigreeCell({
  entry,
  emphasis = false,
  layout = "tree",
}: {
  entry?: PedigreeHorse | null;
  emphasis?: boolean;
  layout?: "tree" | "row";
}) {
  const name = entry?.name || "Unknown";

  if (layout === "row") {
    return (
      <div className="flex items-center justify-between gap-3 bg-white px-4 py-3">
        <div className="font-['Cormorant_Garamond',serif] text-base text-[#333]">
          {name}
        </div>
        {entry?.info && (
          <div className="font-['Raleway',sans-serif] text-[0.56rem] tracking-[0.08em] text-(--text-muted) uppercase">
            {entry.info}
          </div>
        )}
      </div>
    );
  }

  return (
    <div
      className={`flex h-full min-h-14 flex-col items-center justify-center px-3 py-2 text-center ${
        emphasis ? "bg-(--beige-light)" : "bg-white"
      }`}
    >
      <div className="font-['Cormorant_Garamond',serif] text-[0.9rem] leading-snug text-[#333] md:text-base">
        {name}
      </div>
      {entry?.info && (
        <div className="mt-0.5 font-['Raleway',sans-serif] text-[0.56rem] tracking-[0.08em] text-(--text-muted) uppercase">
          {entry.info}
        </div>
      )}
    </div>
  );
}

function ColumnHeader({ label }: { label: string }) {
  return (
    <div className="pb-2 text-center font-['Raleway',sans-serif] text-[0.6rem] tracking-[0.16em] text-(--sage-dark) uppercase">
      {label}
    </div>
  );
}

function MobileGroupHeader({ label }: { label: string }) {
  return (
    <div className="mb-2 font-['Raleway',sans-serif] text-[0.6rem] tracking-[0.16em] text-(--sage-dark) uppercase">
      {label}
    </div>
  );
}

export function PedigreeButton({ horseName, pedigree }: PedigreeButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  const hasPedigree = Boolean(pedigree?.sire?.name || pedigree?.dam?.name);

  if (!hasPedigree) {
    return null;
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="inline-block cursor-pointer border border-(--teal) bg-transparent px-6 py-3 font-['Raleway',sans-serif] text-[0.7rem] tracking-[0.14em] text-(--teal) uppercase transition hover:bg-(--teal) hover:text-white"
      >
        Pedigree
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/60 p-4"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="max-h-[90vh] w-full max-w-2xl overflow-y-auto bg-white p-6 md:p-10"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-6 flex items-start justify-between gap-4">
              <div>
                <div className="mb-1 font-['Raleway',sans-serif] text-[0.62rem] tracking-[0.16em] text-(--teal) uppercase">
                  Pedigree
                </div>
                <h2 className="font-['Cormorant_Garamond',serif] text-2xl text-[#333] md:text-3xl">
                  {horseName}
                </h2>
              </div>

              <button
                type="button"
                onClick={() => setIsOpen(false)}
                aria-label="Close pedigree"
                className="flex cursor-pointer items-center border-0 bg-transparent p-2 text-(--text-muted) transition-colors hover:text-[#2a2a2a]"
              >
                <X size={22} />
              </button>
            </div>

            {/* Stacked list - phones */}
            <div className="space-y-5 md:hidden">
              <div>
                <MobileGroupHeader label="Parents" />
                <div className="divide-y divide-[#e8e8e4] border border-[#e8e8e4]">
                  <PedigreeCell entry={pedigree?.sire} layout="row" />
                  <PedigreeCell entry={pedigree?.dam} layout="row" />
                </div>
              </div>

              <div>
                <MobileGroupHeader label="Grandparents" />
                <div className="divide-y divide-[#e8e8e4] border border-[#e8e8e4]">
                  <PedigreeCell entry={pedigree?.sireSire} layout="row" />
                  <PedigreeCell entry={pedigree?.sireDam} layout="row" />
                  <PedigreeCell entry={pedigree?.damSire} layout="row" />
                  <PedigreeCell entry={pedigree?.damDam} layout="row" />
                </div>
              </div>
            </div>

            {/* Tree chart - tablet and up */}
            <div className="hidden md:block">
              <div className="grid grid-cols-3 gap-x-[2px]">
                <div />
                <ColumnHeader label="Parents" />
                <ColumnHeader label="Grandparents" />
              </div>

              <div
                className="grid grid-cols-3 gap-[2px] bg-[#e8e8e4]"
                style={{ gridTemplateRows: "repeat(4, minmax(56px, auto))" }}
              >
                <div style={{ gridColumn: 1, gridRow: "1 / span 4" }}>
                  <PedigreeCell entry={{ name: horseName }} emphasis />
                </div>

                <div style={{ gridColumn: 2, gridRow: "1 / span 2" }}>
                  <PedigreeCell entry={pedigree?.sire} />
                </div>
                <div style={{ gridColumn: 2, gridRow: "3 / span 2" }}>
                  <PedigreeCell entry={pedigree?.dam} />
                </div>

                <div style={{ gridColumn: 3, gridRow: "1 / span 1" }}>
                  <PedigreeCell entry={pedigree?.sireSire} />
                </div>
                <div style={{ gridColumn: 3, gridRow: "2 / span 1" }}>
                  <PedigreeCell entry={pedigree?.sireDam} />
                </div>
                <div style={{ gridColumn: 3, gridRow: "3 / span 1" }}>
                  <PedigreeCell entry={pedigree?.damSire} />
                </div>
                <div style={{ gridColumn: 3, gridRow: "4 / span 1" }}>
                  <PedigreeCell entry={pedigree?.damDam} />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
