import type { SidebarMedia } from "@/data/portfolio";
import { sitePath } from "@/lib/site-path";

export const PORTFOLIO_CONTROL_STORAGE_KEY = "junos.portfolio.controls.v1";

export type PortfolioSectionKey = "education" | "experience" | "publications" | "projects" | "philosophy";

export type PortfolioContentKey =
  | "title"
  | "logo"
  | "meta"
  | "summary"
  | "hook"
  | "details"
  | "outcomes"
  | "stack"
  | "evidence"
  | "related"
  | "links"
  | "primaryLink"
  | "cardMedia"
  | "sidebarMedia";

export type PortfolioItemControl = {
  visible: boolean;
  content: Record<PortfolioContentKey, boolean>;
  hiddenMedia: string[];
  uploadedMedia?: SidebarMedia[];
  primaryMedia?: string;
  overrides?: Record<string, string>;
};

export type PortfolioControls = {
  schemaVersion: 1;
  updatedAt: string;
  sections: Record<PortfolioSectionKey, boolean>;
  items: Record<string, Partial<PortfolioItemControl>>;
  persistedNodes?: any[];
};

const DEFAULT_SECTION_VISIBILITY: Record<PortfolioSectionKey, boolean> = {
  education: true,
  experience: true,
  publications: true,
  projects: true,
  philosophy: true,
};

export const DEFAULT_CONTENT_VISIBILITY: Record<PortfolioContentKey, boolean> = {
  title: true,
  logo: true,
  meta: true,
  summary: true,
  hook: true,
  details: true,
  outcomes: true,
  stack: true,
  evidence: true,
  related: true,
  links: true,
  primaryLink: true,
  cardMedia: true,
  sidebarMedia: true,
};

export const CONTENT_CONTROL_LABELS: Record<PortfolioContentKey, string> = {
  title: "Title",
  logo: "Logo",
  meta: "Role / date",
  summary: "Summary",
  hook: "Hook line",
  details: "Details",
  outcomes: "Proof / outcomes",
  stack: "Stack",
  evidence: "JunOS evidence",
  related: "Related nodes",
  links: "External links",
  primaryLink: "Primary CTA",
  cardMedia: "Card media",
  sidebarMedia: "Sidebar media",
};

export const DEFAULT_PORTFOLIO_CONTROLS: PortfolioControls = {
  schemaVersion: 1,
  updatedAt: "",
  sections: DEFAULT_SECTION_VISIBILITY,
  items: {},
};

