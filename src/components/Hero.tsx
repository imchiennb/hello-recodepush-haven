
import { ArrowRight, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';

const Hero = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const highlightFeatures = [
    "Intelligent code reviews",
    "Team collaboration tools",
    "Lightning fast deployments"
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center pt-16 overflow-hidden bg-gradient-hero">
      <div className="container relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <span className="inline-block px-4 py-1.5 mb-5 rounded-full bg-brand-100 text-brand-700 text-sm font-medium animate-fade-down shadow-sm">
            Introducing RecodePush
          </span>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-up leading-tight">
            Your Code, <span className="text-brand-600 relative">
              Reimagined
              <span className="absolute bottom-1 left-0 w-full h-3 bg-brand-200 rounded opacity-60"></span>
            </span>
          </h1>
          <p className="text-lg md:text-xl text-neutral-600 mb-8 max-w-2xl mx-auto animate-fade-up" style={{ animationDelay: '100ms' }}>
            Transform your development workflow with our intelligent code collaboration platform. Push changes, automate reviews, and deploy faster than ever before.
          </p>
          
          <div className="flex flex-wrap justify-center gap-3 mb-10 animate-fade-up" style={{ animationDelay: '150ms' }}>
            {highlightFeatures.map((feature, index) => (
              <div key={index} className="flex items-center bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm">
                <CheckCircle className="h-4 w-4 text-brand-500 mr-2" />
                <span className="text-neutral-700 font-medium">{feature}</span>
              </div>
            ))}
          </div>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-up" style={{ animationDelay: '200ms' }}>
            <Button 
              className={`bg-brand-600 hover:bg-brand-700 text-white px-8 py-6 text-lg h-auto shadow-lg transition-all duration-300 ${isHovered ? 'shadow-xl translate-y-[-2px]' : ''}`}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              onClick={() => window.location.href = '#pricing'}
            >
              Start Free Trial
            </Button>
            <Button 
              variant="outline" 
              className="group px-8 py-6 text-lg h-auto border-2 hover:bg-brand-50 transition-all duration-300 hover:border-brand-300"
              onClick={() => {
                window.open("https://docs.recodepush.com/@recodepush-react-native", "_blank");
              }}
            >
              <span>See How It Works</span>
              <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      {!isScrolled && (
        <div className="absolute bottom-8 left-0 right-0 flex justify-center animate-bounce">
          <a href="#features" className="text-neutral-500 hover:text-brand-600 transition-colors">
            <ArrowRight className="h-6 w-6 transform rotate-90" />
          </a>
        </div>
      )}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent"></div>
      <div className="absolute top-1/3 left-10 w-80 h-80 bg-brand-200 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-pulse-soft"></div>
      <div className="absolute top-1/4 right-10 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-pulse-soft" style={{ animationDelay: '1s' }}></div>
      
      {/* Abstract shapes */}
      <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-brand-300/40 rounded-full blur-sm"></div>
      <div className="absolute bottom-1/4 right-1/3 w-24 h-24 bg-blue-300/30 rounded-full blur-sm"></div>
    </section>
  );
};

export default Hero;
