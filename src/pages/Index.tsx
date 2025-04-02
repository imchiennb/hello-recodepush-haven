
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Pricing from "@/components/Pricing";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import CTA from "@/components/CTA";
import Contact from "@/components/Contact";
import Blogs from "@/components/Blogs";
import Footer from "@/components/Footer";
import { useEffect } from "react";

const Index = () => {
  // Add smooth scrolling effect when clicking on navigation links
  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'A' && (target.getAttribute('href')?.startsWith('#') || target.getAttribute('href')?.startsWith('/#'))) {
        e.preventDefault();
        const href = target.getAttribute('href');
        if (href) {
          const element = document.querySelector('section[id=' + href.slice(2) + ']');
          if (element) {
            window.scrollTo({
              top: element.getBoundingClientRect().top + window.scrollY - 80,
              behavior: 'smooth'
            });
          }
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);
    return () => document.removeEventListener('click', handleAnchorClick);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-50 to-white">
      <Navbar />
      <main>
        <Hero />
        <div className="relative z-10 -mt-10 rounded-t-3xl bg-white">
          <Features />
          <Pricing />
          <Testimonials />
          <Blogs />
          <FAQ />
          <CTA />
          <Contact />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
