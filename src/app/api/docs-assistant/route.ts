import { NextResponse } from "next/server";
import { retrieveRelevantChunks } from "@/lib/docsRag";

const DEEPSEEK_API_URL = "https://api.deepseek.com/chat/completions";
const MODEL = process.env.DEEPSEEK_MODEL || "deepseek-v4-flash";
const MAX_MESSAGE_LENGTH = 1000;
const MAX_HISTORY_TURNS = 6;

interface ChatTurn {
  role: "user" | "assistant";
  content: string;
}

function parseHistory(value: unknown): ChatTurn[] {
  if (!Array.isArray(value)) return [];
  return value
    .filter(
      (turn): turn is ChatTurn =>
        !!turn &&
        typeof turn === "object" &&
        (turn.role === "user" || turn.role === "assistant") &&
        typeof turn.content === "string",
    )
    .slice(-MAX_HISTORY_TURNS);
}

export async function POST(request: Request) {
  const apiKey = process.env.DEEPSEEK_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "The docs assistant isn't configured yet. Set DEEPSEEK_API_KEY on the server." },
      { status: 500 },
    );
  }

  let body: { message?: unknown; history?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const message = typeof body.message === "string" ? body.message.trim() : "";
  if (!message) {
    return NextResponse.json({ error: "Message is required." }, { status: 400 });
  }
  if (message.length > MAX_MESSAGE_LENGTH) {
    return NextResponse.json({ error: "Message is too long." }, { status: 400 });
  }

  const history = parseHistory(body.history);
  const contextChunks = retrieveRelevantChunks(message, 4);
  const contextBlock = contextChunks.length
    ? contextChunks.map((c, i) => `[${i + 1}] ${c.title} (${c.page})\n${c.content}`).join("\n\n")
    : "No matching documentation was found for this question.";

  const systemPrompt = `You are the Codessa documentation assistant. Codessa is a tool that automatically reviews GitHub pull requests using AI.
Answer the user's question using ONLY the documentation context below. Be concise and direct.
If the context doesn't contain the answer, say you don't have that information in the docs yet instead of guessing — never make anything up.

Documentation context:
${contextBlock}`;

  try {
    const upstream = await fetch(DEEPSEEK_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: MODEL,
        messages: [
          { role: "system", content: systemPrompt },
          ...history,
          { role: "user", content: message },
        ],
        stream: false,
        temperature: 0.3,
      }),
    });

    if (!upstream.ok) {
      const errText = await upstream.text().catch(() => "");
      console.error("DeepSeek API error", upstream.status, errText);
      return NextResponse.json(
        { error: "The assistant is temporarily unavailable. Please try again." },
        { status: 502 },
      );
    }

    const data = await upstream.json();
    const reply: string = data?.choices?.[0]?.message?.content ?? "";

    if (!reply) {
      return NextResponse.json(
        { error: "The assistant didn't return a response. Please try again." },
        { status: 502 },
      );
    }

    const sources = contextChunks.map((c) => ({ title: c.title, href: c.href }));
    return NextResponse.json({ reply, sources });
  } catch (err) {
    console.error("docs-assistant route error", err);
    return NextResponse.json(
      { error: "The assistant is temporarily unavailable. Please try again." },
      { status: 502 },
    );
  }
}
