"use client";
/**
 * 💌 ContactSection Component
 * ---------------------------
 * A fully responsive “Contact” area placed at the bottom of your portfolio.
 *
 * ✅ Purpose:
 *   - Displays contact information and a form visitors can fill out.
 *   - Uses IntersectionObserver to sync scroll position with navigation highlights.
 *   - Manages all form input values via React’s controlled component pattern.
 *
 * 🧩 Technologies Used:
 *   - React hooks (useRef, useState, useEffect)
 *   - Lucide-react icons (for Mail, MapPin, Send)
 *   - TailwindCSS (for responsive layout and animations)
 */

import type React from "react";
import { useEffect, useRef, useState } from "react";
import { Mail, MapPin, Send } from "lucide-react"; // icons

// -----------------------------------------------------
// 🔸 Props Definition
// -----------------------------------------------------
interface ContactSectionProps {
  id: string; // section ID (used for scroll anchors)
  setActiveSection: (section: string) => void; // callback to update nav highlight
}

// -----------------------------------------------------
// 🔸 Component Definition
// -----------------------------------------------------
export function ContactSection({ id, setActiveSection }: ContactSectionProps) {
  // Reference to the section element for intersection observation
  const sectionRef = useRef<HTMLElement>(null);

  // React state object for form data
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle"
  );
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);

  // -----------------------------------------------------
  // 📡 Intersection Observer
  // -----------------------------------------------------
  useEffect(() => {
    /**
     * Observes when this contact section becomes visible in the viewport.
     * When visible, notifies the global nav to highlight the "Contact" link.
     */
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setActiveSection(id);
        }
      },
      { threshold: 0.3 } // trigger when 30% of section is visible
    );

    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => observer.disconnect();
  }, [id, setActiveSection]);

  // -----------------------------------------------------
  // ✉️ Form Handlers
  // -----------------------------------------------------

  // Submit handler: send payload to Next.js API route
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");
    setFeedbackMessage(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const data = (await response.json().catch(() => null)) as
          | { error?: string }
          | null;
        throw new Error(data?.error ?? "Failed to send your message.");
      }

      setStatus("success");
      setFeedbackMessage("Thanks for reaching out! I’ll respond shortly.");
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      setStatus("error");
      setFeedbackMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again."
      );
    }
  };

  // Input change handler: updates individual fields
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData, // copy existing state
      [e.target.name]: e.target.value, // dynamically update key
    });
  };

  // -----------------------------------------------------
  // 🎨 Render Layout
  // -----------------------------------------------------
  return (
    <section
      id={id}
      ref={sectionRef}
      className="min-h-screen py-20 px-6 md:px-12 bg-zinc-50 relative overflow-hidden"
    >
      {/* =======================================================
          🎨 Decorative Background Circles
          Adds subtle visual depth and motionless backdrop.
      ======================================================== */}
      <div className="absolute top-20 right-20 w-64 h-64 bg-zinc-200 rounded-full opacity-40 blur-3xl"></div>
      <div className="absolute bottom-20 left-20 w-80 h-80 bg-zinc-300 rounded-full opacity-40 blur-3xl"></div>

      {/* =======================================================
          📦 Main Content Container
          Restricts content width and centers everything.
      ======================================================== */}
      <div className="max-w-6xl mx-auto relative z-10">
        {/* -----------------------------------------------
            🏷️ Section Header
            Title badge and subheading introducing the section.
        ----------------------------------------------- */}
        <div className="mb-16 text-center">
          <span className="inline-block px-4 py-2 bg-zinc-900 text-white rounded-full mb-4">
            Let&apos;s Connect
          </span>
          <p className="text-zinc-600 max-w-2xl mx-auto text-lg">
            Let&apos;s work together to create something amazing
          </p>
        </div>

        {/* -----------------------------------------------
            🧱 Grid Layout
            Two columns: Contact Info (left) and Form (right)
            On mobile, stacks vertically.
        ----------------------------------------------- */}
        <div className="grid md:grid-cols-2 gap-12">
          {/* =======================================================
              📫 Contact Information Column
          ======================================================== */}
          <div>
            <div className="space-y-6 mb-8">
              {/* Email Block */}
              <div className="flex items-start gap-4 group">
                {/* Icon bubble */}
                <div className="p-4 bg-zinc-900 rounded-2xl group-hover:scale-110 transition-transform">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                {/* Text */}
                <div>
                  <h3 className="text-zinc-900 mb-1">Email</h3>
                  <p className="text-zinc-600">rain.yuxia@outlook.com</p>
                </div>
              </div>

              {/* Location Block */}
              <div className="flex items-start gap-4 group">
                <div className="p-4 bg-zinc-900 rounded-2xl group-hover:scale-110 transition-transform">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-zinc-900 mb-1">Location</h3>
                  <p className="text-zinc-600">Perth, Australia</p>
                </div>
              </div>
            </div>

            {/* -----------------------------------------------
                💬 “About Collaboration” Card
                Encourages potential clients to reach out.
            ----------------------------------------------- */}
            <div className="p-8 bg-white rounded-3xl border-2 border-zinc-200 shadow-lg">
              <h3 className="text-zinc-900 mb-3">Let&apos;s create together</h3>
              <p className="text-zinc-600">
                I&apos;m always interested in hearing about new projects and
                opportunities. Whether you have a question or just want to say
                hi, feel free to reach out!
              </p>
            </div>
          </div>

          {/* =======================================================
              📝 Contact Form Column
              Fully controlled form using local React state.
          ======================================================== */}
          <div>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Input */}
              <div>
                <label htmlFor="name" className="block text-zinc-900 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-5 py-4 border-2 border-zinc-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:border-transparent transition-all bg-white"
                  placeholder="Your name"
                  required
                />
              </div>

              {/* Email Input */}
              <div>
                <label htmlFor="email" className="block text-zinc-900 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-5 py-4 border-2 border-zinc-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:border-transparent transition-all bg-white"
                  placeholder="your.email@example.com"
                  required
                />
              </div>

              {/* Message Textarea */}
              <div>
                <label htmlFor="message" className="block text-zinc-900 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  className="w-full px-5 py-4 border-2 border-zinc-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:border-transparent resize-none transition-all bg-white"
                  placeholder="Tell me about your project..."
                  required
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={status === "loading"}
                className={`w-full px-6 py-4 rounded-2xl flex items-center justify-center gap-2 transition-all duration-200 ${
                  status === "loading"
                    ? "bg-zinc-400 text-white cursor-not-allowed"
                    : "bg-zinc-900 text-white hover:bg-zinc-800 hover:shadow-xl hover:-translate-y-1"
                }`}
              >
                <span>
                  {status === "loading" ? "Sending..." : "Send Message"}
                </span>
                <Send className="w-5 h-5" />
              </button>

              {feedbackMessage && (
                <p
                  className={`text-sm ${
                    status === "success" ? "text-emerald-600" : "text-red-600"
                  }`}
                >
                  {feedbackMessage}
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
