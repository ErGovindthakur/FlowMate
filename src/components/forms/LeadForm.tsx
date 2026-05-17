"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import axios from "axios";
import { createLeadSchema } from "@/modules/lead/lead.schema";

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

  async function onSubmit(data: FormData) {
  try {
    const response = await axios.post("/api/automate", data);

    const result = response.data;

    if (!result.success) {
      throw new Error(result.message);
    }

    toast.success("Lead submitted successfully");

    reset();
  } catch (error: any) {
    toast.error(error.message || "Something went wrong");
  }
}

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-5 rounded-2xl border p-6 shadow-sm"
    >
      <div>
        <label className="mb-2 block text-sm font-medium">
          Company Name
        </label>

        <input
          {...register("companyName")}
          className="w-full rounded-lg border p-3 outline-none"
          placeholder="Enter company name"
        />

        {errors.companyName && (
          <p className="mt-1 text-sm text-red-500">
            {errors.companyName.message}
          </p>
        )}
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium">
          Website
        </label>

        <input
          {...register("website")}
          className="w-full rounded-lg border p-3 outline-none"
          placeholder="https://company.com"
        />

        {errors.website && (
          <p className="mt-1 text-sm text-red-500">
            {errors.website.message}
          </p>
        )}
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium">
          Email
        </label>

        <input
          {...register("email")}
          className="w-full rounded-lg border p-3 outline-none"
          placeholder="company@email.com"
        />

        {errors.email && (
          <p className="mt-1 text-sm text-red-500">
            {errors.email.message}
          </p>
        )}
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium">
          Notes
        </label>

        <textarea
          {...register("notes")}
          className="w-full rounded-lg border p-3 outline-none"
          placeholder="Additional notes..."
        />
      </div>

      <button
        disabled={isSubmitting}
        className="w-full rounded-lg bg-black p-3 text-white transition hover:opacity-90 disabled:opacity-50"
      >
        {isSubmitting ? "Submitting..." : "Submit Lead"}
      </button>
    </form>
  );
}