type PortfolioRecord = {
  slug?: string;
  title?: string;
  company?: string;
  school?: string;
  venue?: string;
  period?: string;
  date?: string;
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

export function slugifyPortfolioValue(value: string) {
  return value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export function getPortfolioItemId(section: PortfolioSectionKey, item: unknown) {
  const record = isRecord(item) ? (item as PortfolioRecord) : {};
  const base = record.slug || record.title || record.company || record.school || record.venue || `${section}-item`;
  return `${section}:${slugifyPortfolioValue(base)}`;
}

function normalizeContent(input: unknown): Record<PortfolioContentKey, boolean> {
  const source = isRecord(input) ? input : {};
  return (Object.keys(DEFAULT_CONTENT_VISIBILITY) as PortfolioContentKey[]).reduce(
    (content, key) => ({ ...content, [key]: typeof source[key] === "boolean" ? source[key] : DEFAULT_CONTENT_VISIBILITY[key] }),
    { ...DEFAULT_CONTENT_VISIBILITY },
  );
}

export function getItemControl(controls: PortfolioControls, itemId: string): PortfolioItemControl {
  const stored = controls.items[itemId] || {};
  return {
    visible: typeof stored.visible === "boolean" ? stored.visible : true,
    content: normalizeContent(stored.content),
    hiddenMedia: Array.isArray(stored.hiddenMedia) ? stored.hiddenMedia.filter((item): item is string => typeof item === "string") : [],
    uploadedMedia: Array.isArray(stored.uploadedMedia) ? stored.uploadedMedia : [],
    primaryMedia: typeof stored.primaryMedia === "string" ? stored.primaryMedia : undefined,
    overrides: isRecord(stored.overrides) ? (stored.overrides as Record<string, string>) : {},
  };
}

export function normalizePortfolioControls(input: unknown): PortfolioControls {
  const source = isRecord(input) ? input : {};
  const rawSections = isRecord(source.sections) ? source.sections : {};
  const sections = (Object.keys(DEFAULT_SECTION_VISIBILITY) as PortfolioSectionKey[]).reduce(
    (next, key) => ({ ...next, [key]: typeof rawSections[key] === "boolean" ? rawSections[key] : DEFAULT_SECTION_VISIBILITY[key] }),
    { ...DEFAULT_SECTION_VISIBILITY },
  );
  const rawItems = isRecord(source.items) ? source.items : {};
  const items = Object.entries(rawItems).reduce<Record<string, Partial<PortfolioItemControl>>>((next, [itemId, value]) => {
    if (!isRecord(value)) return next;
    return {
      ...next,
      [itemId]: {
        visible: typeof value.visible === "boolean" ? value.visible : undefined,
        content: normalizeContent(value.content),
        hiddenMedia: Array.isArray(value.hiddenMedia) ? value.hiddenMedia.filter((item): item is string => typeof item === "string") : [],
        uploadedMedia: Array.isArray(value.uploadedMedia) ? value.uploadedMedia : [],
        primaryMedia: typeof value.primaryMedia === "string" ? value.primaryMedia : undefined,
        overrides: isRecord(value.overrides) ? (value.overrides as Record<string, string>) : {},
      },
    };
  }, {});

  return {
    schemaVersion: 1,
    updatedAt: typeof source.updatedAt === "string" ? source.updatedAt : "",
    sections,
    items,
    persistedNodes: Array.isArray(source.persistedNodes) ? source.persistedNodes : [],
  };
}

export function loadPortfolioControls() {
  if (typeof window === "undefined") return normalizePortfolioControls(DEFAULT_PORTFOLIO_CONTROLS);
  try {
    return normalizePortfolioControls(JSON.parse(window.localStorage.getItem(PORTFOLIO_CONTROL_STORAGE_KEY) || "null"));
  } catch {
    return normalizePortfolioControls(DEFAULT_PORTFOLIO_CONTROLS);
  }
}

export function savePortfolioControls(controls: PortfolioControls) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(PORTFOLIO_CONTROL_STORAGE_KEY, JSON.stringify(normalizePortfolioControls(controls)));
}

export function getSectionVisible(controls: PortfolioControls, section: PortfolioSectionKey) {
  return controls.sections[section] !== false;
}

export function getItemVisible(controls: PortfolioControls, itemId: string) {
  return getItemControl(controls, itemId).visible !== false;
}

export function getContentVisible(controls: PortfolioControls, itemId: string, contentKey: PortfolioContentKey) {
  return getItemControl(controls, itemId).content[contentKey] !== false;
}

export function getVisibleMedia(controls: PortfolioControls, itemId: string, media: SidebarMedia[]) {
  const ctrl = getItemControl(controls, itemId);
  const hidden = new Set(ctrl.hiddenMedia || []);
  
  // Merge uploaded media from dashboard controls into the list
  const uploaded = ctrl.uploadedMedia || [];
  const allMedia = [...uploaded, ...media];
  
  const seen = new Set<string>();
  return allMedia.filter((item) => {
    if (!item || !item.src || hidden.has(item.src) || seen.has(item.src)) return false;
    seen.add(item.src);
    return true;
  }).map((item) => ({ ...item, src: sitePath(item.src) }));
}

export function getAllItemMedia(item: { visual?: SidebarMedia; sidebarMedia?: SidebarMedia[] }) {
  const seen = new Set<string>();
  const uploaded = (item as any).uploadedMedia || [];
  return [item.visual, ...(item.sidebarMedia || []), ...uploaded].filter((media): media is SidebarMedia => {
    if (!media || seen.has(media.src)) return false;
    seen.add(media.src);
    return true;
  }).map((media) => ({ ...media, src: sitePath(media.src) }));
}
