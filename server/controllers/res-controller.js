const Result = require("../models/result-model");

const store_res = async (req, res) => {
  try {
    const { username, quizName, score } = req.body;

    let existingResult = await Result.findOne({ username });

    if (!existingResult) {
      existingResult = new Result({
        username,
        totalScore: 0,
        quizAttempts: [],
      });
    }

    existingResult.totalScore += score;
    existingResult.quizAttempts.push({ quizName, score });

    await existingResult.save();
    
    res.status(201).send("Result stored successfully");
    console.log(existingResult);
  } catch (error) {
    console.error("Error storing result:", error);
    res.status(500).send("Error storing result");
  }
};

module.exports = { store_res };
