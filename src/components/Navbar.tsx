
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X, LogIn, UserPlus, User, LogOut } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { AuthModal } from './AuthModal';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authModalTab, setAuthModalTab] = useState<"login" | "signup">("login");
  
  const { user, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const openLoginModal = () => {
    setAuthModalTab("login");
    setAuthModalOpen(true);
  };

  const openSignupModal = () => {
    setAuthModalTab("signup");
    setAuthModalOpen(true);
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <>
      <AuthModal 
        open={authModalOpen} 
        onOpenChange={setAuthModalOpen} 
        defaultTab={authModalTab}
      />
      
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'py-3 bg-white/80 backdrop-blur-md shadow-sm'
            : 'py-5 bg-transparent'
        }`}
      >
        <div className="container flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-brand-600 to-brand-400">
              RecodePush
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a
              href="#features"
              className="text-neutral-700 hover:text-brand-600 transition-colors font-medium"
            >
              Features
            </a>
            <a
              href="#pricing"
              className="text-neutral-700 hover:text-brand-600 transition-colors font-medium"
            >
              Pricing
            </a>
            <a
              href="#testimonials"
              className="text-neutral-700 hover:text-brand-600 transition-colors font-medium"
            >
              Testimonials
            </a>
            <Link
              to="/blog"
              className="text-neutral-700 hover:text-brand-600 transition-colors font-medium"
            >
              Blog
            </Link>
            <a
              href="#faq"
              className="text-neutral-700 hover:text-brand-600 transition-colors font-medium"
            >
              FAQ
            </a>
            <a
              href="#contact"
              className="text-neutral-700 hover:text-brand-600 transition-colors font-medium"
            >
              Contact
            </a>
            
            {user && (
              <Link
                to="/blog/manage"
                className="text-neutral-700 hover:text-brand-600 transition-colors font-medium"
              >
                Dashboard
              </Link>
            )}
          </nav>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-brand-100 flex items-center justify-center mr-2">
                    <User size={16} className="text-brand-600" />
                  </div>
                  <span className="font-medium">{user.name}</span>
                </div>
                <Button 
                  variant="outline" 
                  className="transition-all hover:bg-brand-50 hover:border-brand-300 flex items-center"
                  onClick={handleLogout}
                >
                  <LogOut size={16} className="mr-2" />
                  Logout
                </Button>
              </div>
            ) : (
              <>
                <Button 
                  variant="outline" 
                  className="transition-all hover:bg-brand-50 hover:border-brand-300 flex items-center"
                  onClick={openLoginModal}
                >
                  <LogIn size={16} className="mr-2" />
                  Login
                </Button>
                <Button 
                  className="bg-brand-600 hover:bg-brand-700 text-white transition-all hover:shadow-lg flex items-center"
                  onClick={openSignupModal}
                >
                  <UserPlus size={16} className="mr-2" />
                  Sign Up
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-neutral-800"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-md border-b border-neutral-200 p-4 shadow-md animate-fade-down">
            <nav className="flex flex-col space-y-4 py-2">
              <a
                href="#features"
                className="text-neutral-700 hover:text-brand-600 transition-colors font-medium p-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Features
              </a>
              <a
                href="#pricing"
                className="text-neutral-700 hover:text-brand-600 transition-colors font-medium p-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Pricing
              </a>
              <a
                href="#testimonials"
                className="text-neutral-700 hover:text-brand-600 transition-colors font-medium p-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Testimonials
              </a>
              <Link
                to="/blog"
                className="text-neutral-700 hover:text-brand-600 transition-colors font-medium p-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Blog
              </Link>
              <a
                href="#faq"
                className="text-neutral-700 hover:text-brand-600 transition-colors font-medium p-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                FAQ
              </a>
              <a
                href="#contact"
                className="text-neutral-700 hover:text-brand-600 transition-colors font-medium p-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact
              </a>
              
              {user && (
                <Link
                  to="/blog/manage"
                  className="text-neutral-700 hover:text-brand-600 transition-colors font-medium p-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Dashboard
                </Link>
              )}
              
              <div className="border-t border-neutral-200 pt-4 mt-2">
                {user ? (
                  <>
                    <div className="flex items-center p-2 mb-2">
                      <div className="w-8 h-8 rounded-full bg-brand-100 flex items-center justify-center mr-2">
                        <User size={16} className="text-brand-600" />
                      </div>
                      <span className="font-medium">{user.name}</span>
                    </div>
                    <Button 
                      variant="outline" 
                      className="w-full justify-center"
                      onClick={() => {
                        handleLogout();
                        setMobileMenuOpen(false);
                      }}
                    >
                      <LogOut size={16} className="mr-2" />
                      Logout
                    </Button>
                  </>
                ) : (
                  <div className="flex flex-col space-y-2">
                    <Button 
                      variant="outline" 
                      className="w-full justify-center"
                      onClick={() => {
                        openLoginModal();
                        setMobileMenuOpen(false);
                      }}
                    >
                      <LogIn size={16} className="mr-2" />
                      Login
                    </Button>
                    <Button 
                      className="w-full justify-center bg-brand-600 hover:bg-brand-700"
                      onClick={() => {
                        openSignupModal();
                        setMobileMenuOpen(false);
                      }}
                    >
                      <UserPlus size={16} className="mr-2" />
                      Sign Up
                    </Button>
                  </div>
                )}
              </div>
            </nav>
          </div>
        )}
      </header>
    </>
  );
};

export default Navbar;
