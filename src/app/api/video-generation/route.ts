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
      return new Response("Free Limit is Exceeded", {
        status: 403,
      });
    }

    const response = await replication.run(
      "anotherjesse/zeroscope-v2-xl:9f747673945c62801b13b84701c783929c0ee784e4748ec062204894dda1a351",
      {
        input: {
          prompt: prompt,
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
