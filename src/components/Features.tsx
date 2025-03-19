
import { Code, Users, Zap, Shield, BarChart, GitCompare } from 'lucide-react';

const features = [
  {
    title: 'Automated Code Reviews',
    description: 'Get intelligent feedback on your code without waiting for manual reviews.',
    icon: <Code className="h-10 w-10 text-brand-500" />,
  },
  {
    title: 'Team Collaboration',
    description: 'Work seamlessly with your team, no matter where they are in the world.',
    icon: <Users className="h-10 w-10 text-brand-500" />,
  },
  {
    title: 'Lightning Fast Deployments',
    description: 'Deploy your code to production in minutes, not hours.',
    icon: <Zap className="h-10 w-10 text-brand-500" />,
  },
  {
    title: 'Enterprise-Grade Security',
    description: 'Your code is secure with end-to-end encryption and compliance tools.',
    icon: <Shield className="h-10 w-10 text-brand-500" />,
  },
  {
    title: 'Advanced Analytics',
    description: 'Get insights into your development process and team performance.',
    icon: <BarChart className="h-10 w-10 text-brand-500" />,
  },
  {
    title: 'Version Control',
    description: 'Track changes and revert to previous versions with ease.',
    icon: <GitCompare className="h-10 w-10 text-brand-500" />,
  },
];

const Features = () => {
  return (
    <section id="features" className="py-24 bg-white">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-3 py-1 rounded-full bg-brand-100 text-brand-700 text-sm font-medium mb-4">
            Features
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Everything You Need in One Place
          </h2>
          <p className="text-lg text-neutral-600">
            RecodePush combines powerful features to streamline your development workflow from start to finish.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="p-6 rounded-xl border border-neutral-200 bg-white shadow-subtle hover:shadow-elevated transition-all duration-300 hover:border-brand-200"
            >
              <div className="mb-4 p-3 rounded-lg bg-brand-50 w-fit">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-neutral-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
