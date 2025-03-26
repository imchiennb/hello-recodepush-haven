
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import { Globe } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { supportedLanguages, getCurrentLanguageCode } from '@/i18n';

const LanguageSelector = () => {
  const { i18n, t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const currentLanguageCode = getCurrentLanguageCode();

  const changeLanguage = (lng: string) => {
    // First change the i18n instance language
    i18n.changeLanguage(lng).then(() => {
      // Then update URL to include language
      const pathSegments = location.pathname.split('/').filter(Boolean);
      const isLanguagePrefix = Object.keys(supportedLanguages).includes(pathSegments[0]);
      
      let newPath = '';
      if (isLanguagePrefix) {
        // Replace current language prefix
        pathSegments[0] = lng;
        newPath = '/' + pathSegments.join('/');
      } else {
        // Add language prefix to the path
        newPath = `/${lng}${location.pathname}`;
      }
      
      navigate(newPath + location.search);
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="h-8 w-8 p-0 gap-1">
          <Globe size={18} />
          <span className="sr-only">{t('language.selectLanguage')}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {Object.entries(supportedLanguages).map(([code, name]) => (
          <DropdownMenuItem
            key={code}
            onClick={() => changeLanguage(code)}
            className={currentLanguageCode === code ? "bg-accent" : ""}
          >
            {t(`language.${name.toLowerCase()}`)}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSelector;
