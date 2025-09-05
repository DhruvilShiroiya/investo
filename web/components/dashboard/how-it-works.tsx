import { howItWorksData } from "@/lib/landing";

const HowItWorksSection = () => {
  return (
    <section className="bg-white py-20">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
          How Investo Works
        </h2>
        <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
          Simple, secure, and powerful — get started in just 3 steps.
        </p>
        <div className="mt-12 grid gap-10 md:grid-cols-3">
          {howItWorksData.map((step, idx) => (
            <div
              key={idx}
              className="rounded-2xl bg-gray-50 shadow p-8 hover:shadow-lg transition"
            >
              <div className="flex justify-center">{step.icon}</div>
              <h3 className="mt-4 text-xl font-semibold text-gray-800">
                {step.title}
              </h3>
              <p className="mt-2 text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
