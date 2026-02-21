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
| AI SDK    | [Vercel AI SDK](https://sdk.vercel.ai)                    |
| Providers | Groq, Hugging Face                                        |
| Styling   | Tailwind CSS v4                                           |
| Markdown  | react-markdown                                            |
| Icons     | lucide-react                                              |

---

## 📁 Project Structure

```
src/
└── app/
    ├── page.tsx          # Main UI — prompt input, provider selector, output display
    ├── layout.tsx        # Root layout and metadata
    ├── globals.css       # Global styles (Tailwind import)
    └── api/
        └── generate/
            └── route.ts  # POST endpoint — handles provider selection and streaming
```

---

## 🔑 API Reference

### `POST /api/generate`

Generates a structured AI prompt based on the user's input.

**Request Body:**

```json
{
  "prompt": "Your short idea here",
  "provider": "groq" | "huggingface"
}
```

**Response:** A streamed text response (data stream format via AI SDK).

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
