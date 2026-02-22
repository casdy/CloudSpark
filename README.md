# ⚡ CloudSpark — AI Chat bot

CloudSpark is an AI-powered chat bot built with Next.js. Give it a short idea and it instantly crafts a comprehensive, structured system prompt ready for use with any AI model or just chat with it.

---

## ✨ CloudSpark v3 Features

- **Neural Stability Engine** — Optimized database layer standardizing on Prisma 6 and SQLite for guaranteed persistence and reliability.
- **Premium Tech Loader** — A state-of-the-art "System Boot" sequence that synchronizes neural clusters before interface initialization, ensuring a seamless user experience.
- **Dual Neural Hubs** — Seamless routing between [Groq](https://groq.com) and [Hugging Face](https://huggingface.co) models with domain-specific calibration for Coding and Finance.
- **Singularization Protocol** — A "Pending Cluster" lock that prevents fragmented history by ensuring conversation creation is a strictly singular, atomic action.
- **Async Dynamic Layer** — Advanced Next.js 16 route handling that correctly leverages asynchronous parameters for robust cluster retrieval.
- **Cyber-Terminal UI** — High-contrast dark mode featuring glassmorphism, fluid micro-animations, and a collapsible neural cluster sidebar.

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- A [Groq API key](https://console.groq.com) and/or a [Hugging Face API key](https://huggingface.co/settings/tokens)

### Installation

```bash
# Clone the repo
git clone <your-repo-url>
cd CloudSpark

# Install dependencies
npm install
```

### Environment Variables

Create a `.env` file in the project root:

```env
DATABASE_URL="file:./dev.db"
GROQ_API_KEY=your_groq_api_key_here
HUGGINGFACE_API_KEY=your_huggingface_api_key_here
```

> **Note:** You only need one provider's API key to run the app, but both are supported.

### Run the Dev Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🛠️ Tech Stack

| Layer      | Technology                                                |
| ---------- | --------------------------------------------------------- |
| Framework  | [Next.js 16](https://nextjs.org) (App Router + Turbopack) |
| ORM        | [Prisma 6](https://www.prisma.io) (SQLite)                |
| Language   | TypeScript                                                |
| AI SDK     | [Vercel AI SDK v4](https://sdk.vercel.ai)                 |
| Providers  | Groq, Hugging Face                                        |
| UI Library | Lucide React, Framer Motion (Transitions)                 |
| Styling    | Tailwind CSS v4                                           |

---

## 🛠️ Troubleshooting

### Workspace Root Confusion (Windows)

If you encounter the error `Can't resolve '@tailwindcss/typography'`, it is likely because Next.js/Tailwind is detecting a `package.json` in a parent directory (e.g., your home folder `C:\Users\User`) and assuming a workspace root.

**Solutions:**

1.  **Strict Project Root**: The project is configured with `turbopack.root` in `next.config.ts` to enforce the local directory.
2.  **Explicit Plugin Paths**: In `src/app/globals.css`, we use an explicit relative path for Tailwind plugins:
    ```css
    @plugin "../../node_modules/@tailwindcss/typography";
    ```
3.  **Cleanup**: If possible, rename or move any stray `package.json` files in your home directory.

---

## 📦 Scripts

```bash
npm run dev     # Start development server
npm run build   # Create production build
npm run start   # Start production server
npm run lint    # Run ESLint
```

---

## 🚢 Deployment

The easiest way to deploy CloudSpark is with [Vercel](https://vercel.com). Make sure to add your `GROQ_API_KEY` and `HUGGINGFACE_API_KEY` as environment variables in your Vercel project settings.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)
