import mongoose from "mongoose";

const HorseSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    birthYear: {
      type: Number,
      required: true,
    },
    breed: {
      type: String,
      required: true,
      trim: true,
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
      trim: true,
    },
    breeder: {
      type: String,
      required: true,
      trim: true,
    },
    sire: {
      type: String,
      required: true,
      trim: true,
    },
    dam: {
      type: String,
      required: true,
      trim: true,
    },
    pedigree: {
      type: mongoose.Schema.Types.Mixed,
      required: false,
      default: {},
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    section: {
      type: String,
      required: true,
      enum: ["mares", "stallions", "foals", "sale-horses", "fillies"],
    },
    status: {
      type: String,
      enum: ["available", "sold"],
      default: "available",
    },
    price: {
      type: String,
      required: false,
      default: "",
    },
    isVisible: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
);

export const Horse =
  mongoose.models.Horse || mongoose.model("Horse", HorseSchema);
