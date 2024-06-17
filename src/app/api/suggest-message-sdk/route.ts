import { google } from "@ai-sdk/google";
import { streamText, generateText, StreamingTextResponse } from "ai";

export const runtime = "edge";

export async function POST(req: Request) {
  try {
    const prompt =
      "Create a list of three open-ended and engaging questions formatted as a single string. Each question should be separated by '||'. These questions are for an anonymous social messaging platform, like Qooh.me, and should be suitable for a diverse audience. Avoid personal or sensitive topics, focusing instead on universal themes that encourage friendly interaction. For example, your output should be structured like this: 'What’s a hobby you’ve recently started?||If you could have dinner with any historical figure, who would it be?||What’s a simple thing that makes you happy?'.Give questions which are not in example. Ensure the questions are intriguing, foster curiosity, and contribute to a positive and welcoming conversational environment.Give new question on each refresh ";

    const result = await streamText({
      model: google("models/gemini-pro"),
      maxTokens: 512,
      temperature: 0.3,
      maxRetries: 5,
      prompt: prompt,
    });

    // const text = result.toAIStream();
    // return new StreamingTextResponse(text);
    return new StreamingTextResponse(result.toAIStream());
    // return new StreamingTextResponse(result.textStream);
    // return Response.json({ result });
    // Respond with the stream
  } catch (error) {
    // General error handling
    console.error("An unexpected error occurred:", error);
    throw error;
  }
}
