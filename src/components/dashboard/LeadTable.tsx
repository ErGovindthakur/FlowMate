import Link from "next/link";
import RetryButton from "./RetryButton";
import ResendButton from "./ResendButton";
import { Download, FileText } from "lucide-react";

import LeadStatusBadge from "./LeadStatusBadge";

interface Props {
  leads: any[];
}

export default function LeadTable({ leads }: Props) {
  return (
    <div className="overflow-hidden rounded-[32px] border border-white/10 bg-white/[0.03] backdrop-blur-2xl">
      {/* Header */}
      <div className="flex flex-col gap-5 border-b border-white/10 p-6 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight text-white">
            Automation Leads
          </h2>

          <p className="mt-2 text-sm text-white/45">
            Monitor generated reports, AI automation status, and workflow
            activity.
          </p>
        </div>

        <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white/60">
          <div className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
          Live Updates Enabled
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="border-b border-white/10 bg-white/[0.02]">
            <tr className="text-left text-sm text-white/50">
              <th className="p-5 font-medium">Company</th>

              <th className="p-5 font-medium">Status</th>

              <th className="p-5 font-medium">Created</th>

              <th className="p-5 font-medium">Report</th>

              <th className="p-4">Actions</th>
            </tr>
          </thead>

          <tbody>
            {leads.map((lead) => (
              <tr
                key={lead.id}
                className="border-b border-white/5 transition-all duration-300 hover:bg-white/[0.03]"
              >
                {/* Company */}
                <td className="p-5">
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-500/10 text-violet-300">
                      <FileText className="h-5 w-5" />
                    </div>

                    <div>
                      <p className="font-medium text-white">
                        {lead.companyName}
                      </p>

                      <p className="mt-1 text-sm text-white/45">{lead.email}</p>
                    </div>
                  </div>
                </td>

                {/* Status */}
                <td className="p-5">
                  <LeadStatusBadge status={lead.status} />
                </td>

                {/* Created */}
                <td className="p-5 text-sm text-white/45">
                  {new Date(lead.createdAt).toLocaleDateString()}
                </td>

                {/* PDF */}
                <td className="p-5">
                  {lead.pdfPath ? (
                    <Link
                      href={`${lead.pdfPath}`}
                      className="inline-flex items-center gap-2 rounded-xl border border-cyan-500/10 bg-cyan-500/10 px-4 py-2 text-sm font-medium text-cyan-300 transition-all duration-300 hover:bg-cyan-500/20"
                    >
                      <Download className="h-4 w-4" />
                      Download
                    </Link>
                  ) : (
                    <div className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-white/40">
                      Processing
                    </div>
                  )}
                </td>


                <td className="p-4">
                  <div className="flex gap-2">
                    {lead.status === "FAILED" && (
                      <RetryButton leadId={lead.id} />
                    )}

                    {lead.status === "COMPLETED" && (
                      <ResendButton leadId={lead.id} />
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
