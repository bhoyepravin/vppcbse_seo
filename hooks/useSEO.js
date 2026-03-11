// hooks/useSEO.js
// Custom hook that dynamically updates all <head> meta tags on every route change.
// Import and call this once in Layout.jsx — it handles every page automatically.

import { useEffect } from "react";
import { schoolSeoConfig, schoolPageSEO, buildPageSchema } from "../utils/SeoConfig";
import { schoolSlugToSeoKeyMap } from "../utils/SeoMappings";

/**
 * useSchoolSEO(pathname)
 * Call in Layout.jsx with pathname from useLocation().
 * Automatically updates: title, description, keywords, canonical,
 * Open Graph, Twitter Card, and JSON-LD structured data.
 */
export const useSchoolSEO = (pathname = "/") => {
  useEffect(() => {
    // Normalise path: strip leading/trailing slashes
    const cleanPath = pathname.replace(/^\/|\/$/g, "");

    // Resolve SEO key: try full path first, then first segment, then default
    const seoKey =
      schoolSlugToSeoKeyMap[cleanPath] ??
      schoolSlugToSeoKeyMap[cleanPath.split("/")[0]] ??
      "home";

    const pageData = schoolPageSEO[seoKey] ?? schoolPageSEO.home;

    const canonicalUrl = `${schoolSeoConfig.baseUrl}${pageData.canonical}`;
    const ogImageUrl = pageData.ogImage
      ? `${schoolSeoConfig.baseUrl}${pageData.ogImage}`
      : `${schoolSeoConfig.baseUrl}/logo_chmes.png`;

    // ── Title ───────────────────────────────────────────────────────
    document.title = pageData.title;

    // ── Standard Meta Tags ──────────────────────────────────────────
    setMeta("name", "description", pageData.description);
    setMeta("name", "keywords", pageData.keywords || "");
    setMeta("name", "author", schoolSeoConfig.siteName);
    setMeta("name", "robots", "index, follow");

    // ── Canonical ───────────────────────────────────────────────────
    setCanonical(canonicalUrl);

    // ── Open Graph ──────────────────────────────────────────────────
    setMeta("property", "og:type", "website");
    setMeta("property", "og:site_name", schoolSeoConfig.siteName);
    setMeta("property", "og:locale", "en_IN");
    setMeta("property", "og:title", pageData.title);
    setMeta("property", "og:description", pageData.description);
    setMeta("property", "og:url", canonicalUrl);
    setMeta("property", "og:image", ogImageUrl);
    setMeta("property", "og:image:width", "1200");
    setMeta("property", "og:image:height", "630");
    setMeta("property", "og:image:alt", pageData.title);

    // ── Twitter Card ─────────────────────────────────────────────────
    setMeta("name", "twitter:card", "summary_large_image");
    setMeta("name", "twitter:site", schoolSeoConfig.twitterHandle);
    setMeta("name", "twitter:title", pageData.title);
    setMeta("name", "twitter:description", pageData.description);
    setMeta("name", "twitter:image", ogImageUrl);
    setMeta("name", "twitter:image:alt", pageData.title);

    // ── JSON-LD Structured Data ──────────────────────────────────────
    setStructuredData(buildPageSchema(seoKey, pageData));
  }, [pathname]);
};

// ─── DOM Helpers ───────────────────────────────────────────────────────────────

/** Set or create a <meta> tag by attribute type ("name" or "property") */
function setMeta(attrType, attrValue, content) {
  let el = document.querySelector(`meta[${attrType}="${attrValue}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attrType, attrValue);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

/** Set or create the <link rel="canonical"> tag */
function setCanonical(href) {
  let el = document.querySelector('link[rel="canonical"]');
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", "canonical");
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

/** Replace the <script type="application/ld+json"> with fresh structured data */
function setStructuredData(schema) {
  // Remove all existing ld+json scripts injected by this hook
  document.querySelectorAll('script[type="application/ld+json"][data-seo-hook]').forEach(el => el.remove());

  const script = document.createElement("script");
  script.type = "application/ld+json";
  script.setAttribute("data-seo-hook", "true");
  script.textContent = JSON.stringify(schema, null, 0);
  document.head.appendChild(script);
}
