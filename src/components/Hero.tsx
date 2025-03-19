
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Hero = () => {
  return (
    <section className="relative pt-28 pb-20 md:pt-40 md:pb-32 overflow-hidden bg-gradient-hero">
      <div className="container relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <span className="inline-block px-3 py-1 mb-5 rounded-full bg-brand-100 text-brand-700 text-sm font-medium animate-fade-down">
            Introducing RecodePush
          </span>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-up">
            Your Code, <span className="text-brand-600">Reimagined</span>
          </h1>
          <p className="text-lg md:text-xl text-neutral-600 mb-8 max-w-2xl mx-auto animate-fade-up" style={{ animationDelay: '100ms' }}>
            Transform your development workflow with our intelligent code collaboration platform. Push changes, automate reviews, and deploy faster than ever before.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-up" style={{ animationDelay: '200ms' }}>
            <Button className="bg-brand-600 hover:bg-brand-700 text-white px-8 py-6 text-lg h-auto">
              Start Free Trial
            </Button>
            <Button variant="outline" className="group px-8 py-6 text-lg h-auto">
              <span>See How It Works</span>
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent"></div>
      <div className="absolute top-1/2 left-10 w-64 h-64 bg-brand-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse-soft"></div>
      <div className="absolute top-1/3 right-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse-soft" style={{ animationDelay: '1s' }}></div>
    </section>
  );
};

export default Hero;
