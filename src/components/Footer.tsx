
import { Facebook, Twitter, Instagram, Linkedin, Github } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { t } = useTranslation();

  return (
    <footer className="bg-white pt-16 pb-8 border-t border-neutral-200">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div className="md:col-span-1">
            <a href="#" className="inline-block mb-4">
              <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-brand-600 to-brand-400">
                RecodePush
              </span>
            </a>
            <p className="text-neutral-600 mb-4 max-w-xs">
              {t('footer.description')}
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-neutral-500 hover:text-brand-600 transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-neutral-500 hover:text-brand-600 transition-colors">
                <Github size={20} />
              </a>
              <a href="#" className="text-neutral-500 hover:text-brand-600 transition-colors">
                <Linkedin size={20} />
              </a>
              <a href="#" className="text-neutral-500 hover:text-brand-600 transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-neutral-500 hover:text-brand-600 transition-colors">
                <Instagram size={20} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-neutral-900 mb-4">{t('footer.product')}</h4>
            <ul className="space-y-2">
              <li><a href="/#features" className="text-neutral-600 hover:text-brand-600 transition-colors">{t('nav.features')}</a></li>
              <li><a href="/#pricing" className="text-neutral-600 hover:text-brand-600 transition-colors">{t('nav.pricing')}</a></li>
              {/* <li><a href="#" className="text-neutral-600 hover:text-brand-600 transition-colors">Integrations</a></li>
              <li><a href="#" className="text-neutral-600 hover:text-brand-600 transition-colors">Changelog</a></li>
              <li><a href="#" className="text-neutral-600 hover:text-brand-600 transition-colors">Roadmap</a></li> */}
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-neutral-900 mb-4">{t('footer.resources')}</h4>
            <ul className="space-y-2">
              <li><a href="https://docs.recodepush.com/@recodepush-react-native" target="_blank" className="text-neutral-600 hover:text-brand-600 transition-colors">Documentation</a></li>
              {/* <li><a href="#" className="text-neutral-600 hover:text-brand-600 transition-colors">Tutorials</a></li> */}
              <li><Link to="/blog" className="text-neutral-600 hover:text-brand-600 transition-colors">{t('nav.blog')}</Link></li>
              {/* <li><a href="#" className="text-neutral-600 hover:text-brand-600 transition-colors">Community</a></li> */}
              {/* <li><a href="#" className="text-neutral-600 hover:text-brand-600 transition-colors">API</a></li> */}
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-neutral-900 mb-4">{t('footer.company')}</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-neutral-600 hover:text-brand-600 transition-colors">About</a></li>
              {/* <li><a href="#" className="text-neutral-600 hover:text-brand-600 transition-colors">Careers</a></li> */}
              {/* <li><a href="#" className="text-neutral-600 hover:text-brand-600 transition-colors">{t('nav.contact')}</a></li> */}
              {/* <li><a href="#" className="text-neutral-600 hover:text-brand-600 transition-colors">{t('footer.privacy')}</a></li> */}
              {/* <li><a href="#" className="text-neutral-600 hover:text-brand-600 transition-colors">{t('footer.terms')}</a></li> */}
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-neutral-200 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-neutral-500 text-sm mb-4 sm:mb-0">
            &copy; {currentYear} Recodepush. {t('footer.allRightsReserved')}
          </p>
          <div className="flex items-center space-x-4">
            <a href="#" className="text-neutral-500 hover:text-brand-600 text-sm">
              {t('footer.privacy')}
            </a>
            <a href="#" className="text-neutral-500 hover:text-brand-600 text-sm">
              {t('footer.terms')}
            </a>
            <a href="#" className="text-neutral-500 hover:text-brand-600 text-sm">
              {t('footer.cookies')}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
