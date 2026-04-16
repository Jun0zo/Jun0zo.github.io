"use client";

/* eslint-disable @typescript-eslint/no-explicit-any, react/no-unescaped-entities, @next/next/no-img-element */

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  BookOpen, Sun, Moon, Share2, Bot,
  Trophy, X, ArrowRight, Zap, User, Network,
  Layers, Sparkles, UserCheck, Medal,
  ImageIcon, ExternalLink
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { dict, type Project } from "@/data/portfolio";
import {
  DEFAULT_PORTFOLIO_CONTROLS,
  type PortfolioControls,
  type PortfolioSectionKey,
  getAllItemMedia,
  getContentVisible,
  getItemVisible,
  getItemControl,
  getPortfolioItemId,
  getSectionVisible,
  getVisibleMedia,
  loadPortfolioControls,
  normalizePortfolioControls,
} from "@/data/portfolioControls";
// import ChatBot from "@/components/ChatBot";

// --- Inline Custom Brand Icons ---
const GithubIcon = ({ size = 20, className = "" }: { size?: number, className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" /></svg>
);
const LinkedinIcon = ({ size = 20, className = "" }: { size?: number, className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" /></svg>
);

// --- Pipeline Component ---
const IntelligencePipeline = () => {
  return (
    <div className="relative w-full max-w-lg mx-auto h-[600px] flex flex-col items-center justify-between py-10">
      {/* Central Connector Line */}
      <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-[#FF6B4A]/0 via-[#FF6B4A]/40 to-[#FF6B4A]/0 -translate-x-1/2 z-0" />
      
      {/* Pipeline Stages */}
      {[
        { icon: User, label: "HUMAN", color: "#888888" },
        { icon: Network, label: "CONTEXT", color: "#FF6B4A" },
        { icon: Layers, label: "STRUCTURE", color: "#FF6B4A" },
        { icon: Zap, label: "TRANSFER", color: "#FF6B4A" },
        { icon: Bot, label: "MACHINE", color: "#888888" },
        { icon: Sparkles, label: "AMPLIFIED YOU", color: "#FF6B4A" }
      ].map((stage, i) => (
        <motion.div 
          key={i}
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ margin: "-100px" }}
          transition={{ delay: i * 0.1 }}
          className="relative z-10 flex flex-col items-center group"
        >
          <div className="w-14 h-14 rounded-2xl bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-white/10 group-hover:border-[#FF6B4A] transition-all duration-500 flex items-center justify-center shadow-2xl backdrop-blur-xl">
            <stage.icon size={24} style={{ color: stage.color }} strokeWidth={2.5} />
          </div>
          <span className="absolute -right-32 top-1/2 -translate-y-1/2 text-[9px] font-black tracking-[0.3em] text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity">
            {stage.label}
          </span>
        </motion.div>
      ))}

      {/* Floating Data Particles */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          animate={{ y: [0, 500], opacity: [0, 1, 0] }}
          transition={{ duration: 4, delay: i * 0.5, repeat: Infinity, ease: "linear" }}
          className="absolute left-1/2 w-1.5 h-1.5 bg-[#FF6B4A] rounded-full blur-[2px] -translate-x-1/2 z-0"
        />
      ))}
    </div>
  );
};


