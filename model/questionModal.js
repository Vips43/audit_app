import mongoose, { mongo } from "mongoose";

const questSchema = new mongoose.Schema(
  {
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      auto: true,
    },
    text: {
      type: String,
      required: [true, "Question text is required"],
      trim: true,
    },
    category: {
      type: String,
      required: [true, "Category is required"],
      trim: true,
      index: true,
    },
    riskLevel: {
      type: String,
      enum: {
        values: ["low", "medium", "high", "critical"],
        message: "${VALUE} is not valid risk level",
      },
      default: "medium",
    },
    applicableDepartment: { type: String, trim: true, default: "All" },
    isActive: { type: Boolean, default: true, index: true },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },
  },
  { timestamps: true },
);

questSchema.index({ text: "text" });
const Question = mongoose.model("Question", questSchema);

export default Question;