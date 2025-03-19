
import { Button } from '@/components/ui/button';

const CTA = () => {
  return (
    <section className="py-24 bg-gradient-to-r from-brand-600 to-brand-800 text-white">
      <div className="container relative">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Transform Your Development Workflow?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join thousands of developers who are shipping better code, faster. Start your free trial today.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button className="bg-white text-brand-700 hover:bg-neutral-100 text-lg px-8 py-6 h-auto shadow-lg hover:shadow-xl">
              Start 14-Day Free Trial
            </Button>
            <Button variant="outline" className="border-white text-white hover:bg-white/10 text-lg px-8 py-6 h-auto">
              Schedule a Demo
            </Button>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-1/2 left-10 w-48 h-48 bg-white/10 rounded-full mix-blend-overlay filter blur-2xl"></div>
        <div className="absolute bottom-10 right-10 w-64 h-64 bg-white/10 rounded-full mix-blend-overlay filter blur-2xl"></div>
      </div>
    </section>
  );
};

export default CTA;
