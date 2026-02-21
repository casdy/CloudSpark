import { createHuggingFace } from '@ai-sdk/huggingface';
import { groq } from '@ai-sdk/groq';
import { streamText } from 'ai';

// Initialize Hugging Face instance
const huggingface = createHuggingFace({
  apiKey: process.env.HUGGINGFACE_API_KEY,
});

export const maxDuration = 30;

export async function POST(req: Request) {
  // Extract prompt and provider from request body
  const { prompt, provider } = await req.json();

  // Dynamic Provider Selection
  let model;
  if (provider === 'groq') {
    model = groq('llama-3.3-70b-versatile');
  } else {
    model = huggingface('meta-llama/Meta-Llama-3-8B-Instruct');
  }

  // System instructions as per PRD requirements
  const system = `You are an elite AI Prompt Engineer. Your single purpose is to take a user's short idea and expand it into a comprehensive system prompt to instruct another AI.
Your output must ALWAYS include:

Role: Assign a specific expert persona.
Objective: Clearly define the primary goal.
Requirements: Break down specific features or technical constraints.
Formatting: Instruct the AI on how to present its response.

CRITICAL INSTRUCTIONS:
Output ONLY the generated prompt. No conversational filler.
Use markdown formatting.

=== EXAMPLE ===
USER INPUT: build a transit app for winnipeg called Wpass

GENERATED PROMPT:
Role: Act as a Senior Mobile App Developer and UX Designer.

Objective: Write a detailed technical specification and PRD for Wpass, a mobile application for Winnipeg Transit.

Requirements:
1. The application must include real-time bus tracking via API polling.
2. Include architecture for a secure digital payment system for bus passes.
3. Recommend a cross-platform tech stack (e.g., React Native).

Formatting: Present your response using clear markdown headings and bullet points.
=== END EXAMPLE ===`;

  // Call streamText with selected model, system prompt, and user prompt
  const result = await streamText({
    model,
    system,
    messages: [{ role: 'user', content: prompt }],
  });

  // Return streaming response
  return result.toDataStreamResponse();
}
