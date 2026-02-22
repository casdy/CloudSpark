const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const models = [
    {
      name: 'llama-3.3-70b-versatile',
      provider: 'Groq',
      type: 'chat',
      isEnabled: true,
    },
    {
      name: 'mixtral-8x7b-32768',
      provider: 'Groq',
      type: 'chat',
      isEnabled: true,
    },
    {
      name: 'meta-llama/Meta-Llama-3-8B-Instruct',
      provider: 'HuggingFace',
      type: 'chat',
      isEnabled: true,
    },
    {
      name: 'microsoft/Phi-3-mini-4k-instruct',
      provider: 'HuggingFace',
      type: 'chat',
      isEnabled: true,
    },
  ];

  for (const model of models) {
    await prisma.aIModel.upsert({
      where: { id: model.name }, // Using name as ID for seeding simplicity or just unique check
      update: model,
      create: model,
    });
  }

  console.log('Seed completed: Models initialized.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
