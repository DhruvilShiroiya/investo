import { featuresData } from "@/lib/landing";
import SectionTitle from "./section-title";

const FeaturesSection = () => {
  return (
    <section className="bg-gray-50 py-24">
      <div className="container mx-auto px-6">
        <SectionTitle
          title="Why Choose Investo?"
          subtitle="Clean, portfolio-aware insights that decode stocks–metals correlations with context from news and real-time signals."
        />
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {featuresData.map((feature, idx) => (
            <div
              key={idx}
              className="rounded-2xl bg-white shadow-sm ring-1 ring-gray-100 p-8 hover:shadow-md transition-shadow"
            >
              <div className="flex justify-center text-blue-600">{feature.icon}</div>
              <h3 className="mt-4 text-xl font-semibold tracking-tight text-gray-900">
                {feature.title}
              </h3>
              <p className="mt-2 leading-relaxed text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
