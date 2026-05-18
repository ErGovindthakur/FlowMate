"use client";
import { useRouter } from "next/navigation";
import {
  Building2,
  Globe,
  Mail,
  FileText,
  Sparkles,
  Loader2,
  CheckCircle2,
} from "lucide-react";

import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import { toast } from "sonner";

import axios from "axios";

import { createLeadSchema } from "@/modules/lead/lead.schema";

import { useState } from "react";

import { z } from "zod";

type FormData = z.infer<typeof createLeadSchema>;

export default function LeadForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(createLeadSchema),
  });

  const [currentStep, setCurrentStep] = useState("");
  const router = useRouter();
  // async function onSubmit(data: FormData) {
  //   try {
  //     setCurrentStep("Scraping company website...");

  //     await new Promise((resolve) =>
  //       setTimeout(resolve, 800)
  //     );

  //     setCurrentStep("Generating AI insights...");

  //     await new Promise((resolve) =>
  //       setTimeout(resolve, 800)
  //     );

  //     setCurrentStep("Building executive PDF report...");

  //     await new Promise((resolve) =>
  //       setTimeout(resolve, 800)
  //     );

  //     setCurrentStep("Sending automation email...");

  //     const response = await axios.post(
  //       "/api/automate",
  //       data
  //     );

  //     const result = response.data;

  //     if (!result.success) {
  //       throw new Error(result.message);
  //     }

  //     toast.success(
  //       "AI report generated successfully"
  //     );

  //     reset();

  //     setCurrentStep("");
  //     router.push("/dashboard");
  //   } catch (error: any) {
  //     setCurrentStep("");

  //     toast.error(
  //       error.message || "Something went wrong"
  //     );
  //   }
  // }

  async function onSubmit(data: FormData) {
    try {
      setCurrentStep("Scraping company website...");

      await new Promise((resolve) => setTimeout(resolve, 800));

      setCurrentStep("Generating AI insights...");

      await new Promise((resolve) => setTimeout(resolve, 800));

      setCurrentStep("Building executive PDF report...");

      await new Promise((resolve) => setTimeout(resolve, 800));

      setCurrentStep("Sending automation email...");

      const response = await axios.post("/api/automate", data);

      toast.success(response.data.message);

      reset();

      setCurrentStep("");

      router.push("/dashboard");
    } catch (error: unknown) {
      setCurrentStep("");

      let errorMessage = "Something went wrong";

      if (axios.isAxiosError(error)) {
        errorMessage = error.response?.data?.message || error.message;
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }

      toast.error(errorMessage);
    }
  }
  return (
    <div className="relative overflow-hidden rounded-[36px] border border-white/10 bg-white/[0.03] p-10 shadow-[0_0_80px_rgba(139,92,246,0.15)] backdrop-blur-2xl">
      {/* Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(139,92,246,0.15),transparent_35%)]" />

      {/* Border Glow */}
      <div className="absolute inset-0 rounded-[36px] border border-white/10" />

      <div className="relative z-10">
        {/* Badge */}
        <div className="mb-6 flex justify-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/10 px-5 py-2 text-sm font-medium text-violet-300 backdrop-blur-xl">
            <Sparkles className="h-4 w-4" />
            AI Automation Engine
          </div>
        </div>

        {/* Heading */}
        <div className="mb-12 text-center">
          <h1 className="bg-gradient-to-b from-white to-white/70 bg-clip-text text-5xl font-semibold tracking-tight text-transparent">
            AI Business Intelligence
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-white/50">
            Analyze companies, generate AI insights, build executive PDF
            reports, and automate business outreach with AI-powered workflows.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Company */}
          <div>
            <label className="mb-3 flex items-center gap-2 text-sm font-medium text-white/80">
              <Building2 className="h-4 w-4 text-violet-400" />
              Company Name
            </label>

            <input
              {...register("companyName")}
              placeholder="Enter company name"
              className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-4 text-sm text-white placeholder:text-white/30 outline-none transition-all duration-300 focus:border-violet-500/40 focus:bg-white/[0.06] focus:ring-4 focus:ring-violet-500/10"
            />

            {errors.companyName && (
              <p className="mt-2 text-sm text-red-400">
                {errors.companyName.message}
              </p>
            )}
          </div>

          {/* Website */}
          <div>
            <label className="mb-3 flex items-center gap-2 text-sm font-medium text-white/80">
              <Globe className="h-4 w-4 text-cyan-400" />
              Website
            </label>

            <input
              {...register("website")}
              placeholder="https://company.com"
              className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-4 text-sm text-white placeholder:text-white/30 outline-none transition-all duration-300 focus:border-cyan-500/40 focus:bg-white/[0.06] focus:ring-4 focus:ring-cyan-500/10"
            />

            {errors.website && (
              <p className="mt-2 text-sm text-red-400">
                {errors.website.message}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="mb-3 flex items-center gap-2 text-sm font-medium text-white/80">
              <Mail className="h-4 w-4 text-emerald-400" />
              Email
            </label>

            <input
              {...register("email")}
              placeholder="company@email.com"
              className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-4 text-sm text-white placeholder:text-white/30 outline-none transition-all duration-300 focus:border-emerald-500/40 focus:bg-white/[0.06] focus:ring-4 focus:ring-emerald-500/10"
            />

            {errors.email && (
              <p className="mt-2 text-sm text-red-400">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Notes */}
          <div>
            <label className="mb-3 flex items-center gap-2 text-sm font-medium text-white/80">
              <FileText className="h-4 w-4 text-orange-400" />
              Notes
            </label>

            <textarea
              {...register("notes")}
              rows={5}
              placeholder="Additional company notes..."
              className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-4 text-sm text-white placeholder:text-white/30 outline-none transition-all duration-300 focus:border-orange-500/40 focus:bg-white/[0.06] focus:ring-4 focus:ring-orange-500/10"
            />
          </div>

          {/* Status */}
          {currentStep && (
            <div className="flex items-center gap-3 rounded-2xl border border-violet-500/20 bg-violet-500/10 px-5 py-4 text-sm font-medium text-violet-200 backdrop-blur-xl">
              <Loader2 className="h-4 w-4 animate-spin" />

              {currentStep}
            </div>
          )}

          {/* Button */}
          <button
            disabled={isSubmitting}
            className="group relative flex w-full items-center justify-center overflow-hidden rounded-2xl border border-violet-500/20 bg-gradient-to-r from-violet-600 to-indigo-500 px-5 py-4 text-sm font-semibold text-white shadow-[0_0_40px_rgba(139,92,246,0.35)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_60px_rgba(139,92,246,0.55)] disabled:cursor-not-allowed disabled:opacity-50"
          >
            <div className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-white/10" />

            <div className="relative flex items-center gap-2">
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Processing AI Automation...
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4" />
                  Generate AI Report
                </>
              )}
            </div>
          </button>

          {/* Trust Indicators */}
          <div className="grid grid-cols-1 gap-4 pt-6 text-sm text-white/50 sm:grid-cols-3">
            <div className="flex items-center gap-2 rounded-xl border border-white/5 bg-white/[0.03] px-4 py-3">
              <CheckCircle2 className="h-4 w-4 text-emerald-400" />
              AI Insights
            </div>

            <div className="flex items-center gap-2 rounded-xl border border-white/5 bg-white/[0.03] px-4 py-3">
              <CheckCircle2 className="h-4 w-4 text-emerald-400" />
              PDF Reports
            </div>

            <div className="flex items-center gap-2 rounded-xl border border-white/5 bg-white/[0.03] px-4 py-3">
              <CheckCircle2 className="h-4 w-4 text-emerald-400" />
              Email Automation
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
