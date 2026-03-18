import mongoose from "mongoose";

const HorseSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    birthYear: {
      type: Number,
      required: true,
    },
    breed: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    owner: {
      type: String,
      required: true,
    },
    breeder: {
      type: String,
      required: true,
    },
    pedigree: {
      type: mongoose.Schema.Types.Mixed,
      required: false,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true },
);

export const Horse =
  mongoose.models.Horse || mongoose.model("Horse", HorseSchema);
