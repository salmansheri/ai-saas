import { checkApiLimit, increaseApiLimit } from "@/lib/api-limit";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import Replicate from "replicate";

const replication = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN!,
});

export async function POST(request: Request) {
  try {
    const { userId } = auth();
    const body = await request.json();
    const { prompt } = body;

    if (!userId) {
      return new Response("Unauthenticated", {
        status: 401,
      });
    }

    if (!prompt) {
      return new Response("Messages are Required", {
        status: 400,
      });
    }

    const freeLimit = await checkApiLimit();

    if (!freeLimit) {
      return new Response("Free Limit exceeded", {
        status: 403,
      });
    }

    const response = await replication.run(
      "riffusion/riffusion:8cf61ea6c56afd61d8f5b9ffd14d7c216c0a93844ce2d82ac1c9ecc9c7f24e05",
      {
        input: {
          prompt_a: prompt,
        },
      },
    );

    await increaseApiLimit();

    return NextResponse.json(response);
  } catch (error) {
    console.log(error);
    return new Response("Internal Server Error", {
      status: 500,
    });
  }
}
