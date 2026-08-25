export type HorseSection = "females" | "males" | "sale-horses";

export type HorseStatus = "available" | "sold";

export interface PedigreeHorse {
  name: string;
  info?: string;
}

export interface HorsePedigree {
  horse: string;
  sire: PedigreeHorse;
  dam: PedigreeHorse;
  sireSire: PedigreeHorse;
  sireDam: PedigreeHorse;
  damSire: PedigreeHorse;
  damDam: PedigreeHorse;
  sireSireSire?: PedigreeHorse;
  sireSireDam?: PedigreeHorse;
  sireDamSire?: PedigreeHorse;
  sireDamDam?: PedigreeHorse;
  damSireSire?: PedigreeHorse;
  damSireDam?: PedigreeHorse;
  damDamSire?: PedigreeHorse;
  damDamDam?: PedigreeHorse;
}

export interface Horse {
  _id?: string;
  name: string;
  birthYear: number;
  breed: string;
  description: string;
  image: string;
  images: string[];
  owner: string;
  breeder: string;
  sire: string;
  dam: string;
  pedigree: HorsePedigree;
  slug?: string;
  section: HorseSection;
  status: HorseStatus;
  price?: string;
  isVisible: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export const horseSections: HorseSection[] = [
  "males",
  "females",
  "sale-horses",
];

export const horseSectionLabels: Record<HorseSection, string> = {
  males: "Male",
  females: "Female",
  "sale-horses": "Sale Horse",
};

export const horseSectionPluralLabels: Record<HorseSection, string> = {
  males: "Males",
  females: "Females",
  "sale-horses": "Sale Horses",
};

export const horseSectionBackLinks: Record<HorseSection, string> = {
  males: "/males",
  females: "/females",
  "sale-horses": "/sale-horses",
};

export function createEmptyHorse(): Horse {
  return {
    name: "",
    birthYear: new Date().getFullYear(),
    breed: "",
    description: "",
    image: "",
    images: [],
    owner: "Sweden Arabian Stud",
    breeder: "Sweden Arabian Stud",
    sire: "",
    dam: "",
    section: "males",
    status: "available",
    price: "",
    isVisible: true,
    pedigree: {
      horse: "",
      sire: { name: "", info: "" },
      dam: { name: "", info: "" },
      sireSire: { name: "", info: "" },
      sireDam: { name: "", info: "" },
      damSire: { name: "", info: "" },
      damDam: { name: "", info: "" },
    },
  };
}
