"use client";

/* eslint-disable @next/next/no-img-element */

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Check, Copy, Eye, EyeOff, ImageIcon, RotateCcw, Save, SlidersHorizontal, Plus, Star, Trash2, RefreshCw, FolderSearch, Database, HelpCircle, Upload, X } from "lucide-react";
import { dict, type SidebarMedia } from "@/data/portfolio";
import {
  CONTENT_CONTROL_LABELS,
  DEFAULT_CONTENT_VISIBILITY,
  DEFAULT_PORTFOLIO_CONTROLS,
  type PortfolioContentKey,
  type PortfolioControls,
  type PortfolioSectionKey,
  getAllItemMedia,
  getItemControl,
  getPortfolioItemId,
  loadPortfolioControls,
  normalizePortfolioControls,
  savePortfolioControls,
} from "@/data/portfolioControls";

type RawPortfolioItem = {
  slug?: string;
  title?: string;
  company?: string;
  school?: string;
  venue?: string;
  role?: string;
  degree?: string;
  authors?: string;
  period?: string;
  date?: string;
  summary?: string;
  hook?: string;
  details?: string | string[];
  outcomes?: string[];
  visual?: SidebarMedia;
  sidebarMedia?: SidebarMedia[];
  origin?: string;
  logo?: string;
};

const FIELD_DESCRIPTIONS: Record<PortfolioContentKey, string> = {
  title: "항목의 메인 제목 (회사명, 학교명, 논문 제목 등)",
  logo: "기관/프로젝트의 공식 로고 (이미지 파일)",
  meta: "역할, 학위, 기간 등 상단에 표시되는 부가 정보",
  summary: "리스트 카드와 상세 페이지 상단에 들어가는 핵심 요약",
  hook: "관람자의 시선을 시선을 끄는 '한 줄 메시지' (인용구 스타일)",
  details: "경력이나 학력의 상세 활동 내역 (불렛 포인트)",
  outcomes: "프로젝트를 통해 달성한 구체적인 성과 및 지표",
  stack: "사용된 주요 기술 스택 배지 (Python, React 등)",
  evidence: "JunOS 내부의 문서나 근거 자료로 연결되는 링크",
  links: "GitHub, 논문, 웹사이트 등 외부 서비스 링크",
  related: "관련된 다른 프로젝트나 연구 노드 연동",
  primaryLink: "가장 강조하고 싶은 핵심 링크 버튼",
  cardMedia: "리스트 카드에 노출되는 대표 이미지",
  sidebarMedia: "상세 페이지 사이드바에 들어가는 미디어 리스트"
};

const EditableText = ({ id, value, onChange, className, placeholder }: { id: string, value: string, onChange: (key: string, value: string) => void, className: string, placeholder?: string }) => (
  <textarea
    value={value}
    onChange={(e) => onChange(id, e.target.value)}
    className={`bg-transparent border-none outline-none resize-none w-full p-0 focus:ring-2 ring-[#FF6B4A]/20 rounded-lg transition-all ${className}`}
    placeholder={placeholder}
    rows={1}
    onFocus={(e) => {
      e.target.style.height = "auto";
      e.target.style.height = e.target.scrollHeight + "px";
    }}
    onInput={(e) => {
      const target = e.target as HTMLTextAreaElement;
      target.style.height = "auto";
      target.style.height = target.scrollHeight + "px";
    }}
  />
);

