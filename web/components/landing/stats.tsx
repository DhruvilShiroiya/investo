import { statsData } from "@/lib/landing";

const StatsSection = () => {
  return (
    <section className="bg-white py-12">
      <div className="container mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
        {statsData.map((stat, idx) => (
          <div key={idx}>
            <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-blue-600">{stat.value}</h3>
            <p className="mt-1 text-sm md:text-base text-gray-600">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default StatsSection;