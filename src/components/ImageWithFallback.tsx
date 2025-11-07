"use client";

/**
 * 🖼️ ImageWithFallback Component
 * -------------------------------
 * A safer, smarter wrapper around Next.js’s <Image /> component.
 *
 * ✅ Purpose:
 *   - Keeps all of Next’s built-in optimizations (lazy loading, resizing, caching).
 *   - Adds a graceful fallback for broken remote images (so you never see
 *     the ugly "broken image" icon).
 *   - Uses a custom loader to append width (`w`) and quality (`q`) parameters
 *     to external URLs — useful for CDNs like Unsplash or Cloudinary.
 *   - Leaves local or inline images untouched.
 *
 * 🧩 Technologies:
 *   - next/image  → optimized image rendering.
 *   - useState()  → local state to swap to fallback on error.
 *   - TypeScript  → strict prop typing with optional fallbackSrc override.
 */

import Image, { type ImageLoader, type ImageProps } from "next/image";
import { useState } from "react";

// -----------------------------------------------------
// 🔸 Default Inline Fallback SVG
// -----------------------------------------------------
// A small gray camera-like SVG encoded in base64.
// It’s inline so it requires no extra requests and always loads instantly.
const INLINE_FALLBACK_SVG =
  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODgiIGhlaWdodD0iODgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgc3Ryb2tlPSIjMDAwIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBvcGFjaXR5PSIuMyIgZmlsbD0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIzLjciPjxyZWN0IHg9IjE2IiB5PSIxNiIgd2lkdGg9IjU2IiBoZWlnaHQ9IjU2IiByeD0iNiIvPjxwYXRoIGQ9Im0xNiA1OCAxNi0xOCAzMiAzMiIvPjxjaXJjbGUgY3g9IjUzIiBjeT0iMzUiIHI9IjciLz48L3N2Zz4KCg==";

// -----------------------------------------------------
// 🔸 Custom Image Loader
// -----------------------------------------------------
// Next.js calls this loader function before fetching an image.
// It allows us to modify URLs for external CDNs by appending width/quality params.
// - For local/public paths, we return the original URL unchanged.
// - For remote URLs, we add w=... & q=... (for responsive optimization).
const FALLBACK_AWARE_LOADER: ImageLoader = ({ src, width, quality }) => {
  // Skip URL manipulation for local files or inline sources
  if (
    src.startsWith("/") ||
    src.startsWith("data:") ||
    src.startsWith("blob:")
  ) {
    return src;
  }

  try {
    // Parse the URL safely — works for remote sources
    const url = new URL(src);

    // Append width & quality params
    url.searchParams.set("w", width.toString());

    // Add `auto=format` unless already provided (for automatic compression)
    if (!url.searchParams.has("auto")) {
      url.searchParams.set("auto", "format");
    }

    if (quality) {
      url.searchParams.set("q", quality.toString());
    }

    return url.toString();
  } catch {
    // If parsing fails (invalid URL), return it untouched
    return src;
  }
};

// -----------------------------------------------------
// 🔸 Prop Definition
// -----------------------------------------------------
// We accept everything from Next.js's <Image /> except a custom loader,
// since we supply our own, plus one optional prop: `fallbackSrc`.
type ImageWithFallbackProps = Omit<ImageProps, "loader"> & {
  fallbackSrc?: string; // allows user to provide their own fallback image
};

// -----------------------------------------------------
// 🔸 Component Definition
// -----------------------------------------------------
export function ImageWithFallback({
  fallbackSrc = INLINE_FALLBACK_SVG, // default fallback to inline SVG
  onError, // optional user-defined onError handler
  alt,
  src,
  ...rest
}: ImageWithFallbackProps) {
  /**
   * Local state to track which image should currently render.
   * Initially it's the provided `src`.
   * If that image fails, we swap to `fallbackSrc`.
   */
  const [currentSrc, setCurrentSrc] = useState(src);

  // -----------------------------------------------------
  // ❌ Error Handler
  // -----------------------------------------------------
  const handleError: NonNullable<ImageProps["onError"]> = (event) => {
    // Prevent infinite loop by checking we’re not already showing the fallback
    if (typeof currentSrc === "string" && currentSrc !== fallbackSrc) {
      setCurrentSrc(fallbackSrc);
    }

    // Still run any external error logic passed via props
    onError?.(event);
  };

  // -----------------------------------------------------
  // 🧱 Render Optimized Image
  // -----------------------------------------------------
  return (
    <Image
      {...rest}
      alt={alt}
      src={currentSrc} // either original or fallback
      loader={FALLBACK_AWARE_LOADER} // our custom loader
      onError={handleError} // swap to fallback on failure
    />
  );
}
