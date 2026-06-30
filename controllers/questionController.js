import Question from "../model/questionModal.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const getQuestionList = asyncHandler(async (req, res) => {
  const questions = await Question.find({ isActive: true });

  if (!questions || questions.length === 0) {
    res.status(404);
    throw new Error("No audit queston list found");
  }

  res.status(200).json(questions);
});
