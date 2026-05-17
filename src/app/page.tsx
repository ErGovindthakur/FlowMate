import FirstTimeExperience from "@/components/FirstTimeExperience";
import LeadForm from "@/components/forms/LeadForm";

export default function HomePage() {
  return (
    <main className="mx-auto max-w-3xl p-10">
      <FirstTimeExperience />
      <LeadForm />
    </main>
  );
}