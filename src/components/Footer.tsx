
import { Facebook, Twitter, Instagram, Linkedin, Github } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

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
              Transforming how developers collaborate, review, and deploy code.
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
            <h4 className="font-bold text-neutral-900 mb-4">Product</h4>
            <ul className="space-y-2">
              <li><a href="#features" className="text-neutral-600 hover:text-brand-600 transition-colors">Features</a></li>
              <li><a href="#pricing" className="text-neutral-600 hover:text-brand-600 transition-colors">Pricing</a></li>
              <li><a href="#" className="text-neutral-600 hover:text-brand-600 transition-colors">Integrations</a></li>
              <li><a href="#" className="text-neutral-600 hover:text-brand-600 transition-colors">Changelog</a></li>
              <li><a href="#" className="text-neutral-600 hover:text-brand-600 transition-colors">Roadmap</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-neutral-900 mb-4">Resources</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-neutral-600 hover:text-brand-600 transition-colors">Documentation</a></li>
              <li><a href="#" className="text-neutral-600 hover:text-brand-600 transition-colors">Tutorials</a></li>
              <li><a href="#" className="text-neutral-600 hover:text-brand-600 transition-colors">Blog</a></li>
              <li><a href="#" className="text-neutral-600 hover:text-brand-600 transition-colors">Community</a></li>
              <li><a href="#" className="text-neutral-600 hover:text-brand-600 transition-colors">API</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-neutral-900 mb-4">Company</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-neutral-600 hover:text-brand-600 transition-colors">About</a></li>
              <li><a href="#" className="text-neutral-600 hover:text-brand-600 transition-colors">Careers</a></li>
              <li><a href="#" className="text-neutral-600 hover:text-brand-600 transition-colors">Contact</a></li>
              <li><a href="#" className="text-neutral-600 hover:text-brand-600 transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-neutral-600 hover:text-brand-600 transition-colors">Terms of Service</a></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-neutral-200 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-neutral-500 text-sm mb-4 sm:mb-0">
            &copy; {currentYear} RecodePush. All rights reserved.
          </p>
          <div className="flex items-center space-x-4">
            <a href="#" className="text-neutral-500 hover:text-brand-600 text-sm">
              Privacy
            </a>
            <a href="#" className="text-neutral-500 hover:text-brand-600 text-sm">
              Terms
            </a>
            <a href="#" className="text-neutral-500 hover:text-brand-600 text-sm">
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
