import { checkApiLimit, increaseApiLimit } from "@/lib/api-limit";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { Configuration, OpenAIApi, ChatCompletionRequestMessage } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const instructionMessage: ChatCompletionRequestMessage = {
  role: "system",
  content:
    "You are code generator. You must answer only in markdown code snippets. Use Code comments for explanations.",
};

export async function POST(request: Request) {
  try {
    const { userId } = auth();
    const body = await request.json();
    const { messages } = body;

    if (!userId) {
      return new Response("Unauthenticated", {
        status: 401,
      });
    }

    if (!configuration.apiKey) {
      return new Response("Required API key", {
        status: 401,
      });
    }

    if (!messages) {
      return new Response("Messages are Required", {
        status: 400,
      });
    }

    const freeTrial = await checkApiLimit();

    if (!freeTrial) {
      return new Response("Free trial has been expired", {
        status: 403,
      });
    }

    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [instructionMessage, ...messages],
    });

    await increaseApiLimit(); // increment the user api count

    return NextResponse.json(response.data.choices[0].message);
  } catch (error) {
    console.log(error);
    return new Response("Internal Server Error", {
      status: 500,
    });
  }
}
