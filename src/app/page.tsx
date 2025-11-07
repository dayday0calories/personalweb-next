"use client";

/**
 * Top-level landing page that orchestrates the sidebar navigation and stacked
 * hero/skills/projects/contact sections, keeping their active state in sync.
 */
import { useState } from "react";
import { LeftNav } from "../components/LeftNav";
import { HeroSection } from "../components/HeroSection";
import { SkillsSection } from "../components/SkillsSection";
import { ProjectsSection } from "../components/ProjectsSection";
import { ContactSection } from "../components/ContactSection";

export default function App() {
  const [activeSection, setActiveSection] = useState("home");

  return (
    <div className="flex min-h-screen bg-zinc-50">
      {/* Left Navigation */}
      <LeftNav
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />

      {/* Main Content */}
      <main className="flex-1 ml-0 md:ml-64">
        <HeroSection id="home" setActiveSection={setActiveSection} />
        <SkillsSection id="skills" setActiveSection={setActiveSection} />
        <ProjectsSection id="projects" setActiveSection={setActiveSection} />
        <ContactSection id="contact" setActiveSection={setActiveSection} />
      </main>
    </div>
  );
}
