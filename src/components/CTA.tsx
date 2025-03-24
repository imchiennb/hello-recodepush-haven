
import { Button } from '@/components/ui/button';
import { ArrowRight, Star } from 'lucide-react';
import { useState } from 'react';

const CTA = () => {
  const [isHoveredTrial, setIsHoveredTrial] = useState(false);
  const [isHoveredDemo, setIsHoveredDemo] = useState(false);
  
  return (
    <section className="py-24 bg-gradient-to-r from-brand-600 to-brand-800 text-white relative overflow-hidden">
      <div className="container relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <span className="inline-block px-4 py-1.5 mb-5 rounded-full bg-white/20 text-white backdrop-blur-sm text-sm font-medium animate-fade-down">
            <Star className="inline-block w-4 h-4 mr-2" /> Join thousands of developers who trust RecodePush
          </span>
          
          <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
            Transform Your Development <span className="relative inline-block">
              <span className="relative z-10">Workflow</span>
              <span className="absolute bottom-1 left-0 w-full h-3 bg-brand-400/30 rounded"></span>
            </span>
          </h2>
          
          <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
            Ship better code, faster with our intelligent collaboration platform. Get started today and see the difference.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
            <Button 
              className={`bg-white text-brand-700 hover:bg-neutral-100 text-lg px-8 py-6 h-auto transition-all duration-300 ${isHoveredTrial ? 'shadow-2xl translate-y-[-2px]' : 'shadow-xl'} group`}
              onMouseEnter={() => setIsHoveredTrial(true)}
              onMouseLeave={() => setIsHoveredTrial(false)}
              onClick={() => window.location.href = '#pricing'}
            >
              Start 14-Day Free Trial
              <ArrowRight className={`ml-2 h-5 w-5 transition-transform duration-300 ${isHoveredTrial ? 'translate-x-1' : ''}`} />
            </Button>
            <Button 
              variant="outline" 
              className={`border-white border-2 text-white hover:bg-white/10 text-lg px-8 py-6 h-auto transition-all duration-300 ${isHoveredDemo ? 'bg-white/5' : ''}`}
              onMouseEnter={() => setIsHoveredDemo(true)}
              onMouseLeave={() => setIsHoveredDemo(false)}
              onClick={() => window.location.href = '#contact'}
            >
              Schedule a Demo
            </Button>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-1/4 left-10 w-64 h-64 bg-white/10 rounded-full mix-blend-overlay filter blur-3xl animate-pulse-soft"></div>
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-white/10 rounded-full mix-blend-overlay filter blur-3xl animate-pulse-soft" style={{ animationDelay: '1.5s' }}></div>
        <div className="absolute top-1/3 right-1/4 w-20 h-20 bg-brand-400/30 rounded-full mix-blend-overlay filter blur-xl"></div>
      </div>
      
      {/* Bottom wave decoration */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full h-auto">
          <path fill="#ffffff" fillOpacity="0.08" d="M0,224L60,197.3C120,171,240,117,360,117.3C480,117,600,171,720,186.7C840,203,960,181,1080,170.7C1200,160,1320,160,1380,160L1440,160L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path>
        </svg>
      </div>
    </section>
  );
};

export default CTA;
