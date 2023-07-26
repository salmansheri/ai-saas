import { checkApiLimit, increaseApiLimit } from "@/lib/api-limit";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export async function POST(request: Request) {
  try {
    const { userId } = auth();
    const body = await request.json();
    const { prompt, amount = 1, resolution = "512x512" } = body;

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

    if (!prompt) {
      return new Response("Prompt are Required", {
        status: 400,
      });
    }
    if (!amount) {
      return new Response("Amount are Required", {
        status: 400,
      });
    }
    if (!resolution) {
      return new Response("Resolution are Required", {
        status: 400,
      });
    }

    const freeLimit = await checkApiLimit();

    if (!freeLimit) {
      return new Response("Free Limit has been exceeded", {
        status: 403,
      });
    }

    const response = await openai.createImage({
      prompt,
      n: parseInt(amount, 10),
      size: resolution,
    });

    await increaseApiLimit();

    return NextResponse.json(response.data.data);
  } catch (error) {
    console.log("[IMAGE_ERROR]", error);
    return new Response("Internal Server Error", {
      status: 500,
    });
  }
}
