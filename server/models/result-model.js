const mongoose = require("mongoose");

const resultModel = new mongoose.Schema({
  username: { type: String },
  totalScore: { type: Number, default: 0 },
  quizAttempts: [
    {
      quizName: { type: String },
      score: { type: Number },
      dateTaken: { type: Date, default: Date.now() },
    },
  ],
});

const Result = mongoose.model("Result", resultModel);
module.exports = Result;
