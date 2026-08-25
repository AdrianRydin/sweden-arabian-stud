export interface Moment {
  _id?: string;
  title: string;
  description: string;
  images: string[];
  slug?: string;
  isVisible: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export function createEmptyMoment(): Moment {
  return {
    title: "",
    description: "",
    images: [],
    isVisible: true,
  };
}
