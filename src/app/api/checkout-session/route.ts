import { NextResponse } from "next/server";

export async function POST() {
  if (!process.env.STRIPE_SECRET_KEY) {
    return NextResponse.json(
      {
        error:
          "Online gateway checkout is not configured yet. FPS/PayMe can use manual confirmation; add gateway credentials before enabling live AlipayHK or card capture.",
      },
      { status: 503 },
    );
  }

  return NextResponse.json(
    {
      error:
        "Gateway checkout scaffolding is ready, but live session creation still needs to be connected with real merchant credentials.",
    },
    { status: 501 },
  );
}
