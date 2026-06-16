export interface CatalogHorse {
  id: string;
  name: string;
  parentage: string;
  image: string;
  description: string;
}

export interface Foal extends CatalogHorse {
  year: string;
}

export interface SaleHorse extends CatalogHorse {
  badge: string;
  price: string;
}

export const mares: CatalogHorse[] = [
  {
    id: "isadora-sas",
    name: "Isadora SAS",
    parentage: "Marwan Al Shaqab x Ingrid AT",
    image:
      "https://images.unsplash.com/photo-1758573951599-eb88f28f7297?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aGl0ZSUyMEFyYWJpYW4lMjBob3JzZSUyMHNob3d8ZW58MXx8fHwxNzcyODEwNTUwfDA&ixlib=rb-4.1.0&q=80&w=400",
    description:
      "A refined broodmare with classic Arabian type and a consistently strong production record.",
  },
  {
    id: "saga-arabica",
    name: "Saga Arabica",
    parentage: "Kahil Al Shaqab x Solveig",
    image:
      "https://images.unsplash.com/photo-1617745021057-ca21f1be34a0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmV5JTIwQXJhYmlhbiUyMG1hcmUlMjBwYXN0dXJlfGVufDF8fHx8MTc3MjgxMDU1NXww&ixlib=rb-4.1.0&q=80&w=400",
    description:
      "Known for her elegance and strong maternal qualities, passing on movement and expression.",
  },
  {
    id: "freya-al-noor",
    name: "Freya Al Noor",
    parentage: "WH Justice x Fjord Rose",
    image:
      "https://images.unsplash.com/photo-1733065122105-8f6bd5886857?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBcmFiaWFuJTIwaG9yc2UlMjBwb3J0cmFpdCUyMHByb2ZpbGV8ZW58MXx8fHwxNzcyODEwNTQ5fDA&ixlib=rb-4.1.0&q=80&w=400",
    description:
      "A beautiful mare with an expressive head and balance, contributing type and charisma.",
  },
  {
    id: "aurora-sas",
    name: "Aurora SAS",
    parentage: "Morion x Borealis Queen",
    image:
      "https://images.unsplash.com/photo-1724048413085-1c8d81b3ffa3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3JzZSUyMHN0dWQlMjBmYXJtJTIwU3dlZGVufGVufDF8fHx8MTc3MjgxMDU1MXww&ixlib=rb-4.1.0&q=80&w=400",
    description:
      "A versatile producer with athletic bloodlines and a calm, trainable temperament.",
  },
  {
    id: "linnea-arabica",
    name: "Linnea Arabica",
    parentage: "Wadee Al Shaqab x Nordic Grace",
    image:
      "https://images.unsplash.com/photo-1689889580395-9af8ef7e6868?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBcmFiaWFuJTIwaG9yc2UlMjBydW5uaW5nJTIwZmllbGR8ZW58MXx8fHwxNzcyODEwNTUwfDA&ixlib=rb-4.1.0&q=80&w=400",
    description:
      "An athletic mare with fluid movement and strong legs, ideal for future performance lines.",
  },
  {
    id: "sigrid-al-majd",
    name: "Sigrid Al Majd",
    parentage: "Padrons Psyche x Sigrid",
    image:
      "https://images.unsplash.com/photo-1721233864500-3c79767d41cd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXJrJTIwYmF5JTIwc3RhbGxpb24lMjBBcmFiaWFuJTIwaG9yc2V8ZW58MXx8fHwxNzcyODEwNTU5fDA&ixlib=rb-4.1.0&q=80&w=400",
    description:
      "A foundation mare with proven pedigree depth and excellent maternal consistency.",
  },
];

