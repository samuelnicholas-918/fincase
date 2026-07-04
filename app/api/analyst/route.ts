import Anthropic from "@anthropic-ai/sdk";
import { NextResponse } from "next/server";
import { buildAnalystContext } from "@/lib/data";

// Node runtime for Anthropic SDK stability; SP-3 moves to edge streaming.
export const runtime = "nodejs";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

const SYSTEM_PROMPT = `You are the FinCase AI Analyst for Raymond Edition #1.

You answer questions ONLY about Raymond Limited's FY17–FY26 financials and the FY2023–24 demerger into Raymond Ltd, Raymond Lifestyle Ltd, and Raymond Realty Ltd.

Rules:
- Ground every figure in the dataset below. Tag figures with their source when possible, e.g. [Working Capital · FY26] or [Debt · FY24].
- If asked about anything outside this dataset (other companies, live prices, personal advice), politely refuse: "I only know Raymond's FY17–FY26 numbers."
- Flag FY24 one-offs when relevant — Lifestyle FY24 net profit is inflated by demerger accounting entries.
- Be concise, precise, and classroom-ready. Use ₹ crore for money.
- Do not invent numbers. If a figure is not in the dataset, say so.

DATASET:
${buildAnalystContext()}`;

export async function POST(request: Request) {
  const apiKey = process.env.ANTHROPIC_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      {
        error:
          "ANTHROPIC_API_KEY is not configured. Add it to .env.local (see .env.example).",
      },
      { status: 503 },
    );
  }

  let body: { messages?: ChatMessage[] };
  try {
    body = (await request.json()) as { messages?: ChatMessage[] };
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const messages = body.messages?.filter(
    (m) => (m.role === "user" || m.role === "assistant") && typeof m.content === "string",
  );

  if (!messages?.length) {
    return NextResponse.json({ error: "messages array is required" }, { status: 400 });
  }

  const client = new Anthropic({ apiKey });

  try {
    const response = await client.messages.create({
      model: "claude-3-5-haiku-latest",
      max_tokens: 1024,
      system: SYSTEM_PROMPT,
      messages: messages.map((m) => ({
        role: m.role,
        content: m.content,
      })),
    });

    const text = response.content
      .filter((block): block is Anthropic.TextBlock => block.type === "text")
      .map((block) => block.text)
      .join("\n");

    return NextResponse.json({ reply: text });
  } catch {
    return NextResponse.json(
      { error: "Connection interrupted" },
      { status: 502 },
    );
  }
}
