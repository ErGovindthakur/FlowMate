"use client";

import { useState } from "react";

import { toast } from "sonner";

interface Props {
  leadId: string;
}

export default function ResendButton({
  leadId,
}: Props) {

  const [loading, setLoading] =
    useState(false);

  async function handleResend() {

    try {

      setLoading(true);

      const response =
        await fetch(
          "/api/resend-report",
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify({
              leadId,
            }),
          }
        );

      const result =
        await response.json();

      if (!result.success) {
        throw new Error(
          result.message
        );
      }

      toast.success(
        "Report resent successfully"
      );

    } catch (error: unknown) {

      toast.error(
        error instanceof Error
          ? error.message
          : "Resend failed"
      );

    } finally {

      setLoading(false);

    }
  }

  return (
    <button
      onClick={handleResend}
      disabled={loading}
      className="rounded-lg bg-black px-4 py-2 text-sm text-white disabled:opacity-50"
    >
      {loading
        ? "Sending..."
        : "Resend"}
    </button>
  );
}