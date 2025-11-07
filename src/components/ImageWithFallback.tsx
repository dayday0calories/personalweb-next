"use client";
/* eslint-disable @next/next/no-img-element */
/**
 * 🖼️ ImageWithFallback Component
 * -------------------------------
 * A lightweight wrapper around the standard <img> element that gracefully
 * replaces broken images with a neutral placeholder.
 *
 * ✅ Why use this instead of Next.js <Image>?
 *   - Sometimes you need to render remote or dynamic image URLs that aren't
 *     known at build time.
 *   - Next's <Image /> requires domain configuration and static optimization.
 *   - This component preserves layout while avoiding the default “broken image” icon.
 *
 * 🧩 How it works:
 *   - Tries to load the given image.
 *   - If loading fails (`onError` fires), a fallback SVG placeholder is shown instead.
 *   - Maintains same sizing and className to preserve layout.
 */

import React, { useState } from "react";

// -----------------------------------------------------
// 🔸 Fallback Placeholder (Tiny Inline SVG)
// -----------------------------------------------------
// Encoded inline SVG to avoid fetching an external placeholder asset.
// The faint gray outline ensures visual consistency with neutral themes.
const ERROR_IMG_SRC =
  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODgiIGhlaWdodD0iODgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgc3Ryb2tlPSIjMDAwIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBvcGFjaXR5PSIuMyIgZmlsbD0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIzLjciPjxyZWN0IHg9IjE2IiB5PSIxNiIgd2lkdGg9IjU2IiBoZWlnaHQ9IjU2IiByeD0iNiIvPjxwYXRoIGQ9Im0xNiA1OCAxNi0xOCAzMiAzMiIvPjxjaXJjbGUgY3g9IjUzIiBjeT0iMzUiIHI9IjciLz48L3N2Zz4KCg==";

// -----------------------------------------------------
// 🔸 Component Definition
// -----------------------------------------------------
export function ImageWithFallback(
  props: React.ImgHTMLAttributes<HTMLImageElement>
) {
  /**
   * Tracks whether the main image failed to load.
   * Once an error is detected, the component switches to showing the SVG placeholder.
   */
  const [didError, setDidError] = useState(false);

  // Event handler: triggers when <img> fails to load
  const handleError = () => {
    setDidError(true);
  };

  // Destructure common props for readability
  const { src, alt, style, className, ...rest } = props;

  // -----------------------------------------------------
  // 🧱 Render
  // -----------------------------------------------------
  return didError ? (
    // 🧩 Fallback view: show the inline SVG placeholder
    <div
      className={`inline-block bg-gray-100 text-center align-middle ${
        className ?? ""
      }`}
      style={style}
    >
      <div className="flex items-center justify-center w-full h-full">
        {/* Keeps original image’s width/height via CSS so layout doesn’t collapse */}
        <img
          src={ERROR_IMG_SRC}
          alt="Error loading image"
          {...rest}
          data-original-url={src} // helpful for debugging
        />
      </div>
    </div>
  ) : (
    // ✅ Normal view: render the original image until it errors
    <img
      src={src}
      alt={alt}
      className={className}
      style={style}
      {...rest}
      onError={handleError}
    />
  );
}
