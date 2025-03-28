import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import LanguageSelector from "./LanguageSelector";
import Logo from "./Logo";
import { useQueryProfile } from "@/hooks/auth/use-query-profile";
import { LOCAL_STORAGE_KEYS } from "@/constant/query-keys";
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { data: user, isLoading, isFetching } = useQueryProfile();

  const localUser = localStorage.getItem(LOCAL_STORAGE_KEYS.PROFILE) ? JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEYS.PROFILE) || "{}") : null;

  const { logout, openAuthModal } = useAuth();
  const location = useLocation();
  const { t, i18n } = useTranslation();

  // Update the scroll state on window scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle authentication actions
  const handleLoginClick = () => {
    openAuthModal("login");
  };

  const handleSignupClick = () => {
    openAuthModal("signup");
  };

  const handleLogoutClick = () => {
    logout();
  };

  // Get current language for path prefixing
  const getLanguagePrefix = () => {
    const langCode = i18n.language.split("-")[0];
    return Object.keys(i18n.options.resources || {}).includes(langCode)
      ? `/${langCode}`
      : "";
  };

  // Helper to create language-aware paths
  const createPath = (path: string) => {
    // if (path.startsWith("#")) return path;
    // return `${getLanguagePrefix()}${path}`;

    return path;
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 bg-white z-50 transition-shadow duration-300 ${
        isScrolled ? "shadow-md" : ""
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Logo />

          {/* Desktop Menu */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link
              to={createPath("/")}
              className={`text-neutral-700 hover:text-brand-600 transition-colors ${
                location.pathname === "/" ||
                location.pathname === `/${i18n.language}`
                  ? "font-medium text-brand-600"
                  : ""
              }`}
            >
              {t("nav.home")}
            </Link>
            <Link
              to={createPath("/blog")}
              className={`text-neutral-700 hover:text-brand-600 transition-colors ${
                location.pathname.includes("/blog") &&
                !location.pathname.includes("/blog/manage")
                  ? "font-medium text-brand-600"
                  : ""
              }`}
            >
              {t("nav.blog")}
            </Link>
            <Link
              to="#features"
              className="text-neutral-700 hover:text-brand-600 transition-colors"
            >
              {t("nav.features")}
            </Link>
            <Link
              to="#pricing"
              className="text-neutral-700 hover:text-brand-600 transition-colors"
            >
              {t("nav.pricing")}
            </Link>
            <Link
              to="#contact"
              className="text-neutral-700 hover:text-brand-600 transition-colors"
            >
              {t("nav.contact")}
            </Link>
            {user && (
              <Link
                to={createPath("/blog/manage")}
                className={`text-neutral-700 hover:text-brand-600 transition-colors ${
                  location.pathname.includes("/blog/manage")
                    ? "font-medium text-brand-600"
                    : ""
                }`}
              >
                {t("nav.manageBlog")}
              </Link>
            )}
          </nav>

          {/* Auth Buttons & Language Selector (Desktop) */}
          <div className="hidden md:flex items-center space-x-3">
            <LanguageSelector />

            {localUser ? (
              <div className="flex items-center space-x-2">
                <div className="text-sm font-medium mr-2 uppercase">
                  {localUser.role}
                </div>
                <Button variant="outline" size="sm" onClick={handleLogoutClick}>
                  {t("nav.logout")}
                </Button>
              </div>
            ) : (
              <>
                <Button variant="ghost" size="sm" onClick={handleLoginClick}>
                  {t("nav.login")}
                </Button>
                <Button size="sm" onClick={handleSignupClick} disabled>
                  {t("nav.signup")}
                </Button>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <LanguageSelector />
            <button
              className="ml-2 p-2 text-neutral-700 focus:outline-none"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden py-4 border-t">
            <nav className="flex flex-col space-y-4 mb-4">
              <Link
                to={createPath("/")}
                className={`px-4 py-2 rounded-md hover:bg-neutral-100 ${
                  location.pathname === "/" ||
                  location.pathname === `/${i18n.language}`
                    ? "bg-neutral-100 font-medium"
                    : ""
                }`}
                onClick={() => setIsOpen(false)}
              >
                {t("nav.home")}
              </Link>
              <Link
                to={createPath("/blog")}
                className={`px-4 py-2 rounded-md hover:bg-neutral-100 ${
                  location.pathname.includes("/blog") &&
                  !location.pathname.includes("/blog/manage")
                    ? "bg-neutral-100 font-medium"
                    : ""
                }`}
                onClick={() => setIsOpen(false)}
              >
                {t("nav.blog")}
              </Link>
              <Link
                to="#features"
                className="px-4 py-2 rounded-md hover:bg-neutral-100"
                onClick={() => setIsOpen(false)}
              >
                {t("nav.features")}
              </Link>
              <Link
                to="#pricing"
                className="px-4 py-2 rounded-md hover:bg-neutral-100"
                onClick={() => setIsOpen(false)}
              >
                {t("nav.pricing")}
              </Link>
              <Link
                to="#contact"
                className="px-4 py-2 rounded-md hover:bg-neutral-100"
                onClick={() => setIsOpen(false)}
              >
                {t("nav.contact")}
              </Link>
              {user && (
                <Link
                  to={createPath("/blog/manage")}
                  className={`px-4 py-2 rounded-md hover:bg-neutral-100 ${
                    location.pathname.includes("/blog/manage")
                      ? "bg-neutral-100 font-medium"
                      : ""
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {t("nav.manageBlog")}
                </Link>
              )}
            </nav>

            {/* Auth Buttons (Mobile) */}
            <div className="flex flex-col space-y-2 px-4">
              {user ? (
                <>
                  <div className="text-sm font-medium mb-2">{user.name}</div>
                  <Button
                    variant="outline"
                    onClick={() => {
                      handleLogoutClick();
                      setIsOpen(false);
                    }}
                  >
                    {t("nav.logout")}
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    variant="outline"
                    onClick={() => {
                      handleLoginClick();
                      setIsOpen(false);
                    }}
                  >
                    {t("nav.login")}
                  </Button>
                  <Button
                    onClick={() => {
                      handleSignupClick();
                      setIsOpen(false);
                    }}
                  >
                    {t("nav.signup")}
                  </Button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
