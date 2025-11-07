/**
 * 🧱 Card Component
 * -----------------
 * A generic, reusable container component for wrapping content inside a styled card.
 *
 * ✅ Purpose:
 *   - Centralizes shared visual styles (rounded corners, border, shadow, hover animation).
 *   - Keeps all sections (projects, skills, contact cards, etc.) visually consistent.
 *   - Simplifies customization — each card can pass its own extra CSS classes or behavior.
 *
 * 💡 Example usage:
 *   <Card>
 *     <h3>Project Title</h3>
 *     <p>This project is awesome.</p>
 *   </Card>
 *
 *   <Card interactive={false} className="bg-gray-100">
 *     <p>Static non-hover card</p>
 *   </Card>
 */

import type { HTMLAttributes } from "react";
// 🔹 HTMLAttributes allows passing any valid <div> attributes (like id, style, onClick)
//    This makes the Card flexible for different use cases.

// -----------------------------------------------------
// 🔸 Props Definition
// -----------------------------------------------------
interface CardProps extends HTMLAttributes<HTMLDivElement> {
  interactive?: boolean;
  // optional flag: if true (default), card will have hover animation
  // if false, it remains static (useful for passive info blocks)
}

// -----------------------------------------------------
// 🔸 Functional Component
// -----------------------------------------------------
export function Card({
  children, // Content nested inside the card (passed from parent)
  interactive = true, // Default behavior: interactive with hover animation
  className = "", // Allows user to append extra Tailwind classes externally
  ...rest // Captures all other <div> attributes (e.g., id, onClick)
}: CardProps) {
  // Conditional TailwindCSS classes for hover interaction
  const interactiveClasses = interactive
    ? "hover:-translate-y-2 hover:shadow-xl" // Lift up + shadow on hover
    : ""; // No hover effect when disabled

  return (
    <div
      // Base style:
      // - `group` allows coordinated hover effects for child elements.
      // - `rounded-3xl` → soft large corners.
      // - `border` and `bg-white` give the card a clean panel look.
      // - `transition-all duration-300` smooths the hover animations.
      // - `${interactiveClasses}` applies hover motion conditionally.
      // - `${className}` allows the parent to extend or override styles.
      className={`group rounded-3xl border border-zinc-200 bg-white transition-all duration-300 ${interactiveClasses} ${className}`}
      {...rest} // spreads any additional props (like onClick, id, aria-label)
    >
      {/* children = whatever content is passed between <Card> ... </Card> */}
      {children}
    </div>
  );
}
