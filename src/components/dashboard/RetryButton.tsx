"use client";

import { useState } from "react";

import { toast } from "sonner";

import { RotateCw } from "lucide-react";

import axios from "axios";

import { useRouter } from "next/navigation";

interface Props {
  leadId: string;
}

export default function RetryButton({
  leadId,
}: Props) {

  const [loading, setLoading] =
    useState(false);

  const router = useRouter();

  async function handleRetry() {

    if (loading) return;

    try {

      setLoading(true);

      const response = await axios.post(
        "/api/retry-automation",
        {
          leadId,
        }
      );

      const result = response.data;

      if (!result.success) {
        throw new Error(
          result.message
        );
      }

      toast.success(
        "Automation retry started"
      );

      router.refresh();

    } catch (error: any) {

      toast.error(
        error.message ||
          "Retry failed"
      );

    } finally {

      setLoading(false);

    }
  }

  return (
    <button
      onClick={handleRetry}
      disabled={loading}
      className="group relative inline-flex items-center gap-2 overflow-hidden rounded-xl border border-amber-500/10 bg-amber-500/10 px-4 py-2 text-sm font-medium text-amber-300 transition-all duration-300 hover:-translate-y-0.5 hover:bg-amber-500/20 hover:shadow-[0_0_30px_rgba(245,158,11,0.15)] disabled:cursor-not-allowed disabled:opacity-50"
    >

      {/* Glow Layer */}
      <div className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-amber-400/5" />

      {/* Content */}
      <div className="relative flex items-center gap-2">

        <RotateCw
          className={`h-4 w-4 ${
            loading
              ? "animate-spin"
              : ""
          }`}
        />

        {loading
          ? "Reprocessing..."
          : "Retry Automation"}

      </div>

    </button>
  );
}