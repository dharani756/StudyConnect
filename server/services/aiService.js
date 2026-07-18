const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(
  process.env.GEMINI_API_KEY
);

async function generateAnswer(question) {
  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash",
    });

    const result = await model.generateContent(question);

    return result.response.text();
  } catch (error) {
    console.error("========== GEMINI ERROR ==========");
    console.error(error);
    console.error("=================================");

    throw error;
  }
}

module.exports = generateAnswer;