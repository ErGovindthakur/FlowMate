import LeadForm from "@/components/forms/LeadForm";

export default function HomePage() {
  return (
    <main className="mx-auto max-w-3xl p-10">
      <div className="mb-8">
        <h1 className="text-4xl font-bold">
          AI Automation System
        </h1>

        <p className="mt-2 text-gray-500">
          Generate AI-powered business reports automatically.
        </p>
      </div>

      <LeadForm />
    </main>
  );
}