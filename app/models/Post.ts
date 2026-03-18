import mongoose from "mongoose";

const PostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },

    image: {
      type: String,
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

export const Post = mongoose.models.Post || mongoose.model("Post", PostSchema);
