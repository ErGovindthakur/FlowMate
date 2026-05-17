"use client";

import {
  Sparkles,
  Building2,
  BrainCircuit,
  FileText,
  Mail,
  ArrowRight,
  X,
  CheckCircle2,
} from "lucide-react";

import { useEffect, useState } from "react";

export default function FirstTimeExperience() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const seen = localStorage.getItem(
      "ai-onboarding-seen"
    );

    if (!seen) {
      const timer = setTimeout(() => {
        setOpen(true);
      }, 600);

      return () => clearTimeout(timer);
    }
  }, []);

  function handleClose() {
    localStorage.setItem(
      "ai-onboarding-seen",
      "true"
    );

    setOpen(false);
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden p-6">

      {/* Background Blur */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-md" />

      {/* Gradient Orbs */}
      <div className="absolute left-[-10%] top-[-10%] h-[400px] w-[400px] rounded-full bg-violet-600/20 blur-3xl" />

      <div className="absolute bottom-[-10%] right-[-10%] h-[400px] w-[400px] rounded-full bg-cyan-500/20 blur-3xl" />

      {/* Card */}
      <div className="relative w-full max-w-2xl overflow-hidden rounded-[36px] border border-white/10 bg-[#0B0B0F]/90 p-8 shadow-[0_0_100px_rgba(139,92,246,0.25)] backdrop-blur-2xl animate-in fade-in zoom-in-95 duration-500">

        {/* Glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(139,92,246,0.18),transparent_35%)]" />

        {/* Border Glow */}
        <div className="absolute inset-0 rounded-[36px] border border-white/10" />

        <div className="relative z-10">

          {/* Top */}
          <div className="mb-8 flex items-start justify-between">

            <div>

              {/* Badge */}
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/10 px-4 py-2 text-sm font-medium text-violet-300">

                <Sparkles className="h-4 w-4" />

                AI Automation Platform

              </div>

              {/* Heading */}
              <h1 className="max-w-xl bg-gradient-to-b from-white to-white/70 bg-clip-text text-4xl font-semibold tracking-tight text-transparent">

                Welcome to AI Business Intelligence

              </h1>

              {/* Subtitle */}
              <p className="mt-4 max-w-lg text-base leading-7 text-white/55">

                Analyze companies, generate AI insights,
                create executive PDF reports, and automate
                outreach workflows in seconds.

              </p>

            </div>

            {/* Close */}
            <button
              onClick={handleClose}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-white/50 transition-all duration-300 hover:bg-white/[0.06] hover:text-white"
            >
              <X className="h-4 w-4" />
            </button>

          </div>

          {/* Workflow */}
          <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-4">

            {/* Step 1 */}
            <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition-all duration-300 hover:-translate-y-1 hover:bg-white/[0.05]">

              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-500/10 text-violet-300">
                <Building2 className="h-5 w-5" />
              </div>

              <h3 className="mb-2 text-sm font-semibold text-white">
                Company Input
              </h3>

              <p className="text-sm leading-6 text-white/45">
                Enter business details and website.
              </p>

            </div>

            {/* Step 2 */}
            <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition-all duration-300 hover:-translate-y-1 hover:bg-white/[0.05]">

              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-500/10 text-cyan-300">
                <BrainCircuit className="h-5 w-5" />
              </div>

              <h3 className="mb-2 text-sm font-semibold text-white">
                AI Analysis
              </h3>

              <p className="text-sm leading-6 text-white/45">
                AI processes and analyzes the business.
              </p>

            </div>

            {/* Step 3 */}
            <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition-all duration-300 hover:-translate-y-1 hover:bg-white/[0.05]">

              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-500/10 text-orange-300">
                <FileText className="h-5 w-5" />
              </div>

              <h3 className="mb-2 text-sm font-semibold text-white">
                PDF Report
              </h3>

              <p className="text-sm leading-6 text-white/45">
                Executive business report is generated.
              </p>

            </div>

            {/* Step 4 */}
            <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition-all duration-300 hover:-translate-y-1 hover:bg-white/[0.05]">

              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-300">
                <Mail className="h-5 w-5" />
              </div>

              <h3 className="mb-2 text-sm font-semibold text-white">
                Automation
              </h3>

              <p className="text-sm leading-6 text-white/45">
                AI email outreach is automatically sent.
              </p>

            </div>

          </div>

          {/* Bottom */}
          <div className="flex flex-col gap-5 rounded-3xl border border-white/10 bg-white/[0.02] p-6 md:flex-row md:items-center md:justify-between">

            {/* Left */}
            <div>

              <div className="mb-2 flex items-center gap-2 text-sm font-medium text-emerald-300">

                <div className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />

                AI System Ready

              </div>

              <p className="max-w-md text-sm leading-6 text-white/45">

                Most reports are generated within
                20–30 seconds using automated AI workflows.

              </p>

            </div>

            {/* CTA */}
            <button
              onClick={handleClose}
              className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-2xl border border-violet-500/20 bg-gradient-to-r from-violet-600 to-indigo-500 px-6 py-4 text-sm font-semibold text-white shadow-[0_0_40px_rgba(139,92,246,0.35)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_60px_rgba(139,92,246,0.55)]"
            >

              <div className="absolute inset-0 bg-white/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

              <div className="relative flex items-center gap-2">

                Start Automation

                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />

              </div>

            </button>

          </div>

          {/* Feature Indicators */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-sm text-white/40">

            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-400" />
              AI Insights
            </div>

            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-400" />
              PDF Reports
            </div>

            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-400" />
              Email Automation
            </div>

            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-400" />
              AI Workflows
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}