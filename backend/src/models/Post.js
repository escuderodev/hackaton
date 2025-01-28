import mongoose from "mongoose";
import { TypeOfTasks } from "../models/TypeOfTasks.js";

const postSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  author: { type: String, required: true },
  discipline: { type: String, required: true },
  typeOfTasks: {
    type: String,
    required: true,
    enum: Object.values(TypeOfTasks), // Fazendo a validação com os valores do enum
  },
  endDate: { type: Date },
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }], // Referência aos comentários
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date },
});

const post = mongoose.model("Post", postSchema);

export { post, postSchema };