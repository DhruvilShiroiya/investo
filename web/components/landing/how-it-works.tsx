import { howItWorksData } from "@/lib/landing";
import SectionTitle from "./section-title";

const HowItWorksSection = () => {
  return (
    <section className="bg-white py-24">
      <div className="container mx-auto px-6">
        <SectionTitle
          title="How Investo Analyzes Correlations"
          subtitle="Simple, secure, and focused on decoding stocks–metals relationships."
        />
        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {howItWorksData.map((step, idx) => (
            <div
              key={idx}
              className="rounded-2xl bg-gray-50 shadow-sm ring-1 ring-gray-100 p-8 hover:shadow-md transition-shadow"
            >
              <div className="flex justify-center text-blue-600">{step.icon}</div>
              <h3 className="mt-4 text-xl font-semibold tracking-tight text-gray-900">
                {step.title}
              </h3>
              <p className="mt-2 leading-relaxed text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