export const foals: Foal[] = [
  {
    id: "odin-sas-2025",
    name: "Odin SAS 2025",
    parentage: "Norrsken SAS x Aurora SAS",
    year: "Colt - 2025",
    image:
      "https://images.unsplash.com/photo-1691567951778-c01762eb13cb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBcmFiaWFuJTIwaG9yc2UlMjBmb2FsJTIweW91bmd8ZW58MXx8fHwxNzcyODEwNTU1fDA&ixlib=rb-4.1.0&q=80&w=400",
    description:
      "A promising young colt with a balanced frame, confident attitude, and elastic movement.",
  },
  {
    id: "embla-sas-2025",
    name: "Embla SAS 2025",
    parentage: "Viking Star SAS x Isadora SAS",
    year: "Filly - 2025",
    image:
      "https://images.unsplash.com/photo-1733065122105-8f6bd5886857?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBcmFiaWFuJTIwaG9yc2UlMjBwb3J0cmFpdCUyMHByb2ZpbGV8ZW58MXx8fHwxNzcyODEwNTQ5fDA&ixlib=rb-4.1.0&q=80&w=400",
    description:
      "An elegant filly with feminine type, expressive eyes, and excellent future broodmare potential.",
  },
  {
    id: "thor-sas-2025",
    name: "Thor SAS 2025",
    parentage: "Norrsken SAS x Saga Arabica",
    year: "Colt - 2025",
    image:
      "https://images.unsplash.com/photo-1617745021057-ca21f1be34a0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmV5JTIwQXJhYmlhbiUyMG1hcmUlMjBwYXN0dXJlfGVufDF8fHx8MTc3MjgxMDU1NXww&ixlib=rb-4.1.0&q=80&w=400",
    description:
      "A substantial colt with strong topline and a naturally curious, people-oriented temperament.",
  },
];

export const saleHorses: SaleHorse[] = [
  {
    id: "solveig-sas",
    name: "Solveig SAS",
    parentage: "Norrsken SAS x Freya Al Noor",
    badge: "AVAILABLE",
    price: "Price on application",
    description:
      "3-year-old grey filly. Exceptional mover with outstanding head.",
    image:
      "https://images.unsplash.com/photo-1617745021057-ca21f1be34a0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmV5JTIwQXJhYmlhbiUyMG1hcmUlMjBwYXN0dXJlfGVufDF8fHx8MTc3MjgxMDU1NXww&ixlib=rb-4.1.0&q=80&w=400",
  },
  {
    id: "baldur-sas",
    name: "Baldur SAS",
    parentage: "Viking Star SAS x Linnea Arabica",
    badge: "AVAILABLE",
    price: "Price on application",
    description:
      "4-year-old bay colt. Stunning presence and natural show ability.",
    image:
      "https://images.unsplash.com/photo-1656480652731-f689059a4582?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGVzdG51dCUyMEFyYWJpYW4lMjBob3JzZSUyMHNhbGV8ZW58MXx8fHwxNzcyODEwNTYwfDA&ixlib=rb-4.1.0&q=80&w=400",
  },
  {
    id: "valkyrie-sas",
    name: "Valkyrie SAS",
    parentage: "Bjorn Al Saud x Aurora SAS",
    badge: "AVAILABLE",
    price: "Price on application",
    description:
      "5-year-old grey mare. Show trained, multiple champion titles.",
    image:
      "https://images.unsplash.com/photo-1758573951599-eb88f28f7297?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aGl0ZSUyMEFyYWJpYW4lMjBob3JzZSUyMHNob3d8ZW58MXx8fHwxNzcyODEwNTUwfDA&ixlib=rb-4.1.0&q=80&w=400",
  },
  {
    id: "rune-sas",
    name: "Rune SAS",
    parentage: "Norrsken SAS x Saga Arabica",
    badge: "AVAILABLE",
    price: "Price on application",
    description:
      "2-year-old chestnut colt. Exceptional bloodlines, brilliant future.",
    image:
      "https://images.unsplash.com/photo-1691567951778-c01762eb13cb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBcmFiaWFuJTIwaG9yc2UlMjBmb2FsJTIweW91bmd8ZW58MXx8fHwxNzcyODEwNTU1fDA&ixlib=rb-4.1.0&q=80&w=400",
  },
];
