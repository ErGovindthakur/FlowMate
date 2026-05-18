import {
  // BrainCircuit,
  Loader2,
  Sparkles,
} from "lucide-react";

export default function Loading() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-black text-white">

      {/* Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:80px_80px]" />

      {/* Gradient Orbs */}
      <div className="absolute left-[-10%] top-[-10%] h-[400px] w-[400px] rounded-full bg-violet-600/20 blur-3xl" />

      <div className="absolute bottom-[-10%] right-[-10%] h-[400px] w-[400px] rounded-full bg-cyan-500/20 blur-3xl" />

      <div className="relative z-10 p-8">

        {/* Header */}
        <div className="mb-10 flex items-center justify-between">

          <div>

            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/10 px-4 py-2 text-sm font-medium text-violet-300">

              <Sparkles className="h-4 w-4" />

              AI Dashboard

            </div>

            <h1 className="bg-gradient-to-b from-white to-white/70 bg-clip-text text-4xl font-semibold tracking-tight text-transparent">

              Initializing Workspace

            </h1>

            <p className="mt-3 text-white/45">
              Preparing business intelligence system...
            </p>

          </div>

          {/* Loader */}
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03]">

            <Loader2 className="h-6 w-6 animate-spin text-violet-400" />

          </div>

        </div>

        {/* Stats Skeleton */}
        <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-4">

          {[1, 2, 3, 4].map((item) => (
            <div
              key={item}
              className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl"
            >

              <div className="mb-5 h-10 w-10 animate-pulse rounded-2xl bg-white/10" />

              <div className="mb-3 h-4 w-24 animate-pulse rounded-full bg-white/10" />

              <div className="h-8 w-20 animate-pulse rounded-full bg-white/10" />

            </div>
          ))}

        </div>

        {/* Table Skeleton */}
        <div className="overflow-hidden rounded-[32px] border border-white/10 bg-white/[0.03] backdrop-blur-xl">

          {/* Table Header */}
          <div className="flex items-center justify-between border-b border-white/10 p-6">

            <div>

              <div className="mb-3 h-5 w-40 animate-pulse rounded-full bg-white/10" />

              <div className="h-4 w-64 animate-pulse rounded-full bg-white/10" />

            </div>

            <div className="h-10 w-28 animate-pulse rounded-2xl bg-white/10" />

          </div>

          {/* Rows */}
          <div className="divide-y divide-white/5">

            {[1, 2, 3, 4, 5].map((row) => (
              <div
                key={row}
                className="grid grid-cols-5 gap-4 p-6"
              >

                <div className="h-4 animate-pulse rounded-full bg-white/10" />

                <div className="h-4 animate-pulse rounded-full bg-white/10" />

                <div className="h-4 animate-pulse rounded-full bg-white/10" />

                <div className="h-4 animate-pulse rounded-full bg-white/10" />

                <div className="h-4 animate-pulse rounded-full bg-white/10" />

              </div>
            ))}

          </div>

        </div>

        {/* Bottom Status */}
        <div className="mt-8 flex items-center gap-3 rounded-2xl border border-emerald-500/10 bg-emerald-500/5 px-5 py-4 text-sm text-emerald-300 backdrop-blur-xl">

          <div className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />

          AI systems are syncing analytics and lead data

        </div>

      </div>
    </div>
  );
}