// Centralized horse data structure

export interface Horse {
  id: string;
  name: string;
  birthYear: number;
  category: "Stallion" | "Mare" | "Foal" | "Sale Horse";
  description: string;
  image: string;
  owner: string;
  breeder: string;
  sire: string;
  dam: string;
  backLink: string;
  status?: "available" | "sold";
  price?: string;
  pedigree: {
    horse: string;
    sire: { name: string; info: string };
    dam: { name: string; info: string };
    sireSire: { name: string; info: string };
    sireDam: { name: string; info: string };
    damSire: { name: string; info: string };
    damDam: { name: string; info: string };
    sireSireSire?: { name: string; info?: string };
    sireSireDam?: { name: string; info?: string };
    sireDamSire?: { name: string; info?: string };
    sireDamDam?: { name: string; info?: string };
    damSireSire?: { name: string; info?: string };
    damSireDam?: { name: string; info?: string };
    damDamSire?: { name: string; info?: string };
    damDamDam?: { name: string; info?: string };
  };
}

export const defaultHorses: Record<string, Horse> = {
  "norrsken-sas": {
    id: "norrsken-sas",
    name: "Norrsken SAS",
    birthYear: 2019,
    category: "Stallion",
    description:
      "Norrsken SAS is a striking bay stallion with exceptional movement and a noble presence. He has inherited the refined head and elegant conformation that defines the Swedish Arabian breeding program. His temperament is exceptional, making him a pleasure to work with both in hand and under saddle.",
    image:
      "https://images.unsplash.com/photo-1721233864500-3c79767d41cd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXJrJTIwYmF5JTIwc3RhbGxpb24lMjBBcmFiaWFuJTIwaG9yc2V8ZW58MXx8fHwxNzcyODEwNTU5fDA&ixlib=rb-4.1.0&q=80&w=1080",
    owner: "Sweden Arabian Stud",
    breeder: "Sweden Arabian Stud",
    sire: "Marwan Al Shaqab",
    dam: "Nordica",
    backLink: "/stallions",
    status: "available",
    pedigree: {
      horse: "Norrsken SAS",
      sire: { name: "Marwan Al Shaqab", info: "Grey Stallion" },
      dam: { name: "Nordica", info: "Bay Mare" },
      sireSire: { name: "Gazal Al Shaqab", info: "Grey" },
      sireDam: { name: "Little Liza Fame", info: "Bay" },
      damSire: { name: "QR Marc", info: "Bay" },
      damDam: { name: "Nordic Star", info: "Grey" },
      sireSireSire: { name: "Anaza El Farid" },
      sireSireDam: { name: "Kajora" },
      sireDamSire: { name: "Fame VF" },
      sireDamDam: { name: "Katahza" },
      damSireSire: { name: "Marwan Al Shaqab" },
      damSireDam: { name: "Swete Dreams" },
      damDamSire: { name: "Imperial Baarez" },
      damDamDam: { name: "Nordia" },
    },
  },
  "viking-star-sas": {
    id: "viking-star-sas",
    name: "Viking Star SAS",
    birthYear: 2020,
    category: "Stallion",
    description:
      "Viking Star SAS represents the perfect blend of classic Arabian type and modern athletic ability. His fluid movement and powerful presence command attention in any setting. With bloodlines combining international champions, he exemplifies our commitment to excellence in breeding.",
    image:
      "https://images.unsplash.com/photo-1689889580395-9af8ef7e6868?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBcmFiaWFuJTIwaG9yc2UlMjBydW5uaW5nJTIwZmllbGR8ZW58MXx8fHwxNzcyODEwNTUwfDA&ixlib=rb-4.1.0&q=80&w=1080",
    owner: "Sweden Arabian Stud",
    breeder: "Sweden Arabian Stud",
    sire: "WH Justice",
    dam: "Stella Arabica",
    backLink: "/stallions",
    status: "available",
    pedigree: {
      horse: "Viking Star SAS",
      sire: { name: "WH Justice", info: "Grey Stallion" },
      dam: { name: "Stella Arabica", info: "Chestnut Mare" },
      sireSire: { name: "Magnum Psyche", info: "Bay" },
      sireDam: { name: "Vona Sher-Renea", info: "Grey" },
      damSire: { name: "Gazal Al Shaqab", info: "Grey" },
      damDam: { name: "Arabella", info: "Bay" },
      sireSireSire: { name: "Padrons Psyche" },
      sireSireDam: { name: "A Fancy Miracle" },
      sireDamSire: { name: "Afire Bey V" },
      sireDamDam: { name: "Wieza" },
      damSireSire: { name: "Anaza El Farid" },
      damSireDam: { name: "Kajora" },
      damDamSire: { name: "Marwan Al Shaqab" },
      damDamDam: { name: "Ariana" },
    },
  },
};

// Get horses from localStorage or use defaults
export function getHorses(): Record<string, Horse> {
  if (typeof window === "undefined") return defaultHorses;

  const stored = localStorage.getItem("horses");
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {
      return defaultHorses;
    }
  }
  return defaultHorses;
}

// Save horses to localStorage
export function saveHorses(horses: Record<string, Horse>): void {
  if (typeof window === "undefined") return;
  localStorage.setItem("horses", JSON.stringify(horses));
}

// Generate URL-friendly ID from name
export function generateId(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}
