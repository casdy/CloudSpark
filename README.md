# ⚡ CloudSpark — AI Prompt Generator

CloudSpark is an AI-powered prompt engineering tool built with Next.js. Give it a short idea and it instantly crafts a comprehensive, structured system prompt ready for use with any AI model.

---

## ✨ Features

- **Dual AI Providers** — Switch between [Groq](https://groq.com) (Llama 3.3 70B) and [Hugging Face](https://huggingface.co) (Meta Llama 3 8B) on the fly
- **Streaming Responses** — Output streams in real-time as it's generated
- **Prompt Engineering Engine** — Generates prompts with structured Role, Objective, Requirements, and Formatting sections
- **Copy to Clipboard** — One-click copy of the generated prompt
- **Dark Futuristic UI** — Built with Tailwind CSS v4 and animated with smooth transitions

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

Create a `.env.local` file in the project root:

```env
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

| Layer     | Technology                                                |
| --------- | --------------------------------------------------------- |
| Framework | [Next.js 16](https://nextjs.org) (App Router + Turbopack) |
| Language  | TypeScript                                                |
| AI SDK    | [Vercel AI SDK v4](https://sdk.vercel.ai)                 |
| Providers | Groq, Hugging Face                                        |
| Styling   | Tailwind CSS v4                                           |
| Markdown  | react-markdown                                            |
| Icons     | lucide-react                                              |

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
