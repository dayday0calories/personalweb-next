"use client";
/**
 * 🌟 HeroSection Component
 * ------------------------
 * The main “landing” section of the portfolio.
 *
 * ✅ Purpose:
 *   - Visually introduces you with a profile photo, short bio, and CTA buttons.
 *   - Uses a creative layout (image + text) and background accents.
 *   - Communicates to the navigation bar which section is currently visible
 *     via IntersectionObserver (for active link highlighting).
 *
 * 🧩 Dependencies:
 *   - React Hooks: useRef + useEffect
 *   - lucide-react: icon library for GitHub / LinkedIn icons
 *   - ImageWithFallback: custom image component that shows a fallback image
 *     if the main one fails to load.
 */

import { useEffect, useRef } from "react";
import { Github, Linkedin } from "lucide-react"; // simple SVG icon components
import { ImageWithFallback } from "./ImageWithFallback";

// -----------------------------------------------------
// 🔸 Props Definition
// -----------------------------------------------------
interface HeroSectionProps {
  id: string; // section ID for anchor navigation and IntersectionObserver
  setActiveSection: (section: string) => void; // callback to update active section in navbar
}

// -----------------------------------------------------
// 🔸 Component Definition
// -----------------------------------------------------
export function HeroSection({ id, setActiveSection }: HeroSectionProps) {
  // `sectionRef` gives direct access to the <section> DOM node.
  const sectionRef = useRef<HTMLElement>(null);

  // -----------------------------------------------------
  // 🔸 useEffect — IntersectionObserver Setup
  // -----------------------------------------------------
  useEffect(() => {
    // Purpose:
    // Track when this section is visible in the viewport.
    // When at least 50% visible (threshold: 0.5),
    // call `setActiveSection(id)` to mark it as active in the sidebar/nav.
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setActiveSection(id);
        }
      },
      { threshold: 0.5 } // 50% of section must be visible to trigger
    );

    // Begin observing once component mounts
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    // Cleanup observer when component unmounts
    return () => observer.disconnect();
  }, [id, setActiveSection]);

  // -----------------------------------------------------
  // 🔸 Render Section
  // -----------------------------------------------------
  return (
    <section
      id={id} // used for anchor links (#home)
      ref={sectionRef} // attaches DOM reference for observer
      className="min-h-screen flex items-center justify-center px-6 md:px-12 relative overflow-hidden bg-white"
    >
      {/* =======================================================
          🎨 Decorative Background Circles
          These blurred shapes add subtle depth and texture.
          Positioned absolutely so they sit behind content.
      ======================================================== */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-zinc-200 rounded-full opacity-40 blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-zinc-300 rounded-full opacity-30 blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-zinc-200 rounded-full opacity-30 blur-3xl"></div>
      </div>

      {/* =======================================================
          📦 Main Content Container
          max-w-6xl keeps it centered and prevents over-expansion on large screens.
      ======================================================== */}
      <div className="max-w-6xl relative z-10">
        {/* Flex layout:
            - Column on mobile
            - Row-reverse on desktop (image right, text left)
        */}
        <div className="flex flex-col md:flex-row-reverse items-center gap-16">
          {/* =======================================================
              🖼️ Avatar Section with Layered Shapes
              Combines rotation, shadow, and overlapping boxes for a creative frame.
          ======================================================== */}
          <div className="flex-shrink-0 relative">
            {/* Soft blurred background “shadow” rotated for depth */}
            <div className="absolute inset-0 bg-zinc-800 rounded-[3rem] rotate-6 blur-xl opacity-20"></div>

            <div className="relative">
              {/* Main profile image using custom fallback-aware component */}
              <ImageWithFallback
                src="/rain_hero.jpg" // change to your actual portrait
                alt="Profile"
                className="w-64 h-64 md:w-80 md:h-80 object-cover rounded-[3rem] border-8 border-white shadow-2xl relative z-10"
              />

              {/* Floating accent boxes (decorative geometry) */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-zinc-800 rounded-2xl rotate-12 shadow-xl"></div>
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-zinc-700 rounded-3xl -rotate-12 shadow-xl"></div>
            </div>
          </div>

          {/* =======================================================
              ✏️ Text & Content Section
              Contains “Available for work”, About blurb, buttons, and social links.
          ======================================================== */}
          <div className="flex-1">
            {/* Availability badge */}
            <div className="mb-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-zinc-900 text-white rounded-full mb-6 shadow-lg">
                {/* Animated green dot using Tailwind’s animate-pulse */}
                <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
                <span>Available for work</span>
              </div>
            </div>

            {/* Title */}
            <h1 className="text-zinc-900 mb-6 leading-tight">About me</h1>

            {/* Short bio */}
            <p className="text-zinc-600 mb-8 max-w-lg text-lg">
              I started in customer service, where I learned to understand
              users, solve problems quickly, and communicate clearly. I build
              scalable, user-focused web applications using React, Next.js,
              Python, and MySQL, blending clean, modern design with reliable
              backend logic. Passionate about teamwork, continuous learning, and
              creating solutions that make a real impact.
            </p>

            {/* -----------------------------------------------------
                ✨ Call-to-Action Buttons
                Two main CTAs: “View My Work” and “Let’s Talk”
                Styled with Tailwind hover animations.
            ----------------------------------------------------- */}
            <div className="flex flex-wrap gap-4 mb-8">
              <button className="px-8 py-4 bg-zinc-900 text-white rounded-2xl hover:bg-zinc-800 hover:shadow-xl hover:-translate-y-1 transition-all duration-200">
                View My Work
              </button>
              <button className="px-8 py-4 border-2 border-zinc-900 text-zinc-900 rounded-2xl hover:bg-zinc-900 hover:text-white transition-all duration-200">
                Let&apos;s Talk
              </button>
            </div>

            {/* -----------------------------------------------------
                🔗 Social Links
                Each icon is wrapped in a styled button-like anchor.
                Hover: dark background + lift animation.
            ----------------------------------------------------- */}
            <div className="flex gap-4">
              {/* GitHub */}
              <a
                href="https://github.com/dayday0calories"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-zinc-100 text-zinc-600 rounded-xl hover:bg-zinc-900 hover:text-white transition-all duration-200 hover:-translate-y-1"
              >
                <Github className="w-6 h-6" />
              </a>

              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com/in/rain-yu-627931287/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-zinc-100 text-zinc-600 rounded-xl hover:bg-zinc-900 hover:text-white transition-all duration-200 hover:-translate-y-1"
              >
                <Linkedin className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
