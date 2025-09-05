import { Button } from "@/components/ui/button";

const CTASection = () => {
  return (
    <section className="bg-gradient-to-r from-blue-600 to-blue-500 py-20 text-center text-white">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold">
          Ready to Invest Smarter?
        </h2>
        <p className="mt-4 text-lg text-blue-100 max-w-2xl mx-auto">
          Join thousands of investors using AI to gain smarter insights and make
          better financial decisions.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
          <Button size="lg" className="rounded-2xl bg-white text-blue-600">
            Get Started Free
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="rounded-2xl border-white text-white hover:bg-white hover:text-blue-600"
          >
            Learn More
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
