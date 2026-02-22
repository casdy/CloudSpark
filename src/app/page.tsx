"use client";

import { useChat } from "ai/react";
import { useState, useEffect, useRef } from "react";
import { 
  Send, 
  Plus, 
  MessageSquare, 
  Trash2, 
  Copy, 
  RotateCcw, 
  Settings, 
  ChevronLeft,
  ChevronRight,
  Terminal,
  Cpu,
  ShieldCheck,
  Zap
} from "lucide-react";
import ReactMarkdown from "react-markdown";

// TechLoader Component: A premium "System Boot" experience
function TechLoader({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState("Initializing Kernel...");
  
  const statuses = [
    { p: 10, s: "Initializing Kernel..." },
    { p: 30, s: "Allocating Neural Buffers..." },
    { p: 50, s: "Syncing Distributed Models..." },
    { p: 75, s: "Establishing Secure Tunnel..." },
    { p: 90, s: "Calibrating UI Interface..." },
    { p: 100, s: "System Online." },
  ];

  useEffect(() => {
    let currentStep = 0;
    const interval = setInterval(() => {
      if (currentStep < statuses.length) {
        setProgress(statuses[currentStep].p);
        setStatus(statuses[currentStep].s);
        currentStep++;
      } else {
        clearInterval(interval);
        setTimeout(onComplete, 800);
      }
    }, 600);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 z-[100] bg-[#050505] flex flex-col items-center justify-center overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-indigo-500/10 via-transparent to-transparent animate-pulse" />
      
      <div className="relative w-80 space-y-8">
        {/* Animated Icon */}
        <div className="flex justify-center">
          <div className="relative">
            <div className="absolute inset-0 bg-indigo-500 blur-2xl opacity-20 animate-pulse" />
            <Cpu className="w-16 h-16 text-indigo-500 relative animate-spin-slow" />
          </div>
        </div>

        {/* Status Text */}
        <div className="space-y-4 text-center">
          <h2 className="text-xs font-bold uppercase tracking-[0.4em] text-indigo-400/80 animate-pulse">
            CloudSpark OS v3.0
          </h2>
          <div className="h-4 overflow-hidden">
            <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest animate-in slide-in-from-bottom-2 duration-300">
              {status}
            </p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="relative h-[2px] w-full bg-zinc-900 rounded-full overflow-hidden">
          <div 
            className="absolute inset-y-0 left-0 bg-indigo-500 transition-all duration-500 ease-out shadow-[0_0_10px_rgba(99,102,241,0.5)]"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* System Diagnostics */}
        <div className="grid grid-cols-3 gap-2 opacity-50">
          <div className="flex flex-col items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <span className="text-[8px] font-mono text-zinc-600 uppercase">Secure</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Zap className="w-4 h-4 text-amber-500" />
            <span className="text-[8px] font-mono text-zinc-600 uppercase">Fast</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Terminal className="w-4 h-4 text-indigo-500" />
            <span className="text-[8px] font-mono text-zinc-600 uppercase">Stable</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ChatPage() {
  const [isMounted, setIsMounted] = useState(false);
  const [isLoadingApp, setIsLoadingApp] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [conversations, setConversations] = useState<any[]>([]);
  const [activeConversationId, setActiveConversationId] = useState<string | null>(null);
  const [models, setModels] = useState<any[]>([]);
  const [selectedModelId, setSelectedModelId] = useState("");
  const [domain, setDomain] = useState("General");

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const { messages, input, setInput, handleInputChange, handleSubmit, isLoading, reload, stop, setMessages } = useChat({
    api: "/api/chat",
    body: {
      modelId: selectedModelId,
      conversationId: activeConversationId,
      domain,
    },
    onFinish: () => {
      fetchConversations();
    },
  });

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    fetchModels();
    fetchConversations();
  }, []);

  const fetchModels = async () => {
    const res = await fetch("/api/models");
    const data = await res.json();
    setModels(data);
    if (data.length > 0) setSelectedModelId(data[0].id);
  };

  const fetchConversations = async () => {
    const res = await fetch("/api/conversations");
    const data = await res.json();
    setConversations(data);
  };

  const startNewChat = () => {
    setActiveConversationId(null);
    setMessages([]);
  };

  const loadConversation = async (id: string) => {
    setActiveConversationId(id);
    const res = await fetch(`/api/conversations/${id}`);
    const data = await res.json();
    setMessages(data.messages);
  };

  const deleteConversation = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    await fetch(`/api/conversations/${id}`, { method: "DELETE" });
    if (activeConversationId === id) startNewChat();
    fetchConversations();
  };

  if (!isMounted) return <div className="bg-[#050505] h-screen w-screen" />;

  return (
    <>
      {isLoadingApp && <TechLoader onComplete={() => setIsLoadingApp(false)} />}
      
      <div className="flex h-screen bg-[#0a0a0c] text-zinc-100 font-sans overflow-hidden" suppressHydrationWarning>
        {/* Sidebar */}
        <aside 
          className={`${
            isSidebarOpen ? "w-72" : "w-0"
          } transition-all duration-300 border-r border-zinc-800 bg-[#0d0d0f] flex flex-col overflow-hidden relative shadow-2xl z-20`}
        >
          <div className="p-4 flex flex-col h-full">
            <button 
              onClick={startNewChat}
              className="flex items-center gap-2 w-full p-3 rounded-xl bg-indigo-600/10 hover:bg-indigo-600/20 text-indigo-400 border border-indigo-500/20 transition-all mb-6 group"
            >
              <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform" />
              <span className="font-bold text-sm tracking-wide">New Conversation</span>
            </button>

            <div className="flex-1 overflow-y-auto space-y-2 pr-2 custom-scrollbar">
              <h3 className="px-3 text-[10px] font-bold uppercase tracking-widest text-zinc-600 mb-4">Recent Clusters</h3>
              {conversations.map((conv) => (
                <div 
                  key={conv.id}
                  onClick={() => loadConversation(conv.id)}
                  className={`group flex items-center justify-between p-3 rounded-xl cursor-pointer transition-all ${
                    activeConversationId === conv.id 
                      ? "bg-indigo-600/20 border border-indigo-500/30 text-indigo-100" 
                      : "hover:bg-zinc-800/50 border border-transparent text-zinc-500"
                  }`}
                >
                  <div className="flex items-center gap-3 overflow-hidden">
                    <MessageSquare className={`w-4 h-4 flex-shrink-0 ${activeConversationId === conv.id ? "text-indigo-400" : "text-zinc-600"}`} />
                    <span className="truncate text-xs font-medium tracking-tight">{conv.title}</span>
                  </div>
                  <button 
                    onClick={(e) => deleteConversation(conv.id, e)}
                    className="opacity-0 group-hover:opacity-100 p-1 hover:text-red-400 transition-all"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>

            <div className="mt-auto pt-4 border-t border-zinc-800">
              <div className="flex items-center gap-3 p-3 rounded-xl bg-zinc-900/40 border border-zinc-800/50">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-indigo-700 flex items-center justify-center text-xs font-bold">
                  G
                </div>
                <div className="flex-1 overflow-hidden">
                  <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-tighter">Guest Protocol</p>
                  <p className="text-[10px] text-indigo-500/80 font-mono tracking-widest">SECURE_LINK_ON</p>
                </div>
                <Settings className="w-4 h-4 text-zinc-700 hover:text-zinc-500 cursor-pointer" />
              </div>
            </div>
          </div>
        </aside>

        {/* Sidebar Toggle Area */}
        <div className="absolute bottom-6 left-6 z-50">
           <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2.5 bg-zinc-900 border border-zinc-800 rounded-xl text-zinc-500 hover:text-indigo-400 shadow-2xl hover:bg-zinc-800 transition-all"
          >
            {isSidebarOpen ? <ChevronLeft className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
          </button>
        </div>

        {/* Main Chat Area */}
        <main className="flex-1 flex flex-col relative bg-[#0a0a0c] bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-indigo-500/5 via-transparent to-transparent">
          {/* Header */}
          <header className={`sticky top-0 z-30 p-4 border-b border-zinc-800/40 transition-all duration-300 ${isLoadingApp ? "opacity-0" : "opacity-100"}`}>
            <div className="flex items-center justify-between max-w-6xl mx-auto w-full">
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
                  <h1 className="text-xs font-bold tracking-[0.2em] uppercase text-zinc-400">CloudSpark v3</h1>
                </div>

                <div className="h-4 w-[1px] bg-zinc-800" />
                
                <div className="flex items-center gap-2">
                  <select 
                    value={selectedModelId}
                    onChange={(e) => setSelectedModelId(e.target.value)}
                    className="bg-zinc-900 border border-zinc-800 rounded-lg py-1.5 px-3 text-[10px] font-bold uppercase tracking-widest focus:ring-1 focus:ring-indigo-500/50 outline-none text-zinc-100 hover:border-indigo-500/30 transition-all cursor-pointer shadow-lg appearance-none min-w-[140px]"
                  >
                    {models.length === 0 ? (
                      <option className="bg-zinc-950 text-zinc-500">Syncing...</option>
                    ) : (
                      models.map(m => (
                        <option key={m.id} value={m.id} className="bg-zinc-950 text-zinc-100">
                          {m.provider}: {m.name}
                        </option>
                      ))
                    )}
                  </select>

                  <select 
                    value={domain}
                    onChange={(e) => setDomain(e.target.value)}
                    className="bg-zinc-900 border border-zinc-800 rounded-lg py-1.5 px-3 text-[10px] font-bold uppercase tracking-widest focus:ring-1 focus:ring-indigo-500/50 outline-none text-zinc-100 hover:border-indigo-500/30 transition-all cursor-pointer shadow-lg appearance-none"
                  >
                    <option value="General" className="bg-zinc-950 text-zinc-100">General</option>
                    <option value="Coding" className="bg-zinc-950 text-zinc-100">Coding</option>
                    <option value="Finance" className="bg-zinc-950 text-zinc-100">Finance</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center gap-4 text-xs font-mono text-zinc-600">
                <span className="animate-pulse">●</span>
                <span className="tracking-widest">EST_NULL_AUTH</span>
              </div>
            </div>
          </header>

          {/* Messages Feed */}
          <div 
            ref={scrollRef}
            className="flex-1 overflow-y-auto p-4 space-y-10 max-w-4xl mx-auto w-full pt-16 custom-scrollbar pb-32"
          >
            {messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center space-y-8 opacity-40 py-20 animate-in fade-in zoom-in duration-1000">
                <div className="relative">
                  <div className="absolute inset-0 bg-indigo-500 blur-3xl opacity-20 animate-pulse" />
                  <div className="p-8 rounded-full bg-zinc-900/50 border border-zinc-800 relative">
                    <Terminal className="w-16 h-16 text-indigo-500/40" />
                  </div>
                </div>
                <div className="space-y-3">
                  <h2 className="text-sm font-bold uppercase tracking-[0.3em] text-indigo-400/60">Initialize Stream</h2>
                  <p className="max-w-xs text-xs text-zinc-600 font-medium leading-relaxed">System ready for multi-model neural processing. Enter query cluster below.</p>
                </div>
              </div>
            ) : (
              messages.map((m: any) => (
                <div 
                  key={m.id} 
                  className={`flex gap-6 group animate-in slide-in-from-bottom-4 duration-500 ${m.role === "user" ? "justify-end" : ""}`}
                >
                  {m.role === "assistant" && (
                    <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-indigo-700 flex items-center justify-center flex-shrink-0 shadow-lg shadow-indigo-600/20">
                      <Send className="w-4 h-4 text-white" />
                    </div>
                  )}
                  
                  <div className={`relative max-w-[85%] ${m.role === "user" ? "order-1" : "order-2"}`}>
                    <div className={`p-6 rounded-2xl border transition-all duration-300 ${
                      m.role === "user" 
                        ? "bg-indigo-600 border-indigo-400/50 text-white shadow-xl shadow-indigo-900/20" 
                        : "bg-[#0d0d0f] border-zinc-800 text-zinc-300 group-hover:border-zinc-700 hover:shadow-2xl hover:shadow-black/50"
                    }`}>
                      <div className="prose prose-invert prose-sm max-w-none prose-indigo leading-7 font-medium">
                        <ReactMarkdown>{m.content}</ReactMarkdown>
                      </div>

                      {/* AI Response Metadata */}
                      {m.role === "assistant" && (
                        <div className="mt-4 pt-4 border-t border-zinc-800 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-all">
                          <span className="text-[10px] font-mono text-zinc-600 tracking-tighter uppercase">Cluster: {selectedModelId}</span>
                          <div className="flex items-center gap-1.5">
                            <button 
                              onClick={() => navigator.clipboard.writeText(m.content)}
                              className="p-2 hover:bg-zinc-800 rounded-lg text-zinc-500 hover:text-indigo-400 transition-all"
                            >
                              <Copy className="w-3.5 h-3.5" />
                            </button>
                            <button 
                              onClick={() => reload()}
                              className="p-2 hover:bg-zinc-800 rounded-lg text-zinc-500 hover:text-indigo-400 transition-all"
                            >
                              <RotateCcw className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {m.role === "user" && (
                    <div className="w-9 h-9 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center flex-shrink-0 text-zinc-600 order-2">
                       <div className="w-4 h-4 rounded-full border-2 border-zinc-700" />
                    </div>
                  )}
                </div>
              ))
            )}
            
            {isLoading && (
              <div className="flex gap-4 items-center text-zinc-600 text-[10px] font-bold uppercase tracking-[0.2em] animate-pulse ml-16 bg-zinc-900/30 w-fit py-2 px-4 rounded-full border border-zinc-800/50">
                <div className="flex gap-1">
                  <div className="w-1 h-1 rounded-full bg-indigo-500 animate-bounce [animation-delay:-0.3s]"></div>
                  <div className="w-1 h-1 rounded-full bg-indigo-500 animate-bounce [animation-delay:-0.15s]"></div>
                  <div className="w-1 h-1 rounded-full bg-indigo-500 animate-bounce"></div>
                </div>
                <span>Neural Stream Active</span>
              </div>
            )}
          </div>

          {/* Input Interface */}
          <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-[#0a0a0c] via-[#0a0a0c]/90 to-transparent pt-12">
            <div className="max-w-4xl mx-auto w-full relative group">
              {/* Decorative Glow */}
              <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-3xl blur-xl opacity-0 group-focus-within:opacity-100 transition-all duration-500" />
              
              <form 
                onSubmit={handleSubmit}
                className="relative flex items-end gap-3 bg-[#0d0d0f]/80 backdrop-blur-xl border border-zinc-800/50 focus-within:border-indigo-500/50 p-4 rounded-3xl shadow-3xl transition-all"
              >
                <textarea
                  value={input}
                  onChange={handleInputChange}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleSubmit(e as any);
                    }
                  }}
                  placeholder="Transmit instruction message..."
                  className="flex-1 bg-transparent border-none outline-none py-2 px-3 text-sm min-h-[48px] max-h-48 resize-none text-zinc-200 placeholder:text-zinc-700 font-medium"
                  rows={1}
                />
                
                <div className="flex items-center gap-2 mb-1">
                  {isLoading ? (
                    <button 
                      type="button"
                      onClick={() => stop()}
                      className="p-3 rounded-2xl bg-red-500/10 hover:bg-red-500/20 text-red-500 transition-all border border-red-500/20"
                    >
                      <RotateCcw className="w-5 h-5" />
                    </button>
                  ) : (
                    <button 
                      disabled={!input.trim()}
                      className="p-3 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white transition-all disabled:opacity-20 disabled:hover:bg-indigo-600 shadow-xl shadow-indigo-600/20 active:scale-95 group/btn"
                    >
                      <Zap className="w-5 h-5 group-hover/btn:fill-current" />
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>
        </main>

        <style jsx global>{`
          @keyframes spin-slow {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          .animate-spin-slow {
            animation: spin-slow 12s linear infinite;
          }
          .custom-scrollbar::-webkit-scrollbar {
            width: 4px;
          }
          .custom-scrollbar::-webkit-scrollbar-track {
            background: transparent;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb {
            background: #18181b;
            border-radius: 10px;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb:hover {
            background: #27272a;
          }
        `}</style>
      </div>
    </>
  );
}