"use client";

import { useState } from "react";
import { useCompletion } from "ai/react";
import ReactMarkdown from "react-markdown";
import { 
  Sparkles, 
  Settings, 
  Cpu, 
  Loader2, 
  Copy, 
  Check, 
  ChevronDown,
  BrainCircuit,
  Zap
} from "lucide-react";

export default function Home() {
  const [provider, setProvider] = useState<"groq" | "huggingface">("groq");
  const [showSettings, setShowSettings] = useState(false);
  const [copied, setCopied] = useState(false);

  const { completion, input, handleInputChange, handleSubmit, isLoading } = useCompletion({
    api: "/api/generate",
    body: { provider },
  });

  const copyToClipboard = () => {
    if (!completion) return;
    navigator.clipboard.writeText(completion);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0c] text-slate-100 selection:bg-blue-500/30 font-sans">
      {/* Background Decor */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/10 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-600/10 blur-[120px] rounded-full" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 py-12 md:py-20">
        {/* Header */}
        <header className="flex items-center justify-between mb-12">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
                CloudSpark
              </h1>
              <p className="text-[10px] uppercase tracking-[0.2em] text-blue-400 font-semibold">
                Multi-Model API Router
              </p>
            </div>
          </div>

          <button 
            onClick={() => setShowSettings(!showSettings)}
            className="p-2.5 rounded-full bg-slate-800/50 border border-slate-700/50 hover:border-slate-500 transition-all text-slate-400 hover:text-white"
          >
            <Settings className="w-5 h-5" />
          </button>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Controls Panel */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-3xl p-6 shadow-2xl">
              <div className="flex items-center gap-2 mb-6 text-slate-300">
                <BrainCircuit className="w-4 h-4 text-blue-400" />
                <h2 className="text-sm font-medium">Configure Brain</h2>
              </div>

              <div className="space-y-4">
                <div className="relative">
                  <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2 block px-1">
                    Inference Provider
                  </label>
                  <div className="relative">
                    <select
                      value={provider}
                      onChange={(e) => setProvider(e.target.value as any)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm appearance-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/50 outline-none transition-all cursor-pointer"
                    >
                      <option value="groq">Groq • Llama 3.3 70B</option>
                      <option value="huggingface">Hugging Face • Llama 3 8B</option>
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none" />
                  </div>
                </div>

                <div className="p-4 bg-blue-500/5 rounded-xl border border-blue-500/10">
                  <div className="flex gap-3">
                    <Zap className="w-4 h-4 text-blue-400 shrink-0" />
                    <p className="text-[12px] text-slate-400 leading-relaxed">
                      {provider === "groq" 
                        ? "Currently utilizing Groq's LPU architecture for ultra-low latency inference with the massive 70B parameter model." 
                        : "Leveraging Hugging Face's global Inference API for reliable and efficient generation via Llama 3 8B."}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* BYOK Settings Mockup */}
            {showSettings && (
              <div className="bg-slate-900/50 backdrop-blur-xl border border-blue-500/20 rounded-3xl p-6 shadow-2xl animate-in fade-in slide-in-from-top-4 duration-300">
                <div className="flex items-center gap-2 mb-6 text-slate-300">
                  <Settings className="w-4 h-4 text-blue-400" />
                  <h2 className="text-sm font-medium">Personal API Keys</h2>
                </div>
                <div className="space-y-4 opacity-50 cursor-not-allowed">
                  <div>
                    <label className="text-[10px] text-slate-500 uppercase block mb-1 px-1">Groq Key</label>
                    <input disabled placeholder="gsk_..." className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs" />
                  </div>
                  <div>
                    <label className="text-[10px] text-slate-500 uppercase block mb-1 px-1">Hugging Face Key</label>
                    <input disabled placeholder="hf_..." className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs" />
                  </div>
                  <p className="text-[10px] text-blue-400 text-center italic">BYOK CloudSpark coming soon</p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 pt-4">
              <div className="relative">
                <textarea
                  value={input}
                  onChange={handleInputChange}
                  placeholder="Describe the application or task you want a system prompt for..."
                  className="w-full h-48 bg-slate-900/50 border border-slate-800 rounded-3xl p-6 text-sm placeholder-slate-500 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/50 outline-none transition-all resize-none shadow-inner"
                />
                <div className="absolute bottom-4 right-4 text-[10px] text-slate-600 font-mono">
                  {input.length} characters
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="group relative w-full overflow-hidden rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 p-[1px] font-bold transition-all disabled:opacity-50 disabled:grayscale hover:shadow-lg hover:shadow-blue-500/20 active:scale-[0.98]"
              >
                <div className="flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-[#0a0a0c] transition-all group-hover:bg-transparent px-8">
                  {isLoading ? (
                    <Loader2 className="w-5 h-5 animate-spin text-blue-400 group-hover:text-white" />
                  ) : (
                    <>
                      <span className="text-sm group-hover:text-white text-blue-400 transition-colors">Ignite Spark</span>
                      <Sparkles className="w-4 h-4 text-blue-400 group-hover:text-white transition-colors" />
                    </>
                  )}
                </div>
              </button>
            </form>
          </div>

          {/* Output Display */}
          <div className="lg:col-span-7 h-full">
            <div className="h-full bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-[2rem] p-8 shadow-2xl flex flex-col min-h-[500px] lg:min-h-0">
              <header className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center border border-slate-700">
                    <Cpu className="w-4 h-4 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold">Prompt Workbench</h3>
                    <p className="text-[10px] text-slate-500 uppercase">Output Stream</p>
                  </div>
                </div>

                {completion && (
                  <button
                    onClick={copyToClipboard}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-[10px] hover:bg-slate-700 transition-colors"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
                    {copied ? "Copied" : "Copy Prompt"}
                  </button>
                )}
              </header>

              <div className="flex-1 overflow-auto custom-scrollbar">
                {!completion && !isLoading && (
                  <div className="h-full flex flex-col items-center justify-center text-center px-8 opacity-40">
                    <Sparkles className="w-12 h-12 mb-4 text-slate-700" />
                    <p className="text-sm font-medium">Input your idea to spark a prompt</p>
                    <p className="text-xs text-slate-600 mt-2 max-w-[200px]">The architected system prompt will appear here in real-time.</p>
                  </div>
                )}

                {isLoading && !completion && (
                  <div className="space-y-4">
                    <div className="h-4 w-[60%] bg-slate-800 animate-pulse rounded" />
                    <div className="h-4 w-[80%] bg-slate-800 animate-pulse rounded" />
                    <div className="h-4 w-[40%] bg-slate-800 animate-pulse rounded" />
                  </div>
                )}

                <div className="prose prose-invert prose-sm max-w-none text-slate-300 leading-relaxed">
                  <ReactMarkdown>{completion}</ReactMarkdown>
                </div>
              </div>

              {isLoading && (
                <div className="mt-4 flex items-center gap-2 text-[10px] text-blue-400 font-medium">
                  <div className="flex gap-1">
                    <span className="w-1 h-1 bg-current rounded-full animate-bounce [animation-delay:-0.3s]" />
                    <span className="w-1 h-1 bg-current rounded-full animate-bounce [animation-delay:-0.15s]" />
                    <span className="w-1 h-1 bg-current rounded-full animate-bounce" />
                  </div>
                  Analyzing technical requirements...
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #1e293b;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #334155;
        }
      `}</style>
    </div>
  );
}
