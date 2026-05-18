import {
  CheckCircle2,
  Loader2,
  AlertTriangle,
} from "lucide-react";

interface Props {
  status: string;
}

export default function LeadStatusBadge({
  status,
}: Props) {

  if (status === "COMPLETED") {
    return (
      <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/10 bg-emerald-500/10 px-4 py-2 text-sm font-medium text-emerald-300">

        <CheckCircle2 className="h-4 w-4" />

        Completed

      </div>
    );
  }

  if (status === "FAILED") {
    return (
      <div className="inline-flex items-center gap-2 rounded-full border border-red-500/10 bg-red-500/10 px-4 py-2 text-sm font-medium text-red-300">

        <AlertTriangle className="h-4 w-4" />

        Failed

      </div>
    );
  }

  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/10 bg-cyan-500/10 px-4 py-2 text-sm font-medium text-cyan-300">

      <Loader2 className="h-4 w-4 animate-spin" />

      Processing

    </div>
  );
}