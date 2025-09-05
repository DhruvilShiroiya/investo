import { statsData } from "@/lib/landing";

const StatsSection = () => {
  return (
    <section className="bg-white py-16">
      <div className="container mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        {statsData.map((stat, idx) => (
          <div key={idx}>
            <h3 className="text-3xl font-bold text-blue-600">{stat.value}</h3>
            <p className="mt-2 text-gray-600">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default StatsSection;