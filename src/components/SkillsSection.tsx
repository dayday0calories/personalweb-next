"use client";
/**
 * 💡 SkillsSection Component
 * --------------------------
 * A responsive grid that showcases your main skill categories.
 *
 * ✅ Purpose:
 *   - Displays 4 major capability areas (Frontend, Performance, Backend, Design).
 *   - Each area is shown inside a <Card> with a colored icon and list of skill tags.
 *   - Uses the same scroll tracking pattern as other sections to keep
 *     the navigation sidebar updated while scrolling.
 *
 * 🧩 Technologies:
 *   - React hooks (useRef, useEffect)
 *   - IntersectionObserver for scroll awareness
 *   - TailwindCSS for responsive design and color theming
 *   - Reusable UI components: <Card> and <Tag>
 */

import { useEffect, useRef } from "react";
import { Code2, Database, Palette, Zap } from "lucide-react"; // Icon set
import { Card } from "./Card";
import { Tag } from "./Tag";

// -----------------------------------------------------
// 🔸 Props Interface
// -----------------------------------------------------
interface SkillsSectionProps {
  id: string; // section ID (used for scroll anchors & active state)
  setActiveSection: (section: string) => void; // callback to update nav highlight
}

// -----------------------------------------------------
// 🔸 Component Definition
// -----------------------------------------------------
export function SkillsSection({ id, setActiveSection }: SkillsSectionProps) {
  // React ref to directly observe the <section> DOM node
  const sectionRef = useRef<HTMLElement>(null);

  // -----------------------------------------------------
  // 📡 Intersection Observer
  // -----------------------------------------------------
  useEffect(() => {
    /**
     * Watches the section as the user scrolls.
     * When at least 30% of this section enters the viewport,
     * we call setActiveSection() so the sidebar highlights "Skills".
     */
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setActiveSection(id);
        }
      },
      { threshold: 0.3 } // visible threshold
    );

    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => observer.disconnect();
  }, [id, setActiveSection]);

  // -----------------------------------------------------
  // 🧠 Skill Category Data
  // -----------------------------------------------------
  // Each object defines one "skill card" (icon, color, title, and tags).
  const skillCategories = [
    {
      icon: Code2,
      title: "Frontend Development",
      skills: ["React", "TypeScript", "Next.js", "Tailwind CSS"],
      bgColor: "bg-blue-500",
    },
    {
      icon: Zap,
      title: "Performance",
      skills: [
        "React Query",
        "State Management",
        "Code Splitting",
        "Optimization",
      ],
      bgColor: "bg-amber-500",
    },
    {
      icon: Database,
      title: "Backend & Tools",
      skills: ["Node.js", "REST APIs", "GraphQL", "Git"],
      bgColor: "bg-emerald-500",
    },
    {
      icon: Palette,
      title: "Design & UX",
      skills: [
        "Responsive Design",
        "Accessibility",
        "Figma",
        "UI/UX Principles",
      ],
      bgColor: "bg-violet-500",
    },
  ];

  // -----------------------------------------------------
  // 🎨 Render Section
  // -----------------------------------------------------
  return (
    <section
      id={id}
      ref={sectionRef}
      className="min-h-screen py-20 px-6 md:px-12 bg-zinc-50 relative overflow-hidden"
    >
      {/* Outer container limits width & adds internal padding */}
      <div className="max-w-6xl mx-auto relative z-10">
        {/* -----------------------------------------------
            🏷️ Section Header
            Includes a title badge, heading, and subtitle.
        ----------------------------------------------- */}
        <div className="mb-16">
          <span className="inline-block px-4 py-2 bg-zinc-900 text-white rounded-full mb-4">
            What I Do
          </span>
          <h2 className="text-zinc-900 mb-4">Skills & Expertise</h2>
          <p className="text-zinc-600 max-w-2xl text-lg">
            A comprehensive toolkit for building modern web applications
          </p>
        </div>

        {/* -----------------------------------------------
            🧱 Skill Cards Grid
            Two columns on desktop, single column on mobile.
        ----------------------------------------------- */}
        <div className="grid md:grid-cols-2 gap-6">
          {skillCategories.map((category, index) => {
            const Icon = category.icon; // pull the icon component dynamically

            return (
              <Card key={index} className="p-8">
                {/* -----------------------------------------------
                    🔹 Icon Header
                    Colored background circle with a skill category icon.
                ----------------------------------------------- */}
                <div
                  className={`inline-flex p-4 rounded-2xl ${category.bgColor} mb-6 group-hover:scale-110 transition-transform duration-300`}
                >
                  <Icon className="w-7 h-7 text-white" />
                </div>

                {/* -----------------------------------------------
                    🔸 Category Title
                ----------------------------------------------- */}
                <h3 className="text-zinc-900 mb-6">{category.title}</h3>

                {/* -----------------------------------------------
                    🏷️ Skill Tags
                    Each skill gets its own <Tag> pill component.
                ----------------------------------------------- */}
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill, skillIndex) => (
                    <Tag key={skillIndex} size="md" interactive>
                      {skill}
                    </Tag>
                  ))}
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
