import { Button } from "@/components/ui/button";

const CTASection = () => {
  return (
    <section className="bg-gradient-to-r from-blue-600 to-blue-500 py-24 text-center text-white">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold">
          Ready to Decode Market Relationships?
        </h2>
        <p className="mt-4 text-lg leading-relaxed text-blue-100 max-w-2xl mx-auto">
          Use AI-driven analysis to understand how stocks and metals move together
          and discover portfolio-aware techniques. Informational purposes only.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
          <Button size="lg" className="rounded-2xl bg-white text-blue-600 shadow-sm">
            Explore Correlations
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="rounded-2xl border-white text-white hover:bg-white hover:text-blue-600"
          >
            Learn More
          </Button>
        </div>
        <p className="mt-6 text-xs text-blue-100 max-w-3xl mx-auto">
          Investo provides analytics and insights about market correlations and news sentiment.
          We do not execute trades or offer investing services.
        </p>
      </div>
    </section>
  );
};

export default CTASection;
