import Anthropic from "@anthropic-ai/sdk";
import { buildAnalystContext } from "@/lib/data";

export const runtime = "nodejs";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

const SYSTEM_PROMPT = `You are the FinCase AI Analyst for Raymond Edition #1.

You answer questions ONLY about Raymond Limited's FY17–FY26 financials and the FY2023–24 demerger into Raymond Ltd, Raymond Lifestyle Ltd, and Raymond Realty Ltd.

Rules:
- Ground every figure in the dataset below. Tag EVERY figure with a citation chip in this exact format: [Label · FYxx]
  Examples: [Revenue · FY23], [Debt · FY24], [Working Capital · FY26], [Realty · FY26], [OPM · FY23]
  Use labels from: Revenue, Debt, Working Capital, Realty, OPM, Lifestyle, Demerger, Overview.
- If asked about anything outside this dataset (other companies, live prices, personal advice), politely refuse: "I only know Raymond's FY17–FY26 numbers."
- Flag FY24 one-offs when relevant — Lifestyle FY24 net profit is inflated by demerger accounting entries.
- Be concise, precise, and classroom-ready. Use ₹ crore for money.
- Do not invent numbers. If a figure is not in the dataset, say so.

DATASET:
${buildAnalystContext()}`;

export async function POST(request: Request) {
  const apiKey = process.env.ANTHROPIC_API_KEY;

  if (!apiKey) {
    return new Response(
      "⚠ ANTHROPIC_API_KEY NOT CONFIGURED — ADD IT TO .ENV.LOCAL",
      { status: 503, headers: { "Content-Type": "text/plain; charset=utf-8" } },
    );
  }

  let body: { messages?: ChatMessage[] };
  try {
    body = (await request.json()) as { messages?: ChatMessage[] };
  } catch {
    return new Response("⚠ INVALID REQUEST", {
      status: 400,
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  }

  const messages = body.messages?.filter(
    (m) => (m.role === "user" || m.role === "assistant") && typeof m.content === "string",
  );

  if (!messages?.length) {
    return new Response("⚠ MESSAGES REQUIRED", {
      status: 400,
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  }

  const client = new Anthropic({ apiKey });

  try {
    const stream = client.messages.stream({
      model: "claude-3-5-haiku-latest",
      max_tokens: 1024,
      system: SYSTEM_PROMPT,
      messages: messages.map((m) => ({
        role: m.role,
        content: m.content,
      })),
    });

    const encoder = new TextEncoder();
    const readable = new ReadableStream({
      async start(controller) {
        try {
          for await (const event of stream) {
            if (
              event.type === "content_block_delta" &&
              event.delta.type === "text_delta"
            ) {
              controller.enqueue(encoder.encode(event.delta.text));
            }
          }
          controller.close();
        } catch {
          controller.enqueue(encoder.encode("\n⚠ CONNECTION INTERRUPTED — RETRY"));
          controller.close();
        }
      },
    });

    return new Response(readable, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-store",
      },
    });
  } catch {
    return new Response("⚠ CONNECTION INTERRUPTED — RETRY", {
      status: 502,
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  }
}
