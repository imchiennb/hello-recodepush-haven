
import { useState, useEffect } from 'react';

const testimonials = [
  {
    quote: "RecodePush transformed our development process. Our team is now shipping features twice as fast with fewer bugs.",
    name: "Sarah Johnson",
    title: "CTO at TechFront",
    avatar: "https://randomuser.me/api/portraits/women/45.jpg"
  },
  {
    quote: "The automated code reviews have been a game-changer for our junior developers. The quality of our codebase has improved dramatically.",
    name: "Michael Chen",
    title: "Lead Developer at Stackflow",
    avatar: "https://randomuser.me/api/portraits/men/22.jpg"
  },
  {
    quote: "We switched from three different tools to just RecodePush. Our workflow is so much simpler now, and we're saving thousands per month.",
    name: "Emily Rodriguez",
    title: "Engineering Manager at DataSync",
    avatar: "https://randomuser.me/api/portraits/women/32.jpg"
  }
];

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="testimonials" className="py-24 bg-white overflow-hidden">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-3 py-1 rounded-full bg-brand-100 text-brand-700 text-sm font-medium mb-4">
            Testimonials
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Loved by Developers Worldwide
          </h2>
          <p className="text-lg text-neutral-600">
            See what our users are saying about RecodePush and how it has transformed their workflow.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="relative h-[300px] md:h-[250px]">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-all duration-500 ease-in-out glass-card rounded-2xl p-8 flex flex-col justify-between ${
                  index === activeIndex
                    ? 'opacity-100 translate-x-0'
                    : index < activeIndex
                    ? 'opacity-0 -translate-x-full'
                    : 'opacity-0 translate-x-full'
                }`}
              >
                <p className="text-xl md:text-2xl text-neutral-700 italic mb-6">"{testimonial.quote}"</p>
                <div className="flex items-center">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="h-14 w-14 rounded-full object-cover mr-4"
                    loading="lazy"
                  />
                  <div>
                    <h4 className="font-bold text-neutral-900">{testimonial.name}</h4>
                    <p className="text-neutral-500">{testimonial.title}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={`h-3 w-3 rounded-full transition-all ${
                  index === activeIndex ? 'bg-brand-500 w-8' : 'bg-neutral-300'
                }`}
                onClick={() => setActiveIndex(index)}
                aria-label={`View testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
