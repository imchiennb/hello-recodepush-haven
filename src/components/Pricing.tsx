
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';

type PricingPeriod = 'monthly' | 'yearly';

const pricingPlans = {
  monthly: [
    {
      name: 'Starter',
      price: '$29',
      description: 'Perfect for small teams and individual developers',
      features: [
        'Up to 5 team members',
        'Unlimited repositories',
        'Basic CI/CD pipelines',
        'Standard support',
        '5GB storage',
        'Community access'
      ],
      cta: 'Get Started',
      popular: false
    },
    {
      name: 'Professional',
      price: '$79',
      description: 'Ideal for growing teams with advanced needs',
      features: [
        'Up to 20 team members',
        'Unlimited repositories',
        'Advanced CI/CD pipelines',
        'Priority support',
        '25GB storage',
        'API access',
        'Custom integrations',
        'Advanced analytics'
      ],
      cta: 'Get Started',
      popular: true
    },
    {
      name: 'Enterprise',
      price: '$199',
      description: 'For organizations requiring maximum performance',
      features: [
        'Unlimited team members',
        'Unlimited repositories',
        'Custom CI/CD workflows',
        '24/7 dedicated support',
        'Unlimited storage',
        'SSO/SAML integration',
        'Custom SLA',
        'Compliance tools'
      ],
      cta: 'Contact Sales',
      popular: false
    }
  ],
  yearly: [
    {
      name: 'Starter',
      price: '$24',
      period: 'per month, billed annually',
      description: 'Perfect for small teams and individual developers',
      features: [
        'Up to 5 team members',
        'Unlimited repositories',
        'Basic CI/CD pipelines',
        'Standard support',
        '5GB storage',
        'Community access'
      ],
      cta: 'Get Started',
      popular: false
    },
    {
      name: 'Professional',
      price: '$65',
      period: 'per month, billed annually',
      description: 'Ideal for growing teams with advanced needs',
      features: [
        'Up to 20 team members',
        'Unlimited repositories',
        'Advanced CI/CD pipelines',
        'Priority support',
        '25GB storage',
        'API access',
        'Custom integrations',
        'Advanced analytics'
      ],
      cta: 'Get Started',
      popular: true
    },
    {
      name: 'Enterprise',
      price: '$165',
      period: 'per month, billed annually',
      description: 'For organizations requiring maximum performance',
      features: [
        'Unlimited team members',
        'Unlimited repositories',
        'Custom CI/CD workflows',
        '24/7 dedicated support',
        'Unlimited storage',
        'SSO/SAML integration',
        'Custom SLA',
        'Compliance tools'
      ],
      cta: 'Contact Sales',
      popular: false
    }
  ]
};

const Pricing = () => {
  const [billingPeriod, setBillingPeriod] = useState<PricingPeriod>('monthly');
  const plans = pricingPlans[billingPeriod];

  return (
    <section id="pricing" className="py-24 bg-neutral-50">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-3 py-1 rounded-full bg-brand-100 text-brand-700 text-sm font-medium mb-4">
            Pricing
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-lg text-neutral-600 mb-8">
            Choose the plan that best fits your needs. All plans include a 14-day free trial.
          </p>
          
          {/* Billing toggle */}
          <div className="inline-flex items-center p-1 rounded-lg bg-neutral-200 mb-12">
            <button
              className={`px-4 py-2 rounded-md transition-all ${
                billingPeriod === 'monthly'
                  ? 'bg-white shadow-sm text-neutral-900'
                  : 'text-neutral-600 hover:text-neutral-900'
              }`}
              onClick={() => setBillingPeriod('monthly')}
            >
              Monthly
            </button>
            <button
              className={`px-4 py-2 rounded-md transition-all ${
                billingPeriod === 'yearly'
                  ? 'bg-white shadow-sm text-neutral-900'
                  : 'text-neutral-600 hover:text-neutral-900'
              }`}
              onClick={() => setBillingPeriod('yearly')}
            >
              <span className="flex items-center">
                Yearly
                <span className="ml-2 px-2 py-0.5 text-xs rounded-full bg-brand-100 text-brand-700">
                  Save 20%
                </span>
              </span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`rounded-2xl shadow-subtle bg-white border transition-all duration-300 relative overflow-hidden ${
                plan.popular
                  ? 'border-brand-300 transform md:-translate-y-2 md:scale-105 z-10'
                  : 'border-neutral-200 hover:border-brand-200'
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0 bg-brand-600 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
                  Most Popular
                </div>
              )}
              <div className="p-8">
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <div className="mb-4">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-neutral-500 ml-1">
                    /month
                  </span>
                  {plan.period && (
                    <p className="text-sm text-neutral-500 mt-1">{plan.period}</p>
                  )}
                </div>
                <p className="text-neutral-600 mb-6">{plan.description}</p>
                <Button
                  className={`w-full mb-8 ${
                    plan.popular
                      ? 'bg-brand-600 hover:bg-brand-700 text-white'
                      : 'bg-neutral-100 hover:bg-neutral-200 text-neutral-800'
                  }`}
                >
                  {plan.cta}
                </Button>
                
                <div className="space-y-3">
                  {plan.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center">
                      <Check className="h-5 w-5 text-brand-500 mr-3 flex-shrink-0" />
                      <span className="text-neutral-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <p className="text-neutral-500 max-w-3xl mx-auto">
            All plans come with a 14-day free trial. No credit card required. 
            Need a custom plan? <a href="#" className="text-brand-600 hover:text-brand-700 font-medium">Contact our sales team</a>.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
