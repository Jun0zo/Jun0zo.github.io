const normalizedSitePrefix = (process.env.NEXT_PUBLIC_SITE_PATH || "").trim().replace(/\/+$/, "");

export function sitePath(path: string) {
  if (!path) return path;
  if (/^[a-zA-Z][a-zA-Z\d+\-.]*:/.test(path) || path.startsWith("//")) return path;
  if (!normalizedSitePrefix) return path;
  if (path.startsWith(normalizedSitePrefix + "/") || path === normalizedSitePrefix) return path;
  if (path.startsWith("/")) return `${normalizedSitePrefix}${path}`;
  return `${normalizedSitePrefix}/${path}`;
}