function AwardBadges({ items, itemId }: { items: string | string[], itemId: string }) {
  const allStrings = Array.isArray(items) ? items : [items];
  const awardKeywords = ["수상", "Award", "Prize", "Winner", "금상", "은상", "동상", "대상", "우수상", "참모총장상", "센터장상", "국회의원상"];
  
  const awards: string[] = [];
  allStrings.forEach(s => {
    if (!s) return;
    // 1. Try to extract common patterns like "XXX상(YYY)" or "XXX상"
    // This regex looks for proper nouns ending in '상' often followed by (Gold/Silver etc)
    const matches = s.match(/[가-힣\w\s]+상(?:\s*\(.*?\))?/g);
    if (matches) {
      matches.forEach(m => {
        const trimmed = m.trim();
        // Filter out common false positives
        if (trimmed.length > 1 && !["상황", "상태", "이상", "상승", "상세", "수상"].includes(trimmed) && !["상황", "상태", "이상", "상승", "상세"].some(ex => trimmed.includes(m.includes("상 (") ? "NEVER_MATCH" : ex))) {
          awards.push(trimmed);
        }
      });
    } else {
      // 2. Fallback: if keywords exist but regex failed, just use the string if it's short
      if (awardKeywords.some(k => s.includes(k)) && s.length < 30) {
        awards.push(s);
      }
    }
  });

  // Remove duplicates and clean up
  const uniqueAwards = Array.from(new Set(awards)).map(a => a.replace(/을 수상했습니다\.?|를 받았습니다\.?/g, "").trim());

  if (uniqueAwards.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2 mt-4">
      {uniqueAwards.map((award, i) => (
        <div key={`${itemId}-award-${i}`} className="group/tip relative inline-flex items-center gap-2 bg-[#FF6B4A]/10 border border-[#FF6B4A]/20 px-3 py-1.5 rounded-full hover:bg-[#FF6B4A]/20 transition-all cursor-help shadow-sm">
          <Trophy size={14} className="text-[#FF6B4A] animate-pulse" />
          <span className="text-[10px] font-black uppercase tracking-tight text-[#FF6B4A]">{award}</span>
          <div className="absolute left-0 bottom-full mb-3 w-max max-w-[260px] opacity-0 invisible group-hover/tip:opacity-100 group-hover/tip:visible transition-all duration-300 z-50 px-4 py-3 bg-gray-900/95 dark:bg-white/95 text-white dark:text-gray-900 text-[13px] rounded-2xl shadow-xl font-medium border border-white/10 dark:border-black/10 backdrop-blur-md leading-relaxed break-keep pointer-events-none">
            {award} 수상
          </div>
        </div>
      ))}
    </div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return <p className="text-[12px] font-black uppercase tracking-[0.4em] text-[#FF6B4A] opacity-80 mb-12 text-center">{children}</p>;
}

function ProjectVisual({ project, controls }: { project: Project; controls: PortfolioControls }) {
  const itemId = getPortfolioItemId("projects", project);
  if (!getContentVisible(controls, itemId, "cardMedia")) return null;
  const visual = getVisibleMedia(controls, itemId, getAllItemMedia(project))[0];
  if (visual) {
    return (
      <div className="overflow-hidden rounded-3xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 flex items-center justify-center shadow-sm p-2 w-full max-h-[220px] aspect-video lg:aspect-[4/3]">
        <Image src={visual.src} alt={visual.alt} width={800} height={500} className="w-full h-full object-cover object-center rounded-2xl overflow-hidden" />
      </div>
    );
  }
  return null;
}

type DetailItem = {
  type?: string;
  company?: string;
  school?: string;
  title?: string;
  role?: string;
  degree?: string;
  authors?: string;
  period?: string;
  date?: string;
  summary?: string;
  hook?: string;
  stack?: string[];
  outcomes?: string[];
  details?: string[] | string;
  visual?: { src: string; alt: string; caption?: string };
  sidebarMedia?: { src: string; alt: string; caption?: string }[];
  logo?: string;
  evidence?: string[];
  related?: string[];
  links?: { label: string; href: string }[];
  href?: string;
  controlId?: string;
  sectionKey?: PortfolioSectionKey;
};

function DetailList({ title, items, accent = false }: { title: string; items?: string[]; accent?: boolean }) {
  if (!items?.length) return null;
  return (
    <div>
      <h4 className="text-[11px] font-black uppercase tracking-[0.4em] text-gray-400 mb-8">{title}</h4>
      <ul className="space-y-5">
        {items.map((item) => (
          <li key={item} className="flex gap-5 items-start">
            <div className={`mt-2.5 h-2.5 w-2.5 shrink-0 rounded-full ${accent ? "bg-[#FF6B4A] shadow-[0_0_14px_rgba(255,107,74,0.65)]" : "bg-[#FF6B4A]/35"}`} />
            <p className="text-base md:text-lg text-gray-600 dark:text-gray-400 break-keep leading-snug font-medium">{item}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

function DetailSidebar({ selectedItem, controls, onClose }: { selectedItem: DetailItem; controls: PortfolioControls; onClose: () => void }) {
  const itemId = selectedItem.controlId || getPortfolioItemId(selectedItem.sectionKey || "projects", selectedItem);
  const media = getContentVisible(controls, itemId, "sidebarMedia")
    ? getVisibleMedia(controls, itemId, getAllItemMedia(selectedItem))
    : [];
  const proofItems: string[] = [
    ...(selectedItem.outcomes && getContentVisible(controls, itemId, "outcomes") ? selectedItem.outcomes : []),
    ...(selectedItem.details && getContentVisible(controls, itemId, "details") ? (Array.isArray(selectedItem.details) ? selectedItem.details : [selectedItem.details]) : []),
  ];
  const title = selectedItem.company || selectedItem.school || selectedItem.title;
  const role = selectedItem.role || selectedItem.degree || selectedItem.authors;
  const summaryText = selectedItem.summary && getContentVisible(controls, itemId, "summary")
    ? selectedItem.summary
    : selectedItem.hook && getContentVisible(controls, itemId, "hook")
      ? selectedItem.hook
      : "";
  const isPublication = ["Publications", "학술 및 연구 성과", "Publication"].includes(selectedItem.type || "");
  const primaryLinkLabel = ['Publication', 'Publications'].includes(selectedItem.type || "") ? "Read Full Paper" : "Access Repository";
  const primaryLinkJSX = selectedItem.href && getContentVisible(controls, itemId, "primaryLink") ? (
    <div className={isPublication ? "mb-12" : "mt-24"}><a href={selectedItem.href} target="_blank" rel="noreferrer" className="flex items-center justify-between p-8 bg-[#FF6B4A] text-white rounded-[40px] font-black uppercase tracking-widest text-sm hover:scale-[1.02] transition-all shadow-2xl shadow-[#FF6B4A]/40 active:scale-95"><span>{primaryLinkLabel}</span><ArrowRight size={28} /></a></div>
  ) : null;

  return (
    <motion.aside initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "spring", damping: 30, stiffness: 200 }} className="relative w-full md:w-[760px] bg-white dark:bg-[#0D1117] h-full shadow-2xl p-8 md:p-16 overflow-y-auto">
      <button onClick={onClose} className="absolute top-8 right-8 p-4 hover:bg-gray-100 dark:hover:bg-white/5 rounded-full transition-all active:scale-90"><X size={28} /></button>
      <div className="flex items-center gap-4 mb-10"><div className="w-3 h-3 rounded-full bg-[#FF6B4A] shadow-[0_0_20px_#FF6B4A]" /><span className="text-[11px] font-black uppercase tracking-[0.4em] text-gray-500">{selectedItem.type}</span></div>
      <h2 className={`font-black mb-8 leading-[1.1] tracking-tighter uppercase italic ${["Publications", "학술 및 연구 성과", "Publication"].includes(selectedItem.type || "") ? "text-2xl md:text-3xl" : "text-3xl md:text-5xl"}`}>{title}</h2>
      {getContentVisible(controls, itemId, "meta") && <div className="mb-12 p-8 bg-gray-50 dark:bg-white/5 rounded-[40px] border border-gray-100 dark:border-white/5"><p className="text-2xl font-bold text-[#FF6B4A] mb-3">{role}</p><p className="text-xs font-black uppercase tracking-[0.3em] text-gray-400">{selectedItem.period || selectedItem.date}</p></div>}
      {isPublication && primaryLinkJSX}
      
      {media.length > 0 ? (
        <div className="mb-14">
          <div className="mb-5 flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.35em] text-gray-400"><ImageIcon size={14} /> Context Media</div>
          <div className="space-y-5">
            {media.map((item, index) => (
              <figure key={`${item.src}-${index}`} className="overflow-hidden rounded-[32px] border border-gray-100 dark:border-white/10 bg-gray-50 dark:bg-white/5 p-2 shadow-xl">
                <img src={item.src} alt={item.alt} className="w-full max-h-[380px] rounded-[24px] object-contain bg-white/40 dark:bg-black/20" />
                {item.caption && <figcaption className="px-4 py-3 text-[11px] font-bold uppercase tracking-[0.18em] text-gray-400">{item.caption}</figcaption>}
              </figure>
            ))}
          </div>
        </div>
      ) : selectedItem.logo && getContentVisible(controls, itemId, "logo") ? (
        <div className="mb-12 w-32 h-32 rounded-[32px] border border-gray-100 dark:border-white/10 p-4 bg-white dark:bg-white/5 shadow-xl flex items-center justify-center"><img src={selectedItem.logo} alt="Logo" className="w-full h-full object-contain rounded-xl" /></div>
      ) : null}

      <div className="w-24 h-1.5 bg-[#FF6B4A] mb-16 rounded-full" />
      {summaryText && summaryText !== '""' && (
        <p className="text-2xl md:text-3xl text-gray-900 dark:text-white leading-tight font-black mb-16 break-keep italic">"{summaryText}"</p>
      )}
      <div className="space-y-16">
        {selectedItem.stack && getContentVisible(controls, itemId, "stack") && (<div><h4 className="text-[11px] font-black uppercase tracking-[0.4em] text-gray-400 mb-8">System Stack</h4><div className="flex flex-wrap gap-3">{selectedItem.stack.map((s) => <span key={s} className="px-5 py-2.5 bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl text-sm font-bold text-gray-700 dark:text-gray-300">{s}</span>)}</div></div>)}
        <DetailList title="Performance & Proof" items={proofItems} />
        <DetailList title="JunOS Evidence" items={getContentVisible(controls, itemId, "evidence") ? selectedItem.evidence : undefined} accent />
        <DetailList title="Related Nodes" items={getContentVisible(controls, itemId, "related") ? selectedItem.related : undefined} />
        {selectedItem.links?.length && getContentVisible(controls, itemId, "links") ? (
          <div>
            <h4 className="text-[11px] font-black uppercase tracking-[0.4em] text-gray-400 mb-8">External Context</h4>
            <div className="grid gap-3">
              {selectedItem.links.map((link) => (
                <a key={link.href} href={link.href} target="_blank" rel="noreferrer" className="group/link flex items-center justify-between rounded-3xl border border-gray-100 dark:border-white/10 bg-gray-50 dark:bg-white/5 px-6 py-5 text-sm font-black uppercase tracking-[0.16em] text-gray-500 transition-all hover:border-[#FF6B4A]/60 hover:text-[#FF6B4A]">
                  <span>{link.label}</span>
                  <ExternalLink size={16} className="transition-transform group-hover/link:translate-x-1" />
                </a>
              ))}
            </div>
          </div>
        ) : null}
      </div>
      {!isPublication && primaryLinkJSX}
    </motion.aside>
  );
}



export default function Home() {
  const [lang, setLang] = useState<'ko' | 'en'>('ko');
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [activeSection, setActiveSection] = useState<string>('top');
  const [mounted, setMounted] = useState(false);
  const [portfolioControls, setPortfolioControls] = useState<PortfolioControls>(() => normalizePortfolioControls(DEFAULT_PORTFOLIO_CONTROLS));
  
  // 헬퍼 함수: 설정값에 따라 데이터 오버라이드 및 필터링
  const getVisibleItems = (section: any, data: any[]) => {
    if (portfolioControls.sections[section as PortfolioSectionKey] === false) return [];
    
    return data.map(item => {
      const itemId = getPortfolioItemId(section, item);
      const ctrl = getItemControl(portfolioControls, itemId);
      if (!ctrl.visible) return null;

      // 텍스트 오버라이드 적용
      const overriddenItem = { ...item };
      Object.keys(ctrl.overrides || {}).forEach(key => {
        if (ctrl.overrides && ctrl.overrides[key]) overriddenItem[key] = ctrl.overrides[key];
      });

      // 대표 이미지(Primary) 처리
      if (ctrl.primaryMedia) {
        overriddenItem.visual = { src: ctrl.primaryMedia, alt: titleOf(item) };
      }

      return overriddenItem;
    }).filter(Boolean);
  };

  function titleOf(item: any) { return item.title || item.company || item.school || item.venue || "Untitled"; }

  const t = dict[lang];

  useEffect(() => {
    setMounted(true);
    setPortfolioControls(loadPortfolioControls());
    const savedTheme = localStorage.theme || 'dark';
    setTheme(savedTheme);
    document.documentElement.classList.toggle('dark', savedTheme === 'dark');
    const syncPortfolioControls = () => setPortfolioControls(loadPortfolioControls());
    window.addEventListener('storage', syncPortfolioControls);
    window.addEventListener('focus', syncPortfolioControls);
    return () => {
      window.removeEventListener('storage', syncPortfolioControls);
      window.removeEventListener('focus', syncPortfolioControls);
    };
  }, []);

  

  if (!mounted) return null;

  return (
    <main className="font-sans text-gray-900 dark:text-gray-100">
      <div className="min-h-screen bg-white dark:bg-[#0D1117] transition-colors duration-500">
        
        {/* Header */}
        <header className="fixed inset-x-0 top-0 z-50 border-b border-gray-100 dark:border-white/5 bg-white/80 dark:bg-[#0D1117]/80 backdrop-blur-md">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-8">
            <div className="flex items-center gap-10">
              <Link href="#top" className="text-sm font-extrabold uppercase tracking-widest">Junyoung Jo</Link>
              <nav className="hidden lg:flex items-center gap-8 text-[10px] font-black uppercase tracking-widest text-gray-400 dark:text-gray-500">
                <Link href="/graph" className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#FF6B4A]/30 bg-[#FF6B4A]/5 text-[#FF6B4A] hover:bg-[#FF6B4A] hover:text-white transition-all shadow-sm font-bold"><Share2 size={12} strokeWidth={3} /> Knowledge Graph</Link>
                {['philosophy', 'education', 'experience', 'publications'].filter(id => id === 'philosophy' || getSectionVisible(portfolioControls, id as PortfolioSectionKey)).map(id => (
                  <Link key={id} href={`#${id}`} className="transition-colors hover:text-[#FF6B4A] text-gray-500 dark:text-gray-400">{id.toUpperCase()}</Link>
                ))}
              </nav>
            </div>
            <div className="flex items-center gap-3">
              <button onClick={() => setLang(l => l === 'ko' ? 'en' : 'ko')} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-gray-200 dark:border-white/10 text-[10px] font-black uppercase tracking-widest text-gray-500"><span className={lang === 'ko' ? 'text-[#FF6B4A]' : ''}>KO</span> / <span className={lang === 'en' ? 'text-[#FF6B4A]' : ''}>EN</span></button>
              <button onClick={() => { const next = theme === 'dark' ? 'light' : 'dark'; setTheme(next); localStorage.theme = next; document.documentElement.classList.toggle('dark', next === 'dark'); }} className="p-2 rounded-full border border-gray-200 dark:border-white/10 text-gray-500">{theme === 'dark' ? <Sun size={16} strokeWidth={2.5} /> : <Moon size={16} strokeWidth={2.5} />}</button>
            </div>
          </div>
        </header>

        {/* Hero */}
        <section id="top" className="mx-auto max-w-7xl px-6 pt-40 pb-20 md:px-8 lg:pt-48 lg:pb-32">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-16">
            <div className="lg:flex-1">
              <h1 className="text-3xl md:text-6xl font-black tracking-tight leading-[0.9] mb-10 italic uppercase">Turning <span className="text-[#FF6B4A]">Context</span> into <br/> Intelligence.</h1>              <p className="max-w-2xl text-lg md:text-xl text-gray-500 dark:text-gray-400 font-medium break-keep mb-12 leading-relaxed italic">"{t.hero.desc}"</p>
              <div className="flex items-center gap-6">
                <Link href="#experience" className="px-10 py-4 rounded-full bg-[#FF6B4A] font-black uppercase text-xs tracking-widest text-white transition-all hover:scale-105 active:scale-95 shadow-xl shadow-[#FF6B4A]/20">View Experience</Link>
                <div className="flex gap-4">{[{ href: "https://github.com/Jun0zo", icon: GithubIcon, title: "GitHub" }, { href: "https://scholar.google.com/citations?user=_26OqXcAAAAJ&hl=ko", icon: (props: any) => (<BookOpen {...props} />), title: "Google Scholar" }, { href: "https://www.linkedin.com/in/jun0zo", icon: LinkedinIcon, title: "LinkedIn" }, { href: "https://joon0zo.tistory.com", icon: BookOpen, title: "Tistory" }].map((btn, i) => (<a key={i} href={btn.href} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-[#FF6B4A] transition-all active:scale-95" title={btn.title}><btn.icon size={22} /></a>))}</div>
              </div>
            </div>
            <div className="hidden lg:flex lg:flex-1 justify-center">
              <div className="relative w-full max-w-[550px] aspect-square object-cover">
                {/* Image with enhanced circular misty mask */}
                <div 
                  className="relative w-full h-full"
                  style={{
                    WebkitMaskImage: 'radial-gradient(circle at 50% 45%, black 20%, rgba(0,0,0,0.5) 45%, transparent 75%)',
                    maskImage: 'radial-gradient(circle at 50% 45%, black 20%, rgba(0,0,0,0.5) 45%, transparent 75%)'
                  }}
                >
                  <Image 
                    src="/media/hero_me.jpeg" 
                    alt="Junyoung Jo" 
                    fill 
                    className="object-cover object-center scale-125"
                    priority
                  />
                </div>
                
                {/* Enhanced soft glow that follows the circle */}
                <div className="absolute inset-0 bg-gradient-to-b from-[#FF6B4A]/20 to-transparent blur-[100px] rounded-full -z-10 opacity-40" />
              </div>
            </div>          </div>
        </section>

        {/* --- RE-ARCHITECTED PHILOSOPHY: The Intelligence Pipeline --- */}
        <section id="philosophy" className="border-t border-gray-100 dark:border-white/5 bg-gray-50 dark:bg-[#0D1117] py-40 transition-colors duration-500">
          <div className="mx-auto max-w-7xl px-6 md:px-8">
            <div className="text-center mb-32">
              <SectionLabel>My Research Approach</SectionLabel>
              <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter italic">The Intelligence <span className="text-[#FF6B4A]">Pipeline.</span></h2>
            </div>

            <div className="flex flex-col lg:flex-row items-start gap-20">
              {/* Left Column: Visual Pipeline */}
              <div className="lg:w-1/2 sticky top-40 hidden lg:block">
                <IntelligencePipeline />
              </div>

              {/* Right Column: Philosophical Objects */}
              <div className="lg:w-1/2 space-y-32 pb-40">
                {t.philosophyData.map((item: any, idx: number) => {
                  const itemId = getPortfolioItemId("philosophy" as any, { slug: item.id });
                  const ctrl = getItemControl(portfolioControls, itemId);
                  if (!ctrl.visible) return null;
                  const overriddenItem = { ...item };
                  if (ctrl.overrides) {
                    if (ctrl.overrides.title) overriddenItem.title = ctrl.overrides.title;
                    if (ctrl.overrides.summary) overriddenItem.description = ctrl.overrides.summary;
                    if (ctrl.overrides.role) overriddenItem.label = ctrl.overrides.role;
                  }
                  const allMedia = [...(item.images || []).map((src: string) => ({src})), ...(ctrl.uploadedMedia || [])].filter((m, i, self) => i === self.findIndex(t => t.src === m.src));
                  const visibleMedia = allMedia.filter(m => !ctrl.hiddenMedia.includes(m.src)).map(m => m.src);

                  return (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8 }}
                    className="relative pl-12 border-l-2 border-white/5 hover:border-[#FF6B4A] transition-colors"
                  >
                    <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-gray-900 border-2 border-[#FF6B4A] shadow-[0_0_10px_#FF6B4A]" />
                    <span className="text-[10px] font-black tracking-[0.4em] text-[#FF6B4A] mb-4 block">{overriddenItem.label}</span>
                    {visibleMedia && visibleMedia.length > 0 && (
                      <div className={`mb-10 grid gap-3 ${
                        visibleMedia.length === 1 ? "grid-cols-1" : 
                        visibleMedia.length === 2 ? "grid-cols-2" : "grid-cols-3"
                      }`}>
                        {visibleMedia.map((img: string, i: number) => (
                          <div key={i} className="overflow-hidden rounded-[24px] md:rounded-[32px] border border-gray-100 dark:border-white/5 bg-gray-50 dark:bg-white/5 p-1 shadow-sm aspect-square md:aspect-video flex items-center justify-center">
                            {img ? (
                              <img src={img} alt={`${overriddenItem.title}-${i}`} className="w-full h-full object-cover rounded-[18px] md:rounded-[26px] opacity-80 group-hover:opacity-100 transition-opacity duration-700" />
                            ) : (
                              <div className="w-full h-full bg-gray-200/50 dark:bg-white/5 animate-pulse rounded-[18px] md:rounded-[26px]" />
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                    <h3 className="text-3xl md:text-4xl font-black uppercase italic mb-8 break-keep">{overriddenItem.id}</h3>
                    {overriddenItem.description && (
                      <p className="text-lg text-gray-500 dark:text-gray-400 leading-relaxed break-keep font-medium italic">
                        "{overriddenItem.description}"
                      </p>
                    )}
                    {overriddenItem.projects && (
                      <div className="flex flex-wrap gap-2 mt-8">
                        {item.projects.map((p: string, i: number) => (
                          <span key={i} className="px-3 py-1.5 bg-gray-200/50 dark:bg-white/10 border border-gray-300/50 dark:border-white/5 rounded-xl text-[10px] font-black uppercase text-gray-600 dark:text-gray-400 tracking-wider">
                            {p}
                          </span>
                        ))}
                      </div>
                    )}
                  </motion.div>
                  );
                })}
              </div>
            </div>

          </div>
        </section>

        {/* Resume Content Sections */}
        {[
          { id: 'education' as PortfolioSectionKey, data: getVisibleItems("education", t.educationData), label: 'Education', bg: 'bg-white dark:bg-[#161B22]' },
          { id: 'experience' as PortfolioSectionKey, data: getVisibleItems("experience", t.experienceData), label: 'Experience', bg: 'bg-gray-50/50 dark:bg-[#0D1117]' },
          { id: 'publications' as PortfolioSectionKey, data: getVisibleItems("publications", t.publicationData), label: 'Publications', bg: 'bg-white dark:bg-[#161B22]' }
        ].filter(section => getSectionVisible(portfolioControls, section.id)).map(section => {
          const visibleData = section.data.filter((item: any) => getItemVisible(portfolioControls, getPortfolioItemId(section.id, item)));
          if (!visibleData.length) return null;
          return (
            <section key={section.id} id={section.id} className={`border-t border-gray-100 dark:border-white/5 ${section.bg} py-32`}>
              <div className="mx-auto max-w-5xl px-6 md:px-8">
                <SectionLabel>{section.label}</SectionLabel>
                <div className="grid gap-16 group/list">
                  {visibleData.map((item: any, idx: number) => {
                    const itemId = getPortfolioItemId(section.id, item);
                    const lines = [
                      ...(item.details && getContentVisible(portfolioControls, itemId, "details") && Array.isArray(item.details) ? item.details : []),
                      ...(item.outcomes && getContentVisible(portfolioControls, itemId, "outcomes") ? item.outcomes : []),
                    ];
                      const isSummaryVisible = section.id !== "experience" && item.summary && getContentVisible(portfolioControls, itemId, "summary");
                      const isOutcomesVisible = lines.length > 0 && getContentVisible(portfolioControls, itemId, "outcomes");
                      const isDetailsVisible = item.details && getContentVisible(portfolioControls, itemId, "details");
                      const hasRightContent = isSummaryVisible || isOutcomesVisible || isDetailsVisible;
                      const isPublication = section.id === "publications";
                    return (
                      <article key={itemId || idx} onClick={() => setSelectedItem({...item, type: section.label, sectionKey: section.id, controlId: itemId})} className="group/item flex flex-col md:flex-row gap-6 md:gap-10 p-8 -mx-8 rounded-[40px] hover:bg-gray-200/60 dark:hover:bg-white/10 transition-all duration-500 shadow-sm relative z-10 cursor-pointer overflow-hidden">

                          {/* Subtle Arrow Hint */}
                          <div className="absolute hidden md:flex top-8 right-8 text-gray-300 dark:text-gray-700 opacity-0 -translate-x-2 group-hover/item:opacity-100 group-hover/item:translate-x-0 group-hover/item:text-[#FF6B4A] transition-all duration-300">
                            <ArrowRight size={24} />
                          </div>

                        <div className="h-16 w-16 md:h-24 md:w-24 shrink-0 rounded-2xl bg-white dark:bg-[#0D1117] border border-gray-100 dark:border-white/10 flex items-center justify-center p-2 md:p-3 shadow-sm">
                          {item.logo && getContentVisible(portfolioControls, itemId, "logo") ? <img src={item.logo} alt="logo" className="w-full h-full object-contain rounded-lg" /> : <span className="text-xl font-black text-gray-300">{(item.school || item.company || item.venue || item.title).charAt(0)}</span>}
                        </div>
                        <div className={`flex-1 grid gap-10 ${isPublication ? "lg:grid-cols-[1.5fr_3fr] md:grid-cols-[1fr_2fr]" : hasRightContent ? "md:grid-cols-[1.2fr_2fr]" : "grid-cols-1"}`}>
                          <div>
                            <div className="relative inline-block mb-2">
                                <h3 className={`font-bold break-keep relative z-10 ${section.id === "publications" ? "text-lg leading-snug" : "text-xl"}`}>{item.school || item.company || item.title}</h3>
                                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#FF6B4A] transition-all duration-500 group-hover/item:w-full" />
                              </div>
                            {getContentVisible(portfolioControls, itemId, "meta") && <div className="space-y-1"><p className="text-sm font-bold text-[#FF6B4A]">{item.degree || item.role || item.authors}</p><p className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest">{item.period || item.date}</p></div>}
                            {item.venue && getContentVisible(portfolioControls, itemId, "meta") && <p className="mt-4 text-xs font-black text-gray-400 italic uppercase tracking-wider">{item.venue}</p>}
                              
                              {/* Inject text content here for publications to save space */}
                              {section.id === "publications" && getContentVisible(portfolioControls, itemId, "details") && <AwardBadges items={item.details} itemId={itemId} />}
                          </div>
                          
                          {/* Text Content Area */}
                          <div className={`relative flex items-center w-full ${isPublication || !hasRightContent ? "hidden" : ""}`}>

                            {/* Text Content */}
                            <div className="space-y-6 ">
                              {section.id !== "experience" && item.summary && getContentVisible(portfolioControls, itemId, "summary") && <p className="text-base leading-relaxed break-keep font-medium text-gray-500">{item.summary}</p>}
                              {lines.length > 0 && <ul className="space-y-3">
                                {lines.map((line: string, i: number) => (
                                  <li key={i} className="flex gap-4 text-sm font-medium"><div className="mt-2 w-1.5 h-1.5 shrink-0 rounded-full bg-[#FF6B4A]/40" />{line}</li>
                                ))}
                              </ul>}
                              {getContentVisible(portfolioControls, itemId, "details") && <AwardBadges items={[...(Array.isArray(item.details) ? item.details : item.details ? [item.details] : []), ...(item.outcomes || [])]} itemId={itemId} />}
                            </div>
                          </div>

                              {/* Publications Images (Optional) */}
                              {section.id === "publications" && (() => {
                                const visiblePubMedia = getVisibleMedia(portfolioControls, itemId, item.sidebarMedia || []);
                                if (visiblePubMedia.length === 0) return null;

                                return (
                                  <div className={`hidden lg:grid gap-4 w-full h-[180px] items-center ${
                                    visiblePubMedia.length === 1 ? "grid-cols-1" : 
                                    visiblePubMedia.length === 2 ? "grid-cols-2" : "grid-cols-3"
                                  }`}>
                                    {visiblePubMedia.slice(0, 3).map((m, i) => (
                                      <div key={i} className="w-full h-full relative rounded-3xl overflow-hidden shadow-sm border border-black/5 dark:border-white/5">
                                        <img src={m.src} alt={m.alt} className="w-full h-full object-cover group-hover/item:scale-105 transition-transform duration-500" />
                                      </div>
                                    ))}
                                  </div>
                                );
                              })()}
                          </div>
                        </article>
                      );
                    })}
                  </div>
                </div>
              </section>
            );
          })}

          {/* Contact Section */}
        <section id="contact" className="bg-gray-900 text-white py-40 text-center">
          <div className="mx-auto max-w-3xl px-6">
            
            
            <a href="mailto:joon0zo1022@gmail.com" className="text-3xl font-black text-[#FF6B4A] hover:text-white transition-all underline underline-offset-[12px] decoration-white/10 hover:decoration-[#FF6B4A]/50">joon0zo1022@gmail.com</a>
          </div>
        </section>

        {/* Detail Sidebar */}
        <AnimatePresence>
          {selectedItem && (
            <div className="fixed inset-0 z-[100] flex justify-end">
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedItem(null)} className="absolute inset-0 bg-black/80 backdrop-blur-xl" />
              <DetailSidebar selectedItem={selectedItem} controls={portfolioControls} onClose={() => setSelectedItem(null)} />
            </div>
          )}
        </AnimatePresence>
      </div>
      {/* <ChatBot /> */}
    </main>
  );
}