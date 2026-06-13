export const dynamic = "force-dynamic";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import LeadTable from "@/components/dashboard/LeadTable";

import DashboardStats from "@/components/dashboard/DashboardStats";

import { Sparkles, BrainCircuit } from "lucide-react";

export default async function DashboardPage() {
  const leads = await prisma.lead.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
  // console.log("DASHBOARD LEADS:", leads);
  return (
    <main className="relative min-h-screen overflow-hidden bg-black text-white">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:80px_80px]" />

      {/* Gradient Orbs */}
      <div className="absolute left-[-10%] top-[-10%] h-[500px] w-[500px] rounded-full bg-violet-600/20 blur-3xl" />

      <div className="absolute bottom-[-10%] right-[-10%] h-[500px] w-[500px] rounded-full bg-cyan-500/20 blur-3xl" />

      <div className="relative z-10 p-8 md:p-10">
        {/* Header */}
        <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/10 px-4 py-2 text-sm font-medium text-violet-300">
              <Sparkles className="h-4 w-4" />
              AI Automation Dashboard
            </div>

            <h1 className="bg-gradient-to-b from-white to-white/70 bg-clip-text text-5xl font-semibold tracking-tight text-transparent">
              Business Intelligence Center
            </h1>

            <p className="mt-4 max-w-2xl text-base leading-7 text-white/45">
              Monitor AI workflows, automation status, PDF generation, and lead
              intelligence from a unified dashboard.
            </p>
          </div>

          {/* Live Status */}
          <div className="flex items-center gap-3 rounded-2xl border border-emerald-500/10 bg-emerald-500/5 px-5 py-4 backdrop-blur-xl">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-300">
              <BrainCircuit className="h-5 w-5" />
            </div>

            <div>
              <p className="text-sm font-medium text-emerald-300">
                AI Systems Active
              </p>

              <p className="text-sm text-white/45">
                Automation engine operational
              </p>
            </div>

            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-2xl border border-violet-500/20 bg-violet-500/10 px-5 py-4 text-sm font-medium text-violet-300 transition hover:bg-violet-500/20"
            >
              <Sparkles className="h-4 w-4" />
              Generate Another Report
            </Link>
          </div>
        </div>

        {/* Stats */}
        <DashboardStats leads={leads} />

        {/* Table */}
        <LeadTable leads={leads} />
      </div>
    </main>
  );
}
