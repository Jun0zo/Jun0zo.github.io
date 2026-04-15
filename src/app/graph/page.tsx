"use client";

/* eslint-disable @typescript-eslint/no-explicit-any, @next/next/no-img-element */

import React, { useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { sitePath } from "@/lib/site-path";
import { graphData } from "@/data/graphData";

const KnowledgeGraph = dynamic(() => import("@/components/KnowledgeGraph"), {
  ssr: false,
  loading: () => <div className="flex h-screen items-center justify-center bg-[#0D1117] text-sm font-bold uppercase tracking-widest text-[#FF6B4A] animate-pulse">Initializing Neural Link...</div>
});

export default function GraphPage() {
  const [selectedNode, setSelectedNode] = useState<any>(null);

  return (
    <main className="h-screen w-screen bg-[#0D1117] text-white overflow-hidden relative flex font-sans">
      
      {/* Top HUD Header */}
      <header className="absolute inset-x-0 top-0 z-40 p-6 pointer-events-none">
        <div className="flex justify-between items-center max-w-full mx-auto">
          <Link href={sitePath("/")} className="pointer-events-auto flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 hover:text-[#FF6B4A] transition-colors bg-white/5 px-5 py-3 rounded-full backdrop-blur-xl border border-white/10 hover:bg-white/10">
            &larr; Return to Standard View
          </Link>
          <div className="flex items-center gap-3 bg-[#FF6B4A]/10 px-5 py-3 rounded-full border border-[#FF6B4A]/20">
            <div className="w-1.5 h-1.5 bg-[#FF6B4A] rounded-full animate-pulse"></div>
            <div className="text-[9px] font-black uppercase tracking-[0.3em] text-[#FF6B4A]">
              Neural Graph Active
            </div>
          </div>
        </div>
      </header>

      {/* Main Graph Area - Removed w-calc transition to prevent canvas resize triggering vis.js layout resets */}
      <div className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${selectedNode ? 'opacity-40' : 'opacity-100'}`}>
        <KnowledgeGraph graphData={graphData} onNodeClick={(node) => setSelectedNode(node)} />
      </div>

      {/* Right Sidebar (Glassmorphism Drawer) */}
      <aside className={`absolute right-0 top-0 h-full w-[480px] bg-[#0D1117]/85 backdrop-blur-3xl border-l border-white/5 p-10 flex flex-col transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] z-50 overflow-y-auto custom-scrollbar ${selectedNode ? 'translate-x-0 shadow-[-30px_0_60px_rgba(0,0,0,0.7)]' : 'translate-x-full'}`}>
        
        {selectedNode && (
          <div className="flex flex-col relative pt-8 pb-10 min-h-full">
            <button 
              onClick={() => setSelectedNode(null)}
              className="absolute -top-2 -right-2 text-gray-500 hover:text-white p-3 rounded-full hover:bg-white/10 transition-all active:scale-95"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>

            {/* Node Category Label */}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: selectedNode.group === 1 ? "#FF6B4A" : selectedNode.group === 2 ? "#3b82f6" : selectedNode.group === 3 ? "#ffffff" : "#8b949e", boxShadow: `0 0 10px ${selectedNode.group === 1 ? "#FF6B4A" : "transparent"}` }}></div>
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">
                {selectedNode.group === 1 ? "System Philosophy" : selectedNode.group === 2 ? "Domain / Track" : selectedNode.group === 3 ? "Core Experience" : "Domain Skill"}
              </span>
            </div>

            {/* Node Title */}
            <h2 className="text-4xl font-black tracking-tighter leading-[1.1] mb-6 italic uppercase">{selectedNode.id}</h2>
            
            {/* Period / Role (if exists) */}
            {(selectedNode.role || selectedNode.period) && (
              <div className="mb-8 p-4 bg-white/5 border border-white/5 rounded-xl space-y-1">
                {selectedNode.role && <p className="text-[#FF6B4A] text-sm font-bold">{selectedNode.role}</p>}
                {selectedNode.period && <p className="text-gray-500 text-xs font-bold tracking-widest uppercase">{selectedNode.period}</p>}
              </div>
            )}

            {/* Overview Image or Logo */}
            {selectedNode.visual && (
              <div className="mb-10 rounded-[32px] overflow-hidden border border-gray-100 dark:border-white/10 p-2 bg-white dark:bg-white/5 shadow-xl">
                <img src={sitePath(selectedNode.visual.src)} alt="Overview" className="w-full h-auto rounded-2xl object-cover" />
              </div>
            )}
            {!selectedNode.visual && selectedNode.logo && (
              <div className="mb-10 w-32 h-32 rounded-[32px] border border-gray-100 dark:border-white/10 p-4 bg-white dark:bg-white/5 shadow-xl flex items-center justify-center">
                <img src={sitePath(selectedNode.logo)} alt="Logo" className="w-full h-full object-contain rounded-xl" />
              </div>
            )}

            <div className="w-12 h-1 bg-white/10 mb-8"></div>

            {/* Description */}
            <p className="text-gray-300 leading-relaxed font-medium text-[15px] mb-8">
              {selectedNode.desc}
            </p>

            {/* Stack Tags */}
            {selectedNode.stack && selectedNode.stack.length > 0 && (
              <div className="mb-8">
                <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 mb-3">Tech & Frameworks</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedNode.stack.map((s: string) => (
                    <span key={s} className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-xs font-semibold text-gray-300">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Outcomes List */}
            {selectedNode.outcomes && selectedNode.outcomes.length > 0 && (
              <div className="mb-10">
                <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 mb-4">Key Outcomes</h4>
                <ul className="space-y-3">
                  {selectedNode.outcomes.map((outcome: string, idx: number) => (
                    <li key={idx} className="flex items-start gap-3">
                      <div className="mt-1.5 w-1.5 h-1.5 shrink-0 rounded-full bg-[#FF6B4A]/50"></div>
                      <p className="text-sm leading-relaxed text-gray-400">{outcome}</p>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Github Button */}
            {selectedNode.github && (
              <div className="mt-auto pt-8">
                <a href={selectedNode.github} target="_blank" rel="noopener noreferrer" className="group flex items-center justify-between px-6 py-5 bg-[#FF6B4A]/10 hover:bg-[#FF6B4A] border border-[#FF6B4A]/20 hover:border-[#FF6B4A] rounded-2xl transition-all duration-300">
                  <span className="font-black text-xs uppercase tracking-widest text-[#FF6B4A] group-hover:text-white transition-colors">View Source Code</span>
                  <svg className="text-[#FF6B4A] group-hover:text-white transition-colors group-hover:translate-x-1" viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"></path><path d="M12 5l7 7-7 7"></path></svg>
                </a>
              </div>
            )}
          </div>
        )}
      </aside>

      {/* Legend Box */}
      <div className={`absolute bottom-8 left-8 p-6 bg-[#161B22]/60 backdrop-blur-xl border border-white/5 rounded-[24px] pointer-events-none transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${selectedNode ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}>
        <div className="space-y-5 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">
          <div className="flex items-center gap-4"><div className="w-2.5 h-2.5 rounded-full shadow-[0_0_12px_#FF6B4A] bg-[#FF6B4A]"></div><span className="mt-0.5">Philosophy</span></div>
          <div className="flex items-center gap-4"><div className="w-2.5 h-2.5 rounded-full shadow-[0_0_12px_#3b82f6] bg-[#3b82f6]"></div><span className="mt-0.5">Domain / Track</span></div>
          <div className="flex items-center gap-4"><div className="w-2.5 h-2.5 rounded-full shadow-[0_0_8px_rgba(255,255,255,0.5)] bg-white"></div><span className="mt-0.5">Experience</span></div>
          <div className="flex items-center gap-4"><div className="w-2.5 h-2.5 rounded-full bg-[#8b949e]"></div><span className="mt-0.5">Skills</span></div>
        </div>
      </div>
    </main>
  );
}
