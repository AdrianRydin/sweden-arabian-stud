import mongoose from "mongoose";

const MomentSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: false,
      default: "",
    },
    images: {
      type: [String],
      required: true,
      validate: {
        validator: (images: string[]) => Array.isArray(images) && images.length > 0,
        message: "At least one image is required",
      },
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    isVisible: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
);

export const Moment =
  mongoose.models.Moment || mongoose.model("Moment", MomentSchema);
