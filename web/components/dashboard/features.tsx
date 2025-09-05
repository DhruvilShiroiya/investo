import { featuresData } from "@/lib/landing";

const FeaturesSection = () => {
  return (
    <section className="bg-gray-50 py-20">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
          Why Choose Investo?
        </h2>
        <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
          Powerful tools and insights designed to make investing smarter, safer,
          and more personalized.
        </p>
        <div className="mt-12 grid gap-10 sm:grid-cols-2 md:grid-cols-3">
          {featuresData.map((feature, idx) => (
            <div
              key={idx}
              className="rounded-2xl bg-white shadow p-6 hover:shadow-lg transition"
            >
              <div className="flex justify-center">{feature.icon}</div>
              <h3 className="mt-4 text-xl font-semibold text-gray-800">
                {feature.title}
              </h3>
              <p className="mt-2 text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