const EditableList = ({ id, items, onChange, bulletClass }: { id: string, items: string[], onChange: (key: string, value: string[]) => void, bulletClass?: string }) => {
  const handleItemChange = (idx: number, val: string) => {
    const newItems = [...items];
    newItems[idx] = val;
    onChange(id, newItems);
  };

  const addItem = (idx: number) => {
    const newItems = [...items];
    newItems.splice(idx + 1, 0, "");
    onChange(id, newItems);
    setTimeout(() => {
      const textareas = document.querySelectorAll(`textarea[data-list-id="${id}"]`);
      (textareas[idx + 1] as HTMLTextAreaElement)?.focus();
    }, 0);
  };

  const removeItem = (idx: number) => {
    if (items.length <= 1) {
      onChange(id, []);
      return;
    }
    const newItems = items.filter((_, i) => i !== idx);
    onChange(id, newItems);
  };

  return (
    <div className="space-y-3 w-full">
      {items.map((item, idx) => (
        <div key={idx} className="flex gap-4 items-start group/li relative">
          <div className={`mt-2 w-1.5 h-1.5 shrink-0 rounded-full bg-[#FF6B4A]/40 ${bulletClass}`} />
          <textarea
            data-list-id={id}
            value={item}
            onChange={(e) => handleItemChange(idx, e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addItem(idx);
              } else if (e.key === "Backspace" && !item && items.length > 1) {
                e.preventDefault();
                removeItem(idx);
                setTimeout(() => {
                  const textareas = document.querySelectorAll(`textarea[data-list-id="${id}"]`);
                  (textareas[idx - 1] as HTMLTextAreaElement)?.focus();
                }, 0);
              }
            }}
            className="bg-transparent border-none outline-none resize-none w-full p-0 text-sm font-medium text-gray-600 dark:text-gray-400 focus:ring-2 ring-[#FF6B4A]/20 rounded-lg transition-all"
            placeholder="Type and press Enter for new bullet..."
            rows={1}
            onFocus={(e) => {
              e.target.style.height = "auto";
              e.target.style.height = e.target.scrollHeight + "px";
            }}
            onInput={(e) => {
              const target = e.target as HTMLTextAreaElement;
              target.style.height = "auto";
              target.style.height = target.scrollHeight + "px";
            }}
          />
          <button onClick={() => removeItem(idx)} className="opacity-0 group-hover/li:opacity-100 p-1 text-gray-300 hover:text-red-500 transition-all"><Trash2 size={12} /></button>
        </div>
      ))}
      <button onClick={() => addItem(items.length - 1)} className="text-[9px] font-black uppercase tracking-widest text-[#FF6B4A]/40 hover:text-[#FF6B4A] transition-colors ml-6 flex items-center gap-1"><Plus size={10} strokeWidth={4} /> Add Line</button>
    </div>
  );
};

