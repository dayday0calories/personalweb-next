"use client";
/**
 * 🧭 LeftNav Component
 * --------------------
 * A responsive sidebar navigation for your portfolio website.
 *
 * ✅ Purpose:
 *   - Acts as the main navigation hub for desktop and mobile users.
 *   - Collapses into a slide-in drawer on mobile.
 *   - Highlights the active section while scrolling (coordinated with IntersectionObserver logic from parent).
 *   - Displays personal info (avatar, name, title) and section links with icons.
 *
 * 🧩 Features:
 *   - Smooth scrolling between page sections.
 *   - Active link highlighting.
 *   - Mobile-friendly drawer toggle.
 *   - Clean, dark aesthetic using TailwindCSS.
 */

import { Home, Code2, Briefcase, Mail, Menu, X } from "lucide-react"; // Icon components
import { useState } from "react";
import { ImageWithFallback } from "./ImageWithFallback"; // custom safe image component

// -----------------------------------------------------
// 🔸 Props Interface
// -----------------------------------------------------
interface LeftNavProps {
  activeSection: string; // the current visible section ID (used for highlight)
  setActiveSection: (section: string) => void; // updates the active section state globally
}

// -----------------------------------------------------
// 🔸 Component Definition
// -----------------------------------------------------
export function LeftNav({ activeSection, setActiveSection }: LeftNavProps) {
  // State controlling whether the mobile drawer is open
  const [isOpen, setIsOpen] = useState(false);

  // Navigation item configuration array
  const navItems = [
    { id: "home", label: "Home", icon: Home },
    { id: "skills", label: "Skills", icon: Code2 },
    { id: "projects", label: "Projects", icon: Briefcase },
    { id: "contact", label: "Contact", icon: Mail },
  ];

  // -----------------------------------------------------
  // 🔸 Smooth Scroll Behavior
  // -----------------------------------------------------
  const scrollToSection = (id: string) => {
    /**
     * Scroll smoothly to the specified section ID,
     * update the global active section state,
     * and close the mobile drawer.
     */
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" }); // smooth scroll to section
      setActiveSection(id); // update navbar highlight
      setIsOpen(false); // close drawer if mobile
    }
  };

  // -----------------------------------------------------
  // 🔸 Render JSX
  // -----------------------------------------------------
  return (
    <>
      {/* ============================================================
          📱 Mobile Toggle Button
          Appears only on mobile (md:hidden).
          Toggles the sidebar drawer open and closed.
      ============================================================ */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-50 md:hidden bg-white p-2 rounded-lg shadow-lg"
      >
        {/* When open → “X” icon; when closed → “Menu” icon */}
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* ============================================================
          🧱 Sidebar Navigation Panel
          - Fixed on the left
          - Dark theme
          - Slide-in animation on mobile
      ============================================================ */}
      <aside
        className={`
          fixed top-0 left-0 h-full w-64 bg-zinc-900
          transform transition-transform duration-300 z-40
          ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          }  /* slide-in effect on mobile */
          md:translate-x-0  /* always visible on desktop */
        `}
      >
        <div className="flex flex-col h-full p-6">
          {/* ============================================================
              👤 Profile Info (Avatar + Name + Role)
              Centered block at top of sidebar
          ============================================================ */}
          <div className="mb-12 mt-4">
            {/* Soft glowing background effect under avatar */}
            <div className="mb-4 relative">
              <div className="absolute inset-0 bg-zinc-700/30 rounded-full blur-xl"></div>
              <ImageWithFallback
                src="/rain_avatar.jpg" // your avatar image
                alt="Profile"
                className="relative w-20 h-20 rounded-full object-cover border-2 border-zinc-700 mx-auto"
              />
            </div>

            <h1 className="text-white text-center mb-1">Rain Yu</h1>
            <p className="text-zinc-400 text-center">Full-stack Developer</p>
          </div>

          {/* ============================================================
              🧭 Navigation Menu
              List of sections (Home, Skills, Projects, Contact)
              Highlights active one using activeSection state
          ============================================================ */}
          <nav className="flex-1">
            <ul className="space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeSection === item.id;

                return (
                  <li key={item.id}>
                    <button
                      onClick={() => scrollToSection(item.id)}
                      className={`
                        w-full flex items-center gap-3 px-4 py-3 rounded-lg 
                        transition-all duration-200
                        ${
                          isActive
                            ? // Active: highlighted background & white text
                              "bg-zinc-800 text-white border border-zinc-700"
                            : // Inactive: muted gray with hover lift
                              "text-zinc-400 hover:bg-zinc-800/50 hover:text-white hover:translate-x-1"
                        }
                      `}
                    >
                      <Icon className="w-5 h-5" />
                      <span>{item.label}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* ============================================================
              📅 Sidebar Footer
              Sits at bottom of navigation (fixed with flex-grow above)
          ============================================================ */}
          <div className="pt-6 border-t border-zinc-800">
            <p className="text-zinc-600 text-sm">© 2025 Portfolio</p>
          </div>
        </div>
      </aside>

      {/* ============================================================
          🌓 Mobile Overlay (dim background)
          Appears when sidebar is open on mobile; clicking it closes the drawer.
      ============================================================ */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
