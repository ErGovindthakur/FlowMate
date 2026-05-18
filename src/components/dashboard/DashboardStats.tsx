import {
  Activity,
  CheckCircle2,
  AlertTriangle,
  Loader2,
} from "lucide-react";

interface Props {
  leads: any[];
}

export default function DashboardStats({
  leads,
}: Props) {

  const completed =
    leads.filter(
      (lead) =>
        lead.status === "COMPLETED"
    ).length;

  const failed =
    leads.filter(
      (lead) =>
        lead.status === "FAILED"
    ).length;

  const processing =
    leads.filter(
      (lead) =>
        ![
          "COMPLETED",
          "FAILED",
        ].includes(lead.status)
    ).length;

  const stats = [
    {
      title: "Total Leads",
      value: leads.length,
      icon: Activity,
      color:
        "from-violet-500/20 to-violet-500/5",
      iconColor: "text-violet-300",
      border:
        "border-violet-500/10",
    },
    {
      title: "Completed",
      value: completed,
      icon: CheckCircle2,
      color:
        "from-emerald-500/20 to-emerald-500/5",
      iconColor: "text-emerald-300",
      border:
        "border-emerald-500/10",
    },
    {
      title: "Processing",
      value: processing,
      icon: Loader2,
      color:
        "from-cyan-500/20 to-cyan-500/5",
      iconColor: "text-cyan-300",
      border:
        "border-cyan-500/10",
    },
    {
      title: "Failed",
      value: failed,
      icon: AlertTriangle,
      color:
        "from-red-500/20 to-red-500/5",
      iconColor: "text-red-300",
      border:
        "border-red-500/10",
    },
  ];

  return (
    <div className="mb-10 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">

      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <div
            key={stat.title}
            className={`group relative overflow-hidden rounded-[28px] border ${stat.border} bg-white/[0.03] p-6 backdrop-blur-2xl transition-all duration-300 hover:-translate-y-1 hover:bg-white/[0.05]`}
          >

            {/* Glow */}
            <div
              className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-60`}
            />

            <div className="relative z-10">

              {/* Icon */}
              <div
                className={`mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/[0.04] ${stat.iconColor}`}
              >

                <Icon
                  className={`h-6 w-6 ${
                    stat.title ===
                    "Processing"
                      ? "animate-spin"
                      : ""
                  }`}
                />

              </div>

              {/* Title */}
              <p className="text-sm font-medium text-white/50">
                {stat.title}
              </p>

              {/* Value */}
              <h2 className="mt-3 text-4xl font-semibold tracking-tight text-white">

                {stat.value}

              </h2>

            </div>

          </div>
        );
      })}

    </div>
  );
}