function PreviewItem({ item, control, onUpdate, discoveredMedia = [] }: { item: any; control: any; onUpdate: (itemId: string, updater: (prev: any) => any) => void, discoveredMedia?: {src: string, origin: string}[] }) {
  const overridden = { title: item.title, ...item.rawItem };
  Object.entries(control.overrides || {}).forEach(([k, v]) => {
    if (v) overridden[k] = v;
  });

  const title = overridden.title || overridden.company || overridden.school || overridden.venue || "Untitled";
  const role = overridden.role || overridden.degree || overridden.authors;
  const period = overridden.period || overridden.date;
  const summary = (control.content.summary && overridden.summary) || (control.content.hook && overridden.hook) || "";
  
  const allMedia = [
    ...getAllItemMedia(overridden),
    ...(control.uploadedMedia || []),
    ...discoveredMedia
  ].filter((m, i, self) => i === self.findIndex(t => t.src === m.src));

  const visibleMedia = allMedia.filter(m => !control.hiddenMedia.includes(m.src));
  const primaryMedia = control.primaryMedia || (visibleMedia[0]?.src);

  const handleTextChange = (key: string, value: string | string[]) => {
    onUpdate(item.id, (prev: any) => ({
      ...prev,
      overrides: { ...(prev.overrides || {}), [key]: value }
    }));
  };

  const toggleVisibility = (key: string) => {
    onUpdate(item.id, (prev: any) => ({
      ...prev,
      content: { ...prev.content, [key]: !prev.content[key] }
    }));
  };

  const VisibilityToggle = ({ id }: { id: string }) => (
    <button 
      onClick={(e) => { e.stopPropagation(); toggleVisibility(id); }}
      className={`absolute -top-3 -right-3 p-2 rounded-full shadow-lg z-10 transition-all ${control.content[id] ? "bg-[#FF6B4A] text-white" : "bg-gray-200 text-gray-400 opacity-50 hover:opacity-100"}`}
    >
      {control.content[id] ? <Eye size={12} /> : <EyeOff size={12} />}
    </button>
  );

  return (
    <div className="flex flex-col gap-20">
      {/* Overview Card Simulation */}
      <div className="space-y-8">
        <h4 className="text-[10px] font-black uppercase tracking-[0.3em] opacity-40 text-center text-[#F4EFE7]">Home Page Card Simulation</h4>
        <div className="mx-auto max-w-5xl w-full">
          <div className="group/item flex flex-col md:flex-row gap-6 md:gap-10 p-8 rounded-[40px] bg-white dark:bg-[#161B22] border border-gray-100 dark:border-white/5 shadow-2xl transition-all duration-500">
            <div className="relative w-16 h-16 shrink-0">
              <VisibilityToggle id="logo" />
              <label className="cursor-pointer block w-full h-full rounded-2xl bg-white dark:bg-[#0D1117] border border-gray-100 dark:border-white/10 flex items-center justify-center p-2 shadow-sm hover:border-[#FF6B4A] transition-all overflow-hidden">
                {overridden.logo && control.content.logo ? <img src={overridden.logo} alt="logo" className="w-full h-full object-contain rounded-lg" /> : <span className="text-xl font-black text-gray-300">{(title).charAt(0)}</span>}
                <input type="file" className="hidden" accept="image/*" onChange={async (e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const formData = new FormData();
                      formData.append("file", file);
                      try {
                        const res = await fetch("/api/upload-media", { method: "POST", body: formData });
                        const data = await res.json();
                        if (data.success) {
                          handleTextChange("logo", data.url);
                        }
                      } catch (err) {
                        console.error("Upload failed", err);
                      }
                    }
                  }} />
              </label>
            </div>
            <div className="flex-1 grid md:grid-cols-[1.2fr_2fr] gap-10">
              <div className="relative">
                <VisibilityToggle id="meta" />
                <EditableText id="title" value={title} onChange={handleTextChange} className="text-xl font-bold break-keep mb-2 text-gray-900 dark:text-white" />
                {control.content.meta && (
                  <div className="space-y-1">
                    <EditableText id="role" value={role} onChange={handleTextChange} className="text-sm font-bold text-[#FF6B4A]" />
                    <EditableText id="period" value={period} onChange={handleTextChange} className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest" />
                  </div>
                )}
              </div>
              <div className="space-y-6 relative">
                <VisibilityToggle id="summary" />
                {control.content.summary && (
                  <EditableText id="summary" value={overridden.summary || ""} onChange={handleTextChange} className="text-base leading-relaxed break-keep font-medium text-gray-500 dark:text-gray-400" placeholder="Enter summary..." />
                )}
                
                {control.content.details && !Array.isArray(overridden.details) && (
                  <div className="relative">
                    <VisibilityToggle id="details" />
                    <EditableText id="details" value={overridden.details || ""} onChange={handleTextChange} className="text-sm text-gray-500 dark:text-gray-400 font-medium" />
                  </div>
                )}

                <div className="space-y-3 relative">
                  {( (control.content.details && Array.isArray(overridden.details)) || control.content.outcomes) && (
                    <div className="flex-1 space-y-4">
                      {control.content.details && Array.isArray(overridden.details) && (
                        <div className="relative group/details">
                          <VisibilityToggle id="details" />
                          <EditableList id="details" items={overridden.details} onChange={handleTextChange} />
                        </div>
                      )}
                      {control.content.outcomes && (
                        <div className="relative group/outcomes">
                          <VisibilityToggle id="outcomes" />
                          <EditableList id="outcomes" items={overridden.outcomes || []} onChange={handleTextChange} />
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sidebar Simulation */}
      <div className="space-y-8">
        <h4 className="text-[10px] font-black uppercase tracking-[0.3em] opacity-40 text-center text-[#F4EFE7]">Sidebar Detail Simulation</h4>
        <div className="mx-auto w-full md:w-[760px] bg-white dark:bg-[#0D1117] rounded-[48px] shadow-2xl p-8 md:p-16 border border-white/5 relative group/sidebar">
          <div className="flex items-center gap-4 mb-10"><div className="w-3 h-3 rounded-full bg-[#FF6B4A] shadow-[0_0_20px_#FF6B4A]" /><span className="text-[11px] font-black uppercase tracking-[0.4em] text-gray-500">{overridden.type || "NODE"}</span></div>
          <div className="relative mb-8">
            <EditableText id="title" value={title} onChange={handleTextChange} className="text-2xl md:text-4xl font-black leading-[1.1] tracking-tighter uppercase italic text-gray-900 dark:text-white" />
          </div>
          
          <div className="relative mb-12">
            <VisibilityToggle id="meta" />
            {control.content.meta && (
              <div className="p-8 bg-gray-50 dark:bg-white/5 rounded-[40px] border border-gray-100 dark:border-white/5">
                <EditableText id="role" value={role} onChange={handleTextChange} className="text-2xl font-bold text-[#FF6B4A] mb-3" />
                <EditableText id="period" value={period} onChange={handleTextChange} className="text-xs font-black uppercase tracking-[0.3em] text-gray-400" />
              </div>
            )}
          </div>
          
          <div className="relative mb-14">
            <VisibilityToggle id="sidebarMedia" />
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.35em] text-gray-400"><ImageIcon size={14} /> Context Media</div>
              <label className="cursor-pointer flex items-center gap-2 bg-[#FF6B4A] text-white px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-all shadow-lg shadow-[#FF6B4A]/20">
                <Plus size={14} strokeWidth={3} /> Add Media
                <input type="file" className="hidden" multiple onChange={async (e) => {
                    const files = Array.from(e.target.files || []);
                    for (const file of files) {
                      const formData = new FormData();
                      formData.append("file", file);
                      try {
                        const res = await fetch("/api/upload-media", { method: "POST", body: formData });
                        const data = await res.json();
                        if (data.success) {
                          onUpdate(item.id, i => ({ ...i, uploadedMedia: [...(i.uploadedMedia || []), { src: data.url, alt: file.name, caption: file.name }] }));
                        }
                      } catch (err) {
                        console.error("Upload failed", err);
                      }
                    }
                  }} />
              </label>
            </div>

            {control.content.sidebarMedia && allMedia.length > 0 ? (
              <div className="space-y-6">
                {allMedia.map((m, index) => {
                  const isHidden = control.hiddenMedia.includes(m.src);
                  const isUploaded = (control.uploadedMedia || []).some((um: any) => um.src === m.src);
                    if (isHidden) return null;
                    return (
                      <figure key={index} className="relative overflow-hidden rounded-[32px] border border-gray-100 dark:border-white/10 bg-gray-50 dark:bg-white/5 shadow-xl p-2 transition-all group/img">
                        <div className="absolute top-4 right-4 flex gap-2 z-30 opacity-0 group-hover/img:opacity-100 transition-opacity">
                          <button 
                            onClick={async (e) => {
                              e.preventDefault();
                              if (isUploaded) {
                                try {
                                  await fetch("/api/delete-media", {
                                    method: "POST",
                                    headers: { "Content-Type": "application/json" },
                                    body: JSON.stringify({ filename: m.src })
                                  });
                                } catch (err) {
                                  console.error("Failed to delete", err);
                                }
                                onUpdate(item.id, i => ({
                                  ...i,
                                  uploadedMedia: (i.uploadedMedia || []).filter((um: any) => um.src !== m.src),
                                  hiddenMedia: i.hiddenMedia.filter((h: string) => h !== m.src)
                                }));
                              } else {
                                onUpdate(item.id, i => ({
                                  ...i,
                                  hiddenMedia: [...(i.hiddenMedia || []), m.src]
                                }));
                              }
                            }} 
                            className="p-2 bg-red-500 text-white rounded-full shadow-xl hover:bg-red-600 transition-colors"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                        <img src={m.src} alt="media" className="w-full max-h-[380px] rounded-[24px] object-contain bg-white/40 dark:bg-black/20" />
                      </figure>
                    );
                })}
              </div>
            ) : overridden.logo && control.content.logo ? (
              <div className="w-32 h-32 rounded-[32px] border border-gray-100 dark:border-white/10 p-4 bg-white dark:bg-white/5 shadow-xl flex items-center justify-center"><img src={overridden.logo} alt="Logo" className="w-full h-full object-contain rounded-xl" /></div>
            ) : (
              <div className="w-full h-32 border-2 border-dashed border-black/10 rounded-[32px] flex items-center justify-center text-[10px] font-black uppercase text-black/20 tracking-widest">No Media Found</div>
            )}
          </div>

          <div className="relative mb-16">
            <VisibilityToggle id="hook" />
            {summary && <EditableText id="hook" value={summary} onChange={handleTextChange} className="text-2xl md:text-3xl text-gray-900 dark:text-white leading-tight font-black break-keep italic" placeholder="Enter hook text..." />}
          </div>
          
          <div className="space-y-16">
            <div className="relative">
              <VisibilityToggle id="stack" />
              {overridden.stack && control.content.stack && (<div><h4 className="text-[11px] font-black uppercase tracking-[0.4em] text-gray-400 mb-8">System Stack</h4><div className="flex flex-wrap gap-3">{overridden.stack.map((s: string) => <span key={s} className="px-5 py-2.5 bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl text-sm font-bold text-gray-700 dark:text-gray-300">{s}</span>)}</div></div>)}
            </div>
            
            <div className="relative">
              <VisibilityToggle id="outcomes" />
              <VisibilityToggle id="details" />
              <div>
                <h4 className="text-[11px] font-black uppercase tracking-[0.4em] text-gray-400 mb-8">Performance & Proof</h4>
                <div className="space-y-6">
                  {control.content.details && Array.isArray(overridden.details) && (
                    <EditableList id="details" items={overridden.details} onChange={handleTextChange} bulletClass="bg-[#FF6B4A]/40" />
                  )}
                  {control.content.outcomes && (
                    <EditableList id="outcomes" items={overridden.outcomes || []} onChange={handleTextChange} bulletClass="bg-[#FF6B4A] shadow-[0_0_10px_#FF6B4A]" />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const SECTION_META: Record<PortfolioSectionKey, { label: string; description: string }> = {
  education: { label: "Education", description: "학업 및 방문연구" },
  experience: { label: "Experience", description: "실무 경력 및 역할" },
  publications: { label: "Publications", description: "논문 성과" },
  projects: { label: "Projects", description: "프로젝트 및 상세 기술" },
  philosophy: { label: "Philosophy", description: "연구 철학 및 이미지 교체" },
};

const CONTENT_KEYS: PortfolioContentKey[] = Object.keys(DEFAULT_CONTENT_VISIBILITY) as PortfolioContentKey[];

const titleOf = (item: RawPortfolioItem) => item.title || item.company || item.school || item.venue || "Untitled";
const eyebrowOf = (item: RawPortfolioItem) => [item.role || item.degree || item.authors || item.venue, item.period || item.date].filter(Boolean).join(" · ");
const summaryOf = (item: RawPortfolioItem) => item.summary || item.hook || (Array.isArray(item.details) ? item.details.join(" ") : item.details) || item.outcomes?.join(" ") || "No summary text yet.";

export default function JunOSControlPage() {
  const [draft, setDraft] = useState<PortfolioControls>(() => normalizePortfolioControls(DEFAULT_PORTFOLIO_CONTROLS));
  const [activeSection, setActiveSection] = useState<PortfolioSectionKey>("projects");
  const [selectedId, setSelectedId] = useState("");
  const [savedState, setSavedState] = useState("Ready");
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncedMedia, setSyncedMedia] = useState<Record<string, {src: string, origin: string}[]>>({});
  const [brainNodes, setBrainNodes] = useState<any[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const loaded = loadPortfolioControls();
    setDraft(loaded);
    if (loaded.persistedNodes) setBrainNodes(loaded.persistedNodes);
  }, []);

  const sections = useMemo(() => [
    { key: "philosophy" as const, items: (dict.ko.philosophyData as any[]).map(item => {
      const rawItem: RawPortfolioItem = { slug: item.id, title: item.title, role: item.label, summary: item.description, sidebarMedia: (item.images || []).map((src: string) => ({src, alt: item.title})), stack: item.projects };
      return { id: getPortfolioItemId("philosophy" as any, rawItem), section: "philosophy" as const, title: titleOf(rawItem), eyebrow: eyebrowOf(rawItem), summary: summaryOf(rawItem), media: getAllItemMedia(rawItem), rawItem, origin: "Hardcoded in portfolio.ts" };
    }) },
    { key: "education" as const, items: (dict.ko.educationData as RawPortfolioItem[]).map(item => ({ id: getPortfolioItemId("education", item), section: "education" as const, title: titleOf(item), eyebrow: eyebrowOf(item), summary: summaryOf(item), media: getAllItemMedia(item), rawItem: item, origin: "Hardcoded in portfolio.ts" })) },
    { key: "experience" as const, items: (dict.ko.experienceData as RawPortfolioItem[]).map(item => ({ id: getPortfolioItemId("experience", item), section: "experience" as const, title: titleOf(item), eyebrow: eyebrowOf(item), summary: summaryOf(item), media: getAllItemMedia(item), rawItem: item, origin: "Hardcoded in portfolio.ts" })) },
    { key: "publications" as const, items: (dict.ko.publicationData as RawPortfolioItem[]).map(item => ({ id: getPortfolioItemId("publications", item), section: "publications" as const, title: titleOf(item), eyebrow: eyebrowOf(item), summary: summaryOf(item), media: getAllItemMedia(item), rawItem: item, origin: "Hardcoded in portfolio.ts" })) },
    { key: "projects" as const, items: [
      ...(dict.ko.projectData as RawPortfolioItem[]).map(item => ({ id: getPortfolioItemId("projects", item), section: "projects" as const, title: titleOf(item), eyebrow: eyebrowOf(item), summary: summaryOf(item), media: getAllItemMedia(item), rawItem: item, origin: "Hardcoded in portfolio.ts" })),
      ...brainNodes.map(node => {
        const rawItem = node.data || {};
        // Use node.title or rawItem.title, otherwise default to "Untitled"
        const finalTitle = node.title || rawItem.title || "Untitled Brain Node";
        return { 
          id: `brain:${node.id || node.path}`, 
          section: "projects" as const, 
          title: finalTitle, 
          eyebrow: "Brain Node", 
          summary: rawItem.summary || "No summary", 
          media: getAllItemMedia(rawItem), 
          rawItem: rawItem, 
          origin: node.origin || node.path 
        };
      })
    ] },
  ], [brainNodes]);

  const activeItems = useMemo(() => sections.find(s => s.key === activeSection)?.items || [], [activeSection, sections]);
  const selectedItem = useMemo(() => activeItems.find(i => i.id === selectedId) || activeItems[0], [activeItems, selectedId]);
  const selectedControl = useMemo(() => selectedItem ? getItemControl(draft, selectedId || selectedItem.id) : null, [draft, selectedItem, selectedId]);

  useEffect(() => {
    if (activeItems.length > 0 && (!selectedId || !activeItems.some(i => i.id === selectedId))) {
      setSelectedId(activeItems[0].id);
    }
  }, [activeItems, selectedId]);

  const handleFullSync = async () => {
    setIsSyncing(true);
    setSavedState("Syncing...");
    try {
      const mediaRes = await fetch("/api/sync-media", { method: "POST" });
      const mediaData = await mediaRes.json();
      if (mediaData.success) setSyncedMedia(mediaData.discoveredFiles);
      const nodeRes = await fetch("/api/sync-nodes", { method: "POST" });
      const nodeData = await nodeRes.json();
      if (nodeData.success) {
        setBrainNodes(nodeData.nodes);
        setDraft(prev => ({ ...prev, persistedNodes: nodeData.nodes }));
      }
      setSavedState("Full Sync Complete!");
    } catch (e) { setSavedState("Sync Failed"); } finally { setIsSyncing(false); }
  };

  const updateItem = (itemId: string, updater: (item: any) => any) => {
    setDraft(current => normalizePortfolioControls({ 
      ...current, 
      items: { ...current.items, [itemId]: updater(getItemControl(current, itemId)) },
      persistedNodes: brainNodes,
      updatedAt: new Date().toISOString() 
    }));
    setSavedState("Unsaved changes");
  };

  const discoveredMediaForSelected = useMemo(() => {
    if (!selectedItem) return [];
    const slug = selectedItem.rawItem.slug || selectedItem.id.split(':')[1] || "general";
    return syncedMedia[slug] || [];
  }, [selectedItem, syncedMedia]);

  if (!mounted) return null;

  return (
    <main className="min-h-screen bg-[#0B0F14] text-[#F4EFE7]">
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,107,74,0.2),transparent_34rem),linear-gradient(135deg,rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:auto,48px_48px]" />
      <div className="relative mx-auto flex min-h-screen max-w-7xl flex-col px-5 py-8 md:px-8">
        <header className="mb-8 flex flex-col gap-6 border-b border-white/10 pb-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="mb-4 inline-flex items-center gap-3 rounded-full border border-[#FF6B4A]/30 bg-[#FF6B4A]/10 px-4 py-2 text-[10px] font-black uppercase tracking-[0.35em] text-[#FFB199]"><SlidersHorizontal size={14} /> Intelligence Console</div>
            <h1 className="max-w-4xl text-5xl font-black uppercase italic tracking-tighter md:text-7xl">Control.</h1>
          </div>
          <div className="flex flex-wrap gap-3">
            <button onClick={handleFullSync} disabled={isSyncing} className={`inline-flex items-center gap-2 rounded-full border border-[#FF6B4A]/30 px-5 py-3 text-xs font-black uppercase tracking-[0.2em] text-[#FF6B4A] transition hover:bg-[#FF6B4A]/10 ${isSyncing ? "opacity-50" : ""}`}><Database size={15} className={isSyncing ? "animate-spin" : ""} /> Full Sync</button>
            <Link href="/" target="_blank" className="inline-flex items-center gap-2 rounded-full border border-white/10 px-5 py-3 text-xs font-black uppercase tracking-[0.2em] text-white/60 transition hover:border-white/30 hover:text-white"><Eye size={15} /> Preview</Link>
            <button onClick={() => { savePortfolioControls(draft); setSavedState("Saved!"); }} className="inline-flex items-center gap-2 rounded-full bg-[#FF6B4A] px-6 py-3 text-xs font-black uppercase tracking-[0.22em] text-white shadow-xl transition hover:scale-105 active:scale-95"><Save size={16} /> Save</button>
          </div>
        </header>

        <section className="mb-8 grid gap-3 md:grid-cols-4">
          {sections.map(section => (
            <div key={section.key} onClick={() => setActiveSection(section.key)} className={`rounded-[2rem] border p-5 transition cursor-pointer ${activeSection === section.key ? "border-[#FF6B4A] bg-[#FF6B4A]/10" : "border-white/10 bg-white/5 hover:border-white/20"}`}>
              <div className="mb-5 flex items-center justify-between"><span className="text-[10px] font-black uppercase tracking-widest opacity-40">{SECTION_META[section.key].label}</span></div>
              <p className="text-3xl font-black">{section.items.length}</p>
            </div>
          ))}
        </section>

        {selectedItem && selectedControl && (
          <div className="mb-12 animate-in fade-in slide-in-from-top-4 duration-500">
            <div className="flex items-center justify-between mb-6 px-4">
              <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-[#FF6B4A]">On-Canvas Intelligence Editor</h3>
              <div className="text-[10px] font-bold text-white/20 uppercase tracking-widest italic flex items-center gap-2"><SlidersHorizontal size={12} /> Click text or images to edit directly</div>
            </div>
            <div className="rounded-[3rem] border border-white/10 bg-white/5 p-12 shadow-2xl backdrop-blur-3xl">
              <PreviewItem key={selectedId} item={selectedItem} control={selectedControl} onUpdate={updateItem} discoveredMedia={discoveredMediaForSelected} />
            </div>
          </div>
        )}

        <section className="grid flex-1 gap-8 lg:grid-cols-1">
          <div className="rounded-[2.5rem] border border-white/10 bg-white/5 p-8">
            <div className="mb-6 px-2 flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-white/30">
              <span>Node Selection ({activeSection})</span>
              <span>{savedState}</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {activeItems.map(item => {
                const control = getItemControl(draft, item.id);
                return (
                  <div key={item.id} className={`group flex items-center gap-2 rounded-2xl p-1 transition ${selectedId === item.id ? "bg-[#FF6B4A]/10 shadow-lg shadow-[#FF6B4A]/5" : ""}`}>
                    <button onClick={() => { setSelectedId(item.id); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className={`flex-1 rounded-xl p-4 text-left transition ${selectedId === item.id ? "bg-[#FF6B4A]/20 border-[#FF6B4A]/40 border" : "bg-black/20 border-transparent border hover:border-white/10"}`}>
                      <div className="flex justify-between items-center">
                        <p className={`text-sm font-black truncate max-w-[200px] ${control.visible ? "text-white" : "text-white/30"}`}>{draft.items[item.id]?.overrides?.title || item.title}</p>
                        {item.origin.includes('Brain') && <Database size={10} className="text-[#FF6B4A]" />}
                      </div>
                    </button>
                    <button onClick={() => updateItem(item.id, i => ({ ...i, visible: !i.visible }))} className={`shrink-0 p-3 rounded-xl transition ${control.visible ? "bg-[#FF6B4A] text-white shadow-md shadow-[#FF6B4A]/20" : "bg-white/5 text-white/20 hover:bg-white/10"}`}>
                      {control.visible ? <Eye size={16} /> : <EyeOff size={16} />}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
