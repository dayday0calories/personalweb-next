"use client";
/**
 * 💠 Tag Component
 * -----------------
 * A small, reusable "pill-style" label used across the UI.
 *
 * ✅ Purpose:
 *   - Displays compact labels or keywords (skills, technologies, statuses, etc.)
 *   - Reusable in project cards, about sections, or lists of skills.
 *   - Supports size variations ("sm" | "md") and interactive hover styles.
 *
 * 💡 Example usage:
 *   <Tag>React</Tag>
 *   <Tag size="md" interactive>TypeScript</Tag>
 *   <Tag className="bg-blue-100 text-blue-700">AWS</Tag>
 */

import type { HTMLAttributes } from "react";
// ✅ HTMLAttributes lets you pass any valid <span> attributes (like `id`, `onClick`, `title`, etc.)
// This ensures flexibility when using Tag in different parts of your app.

// -----------------------------------------------------
// 🔸 Type Definitions
// -----------------------------------------------------
type TagProps = {
  size?: "sm" | "md"; // optional size variant (small or medium)
  interactive?: boolean; // whether the tag should change style on hover
} & HTMLAttributes<HTMLSpanElement>;
// merges our custom props with default <span> attributes

// -----------------------------------------------------
// 🔸 Base Size Styles
// -----------------------------------------------------
// Each size defines Tailwind padding (px/py) and font size.
// NonNullable ensures size always maps to a string key ("sm" or "md").
const sizeClasses: Record<NonNullable<TagProps["size"]>, string> = {
  sm: "px-3 py-1 text-sm", // compact version for smaller layouts
  md: "px-4 py-2 text-sm", // slightly larger, used in feature sections
};

// -----------------------------------------------------
// 🔸 Functional Component
// -----------------------------------------------------
export function Tag({
  children, // inner text or icon inside the tag
  size = "sm", // default size if none provided
  interactive = false, // default: non-hover tag
  className = "", // optional extra Tailwind classes
  ...rest // any other <span> attributes passed by the parent
}: TagProps) {
  // Adds hover styling only when interactive = true
  const interactiveClasses = interactive
    ? "hover:bg-zinc-900 hover:text-white hover:border-zinc-900 transition-colors"
    : ""; // no hover if false

  return (
    <span
      // Tailwind classes:
      // - inline-flex: aligns text/icons properly inside the pill
      // - rounded-full: gives it a pill shape
      // - border/border-zinc-200: soft neutral outline
      // - bg-zinc-100 text-zinc-700: subtle neutral background & text
      // - ${sizeClasses[size]}: applies spacing/font size dynamically
      // - ${interactiveClasses}: adds hover color transitions
      // - ${className}: user-defined overrides
      className={`inline-flex items-center rounded-full border border-zinc-200 bg-zinc-100 text-zinc-700 ${sizeClasses[size]} ${interactiveClasses} ${className}`}
      {...rest} // spreads other attributes (e.g., title="click me", onClick={...})
    >
      {children}
    </span>
  );
}
