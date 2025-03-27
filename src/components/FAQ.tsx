
import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useTranslation } from 'react-i18next';

type FAQItem = {
  question: string;
  answer: string;
};

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const { t } = useTranslation();

  const faqs: FAQItem[] = [
    {
      question: t("How does the 14-day free trial work?"),
      answer: t("Our free trial gives you full access to all features of your chosen plan for 14 days. No credit card is required to start. At the end of your trial, you can choose to subscribe or your account will automatically downgrade to our limited free tier."),
    },
    {
      question: t("Can I switch plans later?"),
      answer: t("Yes, you can upgrade, downgrade, or change your plan at any time. If you upgrade, the new pricing takes effect immediately. If you downgrade, the new pricing takes effect at the start of your next billing cycle."),
    },
    {
      question: t("Is there a limit to how many repositories I can connect?"),
      answer: t("No, all our plans offer unlimited repository connections. The difference between plans is in the number of team members, features, and the level of support."),
    },
    {
      question: t("Do you offer discounts for startups or non-profits?"),
      answer: t("Yes, we offer special pricing for eligible startups, non-profit organizations, and educational institutions. Please contact our sales team to learn more."),
    },
    {
      question: t("What kind of support do you offer?"),
      answer: t("The level of support depends on your plan. The Starter plan includes community forum access and standard email support. Professional plan users receive priority email support and chat during business hours. Enterprise customers get 24/7 dedicated support with a dedicated account manager."),
    },
    {
      question: t("How secure is my code with RecodePush?"),
      answer: t("We take security very seriously. Your code is encrypted both in transit and at rest. We use industry-standard security practices, including regular security audits. We never store your source code on our servers longer than necessary to perform the requested operations."),
    },
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-24 bg-neutral-50">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-3 py-1 rounded-full bg-brand-100 text-brand-700 text-sm font-medium mb-4">
            FAQ
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {t('faq.title')}
          </h2>
          <p className="text-lg text-neutral-600">
            {t('faq.description')}
          </p>
        </div>

        <div className="max-w-3xl mx-auto divide-y divide-neutral-200 rounded-xl bg-white overflow-hidden shadow-subtle">
          {faqs.map((faq, index) => (
            <div key={index} className="p-0">
              <button
                className="w-full flex justify-between items-center p-6 text-left focus:outline-none"
                onClick={() => toggleFAQ(index)}
              >
                <span className="text-lg font-medium text-neutral-800">{faq.question}</span>
                {openIndex === index ? (
                  <ChevronUp className="h-5 w-5 text-brand-500" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-neutral-500" />
                )}
              </button>
              <div
                className={`transition-all duration-300 ease-in-out overflow-hidden ${
                  openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="p-6 pt-0 text-neutral-600">{faq.answer}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
