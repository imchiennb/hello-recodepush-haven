
import { Code, Users, Zap, Shield, BarChart, GitCompare } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Features = () => {
  const { t } = useTranslation();
  
  const features = [
    {
      title: t('features.automatedCodeReviews'),
      description: t('features.automatedCodeReviewsDesc'),
      icon: <Code className="h-10 w-10 text-brand-500" />,
    },
    {
      title: t('features.teamCollaboration'),
      description: t('features.teamCollaborationDesc'),
      icon: <Users className="h-10 w-10 text-brand-500" />,
    },
    {
      title: t('features.lightningFastDeployments'),
      description: t('features.lightningFastDeploymentsDesc'),
      icon: <Zap className="h-10 w-10 text-brand-500" />,
    },
    {
      title: t('features.enterpriseGradeSecurity'),
      description: t('features.enterpriseGradeSecurityDesc'),
      icon: <Shield className="h-10 w-10 text-brand-500" />,
    },
    {
      title: t('features.advancedAnalytics'),
      description: t('features.advancedAnalyticsDesc'),
      icon: <BarChart className="h-10 w-10 text-brand-500" />,
    },
    {
      title: t('features.versionControl'),
      description: t('features.versionControlDesc'),
      icon: <GitCompare className="h-10 w-10 text-brand-500" />,
    },
  ];

  return (
    <section id="features" className="py-24 bg-white">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-3 py-1 rounded-full bg-brand-100 text-brand-700 text-sm font-medium mb-4">
            {t('nav.features')}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {t('features.title')}
          </h2>
          <p className="text-lg text-neutral-600">
            {t('features.description')}
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
