import mongoose from "mongoose";
import slug from "mongoose-slug-updater";
import { ICategory } from "../config/interface";

const Schema = mongoose.Schema;

mongoose.plugin(slug);

const categorySchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Please add your category"],
      trim: true,
      maxLength: [100, "Name không dài quá 100 ký tự"],
    },
    slug: {
      type: String,
      slug: "name",
      unique: true,
    },
    description: {
      type: String,
      trim: true,
    },
    deleted: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<ICategory>("category", categorySchema);
