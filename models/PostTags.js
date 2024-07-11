import { Schema, model } from "mongoose";

const PostTagsSchema = new Schema(
  {
    title: { type: String, required: true },
  },
  { timestamps: true }
);

const PostTags = model("PostTags", PostTagsSchema);
export default PostTags;
