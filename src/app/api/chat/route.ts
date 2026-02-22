import { createHuggingFace } from '@ai-sdk/huggingface';
import { groq } from '@ai-sdk/groq';
import { streamText } from 'ai';
import { prisma } from '@/lib/prisma';


const GUEST_USER_ID = "cloudspark-guest";


// Initialize providers
const huggingface = createHuggingFace({
  apiKey: process.env.HUGGINGFACE_API_KEY,
});

export const maxDuration = 30;

export async function POST(req: Request) {
  // Ensure guest user exists
  await prisma.user.upsert({
    where: { id: GUEST_USER_ID },
    update: {},
    create: {
      id: GUEST_USER_ID,
      email: "guest@cloudspark.tech",
    },
  });


  const { messages, modelId, conversationId, domain } = await req.json();
  const lastMessage = messages[messages.length - 1];

  // Fetch model details from DB
  let modelInfo = await prisma.aIModel.findUnique({
    where: { id: modelId },
  });

  // Fallback if no model selected or found (for initial testing)
  if (!modelInfo) {
    modelInfo = await prisma.aIModel.findFirst({
      where: { isEnabled: true }
    });
  }

  if (!modelInfo) {
    // If table is still empty, use a hardcoded fallback to prevent crash during setup
    modelInfo = {
      id: 'default',
      name: 'llama-3.3-70b-versatile',
      provider: 'Groq',
      type: 'chat',
      isEnabled: true,
      createdAt: new Date()
    };
  }

  // Dynamic Provider Selection
  let model;
  if (modelInfo.provider === 'Groq') {
    model = groq(modelInfo.name);
  } else {
    model = huggingface(modelInfo.name);
  }

  // Phase 3: Dynamic System Prompt logic
  let systemPrompt = "You are a helpful assistant.";
  if (domain === 'Coding') {
    systemPrompt = "You are a senior software architect with deep expertise in Next.js, full-stack React applications, and database optimizations. Provide clean, efficient code and architectural insights.";
  } else if (domain === 'Finance') {
    systemPrompt = "You are a quantitative analyst, capable of discussing stock market trends, investment strategies, and algorithmic logic for finance systems. Maintain a professional, analytical tone.";
  }

  // Persistence Logic
  let activeConversationId = conversationId;
  
  // Create conversation if it doesn't exist
  if (!activeConversationId) {
    const newConv = await prisma.conversation.create({
      data: {
        title: lastMessage.content.substring(0, 50) || "New Conversation",
        userId: GUEST_USER_ID,
      },
    });
    activeConversationId = newConv.id;
  }

  // Save the incoming user message
  await prisma.message.create({
    data: {
      content: lastMessage.content,
      role: 'user',
      conversationId: activeConversationId,
      modelUsed: modelInfo.name,
    },
  });

  // Execute streaming AI response
  const result = await streamText({
    model,
    system: systemPrompt,
    messages,
    onFinish: async ({ text }) => {
      // Asyncly save assistant response to DB when stream completes
      await prisma.message.create({
        data: {
          content: text,
          role: 'assistant',
          conversationId: activeConversationId,
          modelUsed: modelInfo.name,
        },
      });
    },
  });

  // Enrich response with conversation ID for the client
  return result.toDataStreamResponse({
    headers: {
      'x-conversation-id': activeConversationId,
    },
  });
}
