"use client";
/**
 * 💼 ProjectsSection Component
 * ----------------------------
 * Displays a grid of your featured projects (case studies, apps, dashboards, etc.)
 *
 * ✅ Purpose:
 *   - Visually present project cards with hover animations and tag chips.
 *   - Uses IntersectionObserver to tell the global navigation bar which section
 *     is currently visible, so the correct nav link is highlighted.
 *   - Cards are built using shared UI primitives: <Card>, <Tag>, and <ImageWithFallback>.
 *
 * 🧩 Technologies Used:
 *   - React (hooks for scroll detection)
 *   - Lucide-react (icons)
 *   - TailwindCSS (layout, animation, styling)
 *   - IntersectionObserver API
 */

import { useEffect, useRef } from "react";
import { ExternalLink, Github } from "lucide-react"; // Icons for buttons
import { ImageWithFallback } from "./ImageWithFallback"; // Optimized Next.js image with fallback support
import { Card } from "./Card"; // Generic UI card container
import { Tag } from "./Tag"; // Reusable label/tag chip component

// -----------------------------------------------------
// 🔸 Props Definition
// -----------------------------------------------------
interface ProjectsSectionProps {
  id: string; // Section ID for anchors and nav sync
  setActiveSection: (section: string) => void; // Callback to update active section in global nav
}

// -----------------------------------------------------
// 🔸 Component Definition
// -----------------------------------------------------
export function ProjectsSection({
  id,
  setActiveSection,
}: ProjectsSectionProps) {
  const sectionRef = useRef<HTMLElement>(null); // DOM reference for intersection observer

  // -----------------------------------------------------
  // 🔸 Scroll-based Navigation Highlight Logic
  // -----------------------------------------------------
  useEffect(() => {
    // This observer checks when this section becomes visible in the viewport
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          // If at least 30% of the section is visible, mark it as active in the nav
          setActiveSection(id);
        }
      },
      { threshold: 0.3 } // 30% visibility threshold
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    // Cleanup on unmount
    return () => observer.disconnect();
  }, [id, setActiveSection]);

  // -----------------------------------------------------
  // 🔸 Project Showcase Data (Static)
  // -----------------------------------------------------
  // In production, you could fetch this from an API or CMS.
  const projects = [
    {
      title: "E-Commerce Platform",
      description:
        "A full-featured e-commerce platform built with React, TypeScript, and Stripe integration.",
      tags: ["React", "TypeScript", "Stripe"],
      image:
        "https://images.unsplash.com/photo-1557821552-17105176677c?w=800&h=600&fit=crop",
    },
    {
      title: "Task Management App",
      description:
        "Collaborative task manager with real-time updates and team features.",
      tags: ["React", "WebSocket", "Tailwind"],
      image:
        "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=600&fit=crop",
    },
    {
      title: "Analytics Dashboard",
      description:
        "Data visualization dashboard with interactive charts and real-time metrics.",
      tags: ["React", "Recharts", "Next.js"],
      image:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
    },
    {
      title: "Social Media App",
      description:
        "Modern social platform with posts, comments, and user profiles.",
      tags: ["React", "Redux", "Firebase"],
      image:
        "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&h=600&fit=crop",
    },
  ];

  // -----------------------------------------------------
  // 🔸 Render Layout
  // -----------------------------------------------------
  return (
    <section
      id={id}
      ref={sectionRef}
      className="min-h-screen py-20 px-6 md:px-12 bg-white"
    >
      {/* Outer container centers the content and limits width */}
      <div className="max-w-6xl mx-auto">
        {/* -----------------------------------------------
            📘 Section Header
            Includes a small badge, a heading, and a subtitle.
        ----------------------------------------------- */}
        <div className="mb-16">
          <span className="inline-block px-4 py-2 bg-zinc-900 text-white rounded-full mb-4">
            Portfolio
          </span>
          <h2 className="text-zinc-900 mb-4">Featured Projects</h2>
          <p className="text-zinc-600 max-w-2xl text-lg">
            A selection of projects that showcase my React development skills
          </p>
        </div>

        {/* -----------------------------------------------
            🧱 Projects Grid
            Displays cards in a responsive 2-column grid on medium+ screens.
        ----------------------------------------------- */}
        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <Card
              key={index}
              className="bg-zinc-50 overflow-hidden hover:shadow-2xl"
            >
              {/* -----------------------------------------------
                  🖼️ Project Image Banner
                  The top part of the card shows a cover image with overlay effects.
              ----------------------------------------------- */}
              <div className="relative h-56 bg-zinc-200 overflow-hidden">
                {/* Image scales up slightly when hovered (group-hover) */}
                <ImageWithFallback
                  src={project.image}
                  alt={project.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                {/* Gradient overlay fades in on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>

              {/* -----------------------------------------------
                  📄 Card Body
                  Contains title, description, tech tags, and buttons.
              ----------------------------------------------- */}
              <div className="p-8 bg-white">
                {/* Title & Description */}
                <h3 className="text-zinc-900 mb-3">{project.title}</h3>
                <p className="text-zinc-600 mb-6">{project.description}</p>

                {/* 🏷️ Tag Chips */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.map((tag, tagIndex) => (
                    <Tag key={tagIndex}>{tag}</Tag>
                  ))}
                </div>

                {/* -----------------------------------------------
                    🔗 Action Buttons
                    “Code” links to GitHub repo, “Live Demo” opens the deployed app.
                ----------------------------------------------- */}
                <div className="flex gap-4">
                  {/* GitHub Link */}
                  <a
                    href="#"
                    className="flex items-center gap-2 px-4 py-2 bg-zinc-900 text-white rounded-xl hover:bg-zinc-800 transition-all"
                  >
                    <Github className="w-4 h-4" />
                    <span className="text-sm">Code</span>
                  </a>

                  {/* Live Demo Link */}
                  <a
                    href="#"
                    className="flex items-center gap-2 px-4 py-2 border-2 border-zinc-900 text-zinc-900 rounded-xl hover:bg-zinc-900 hover:text-white transition-all"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span className="text-sm">Live Demo</span>
                  </a>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
