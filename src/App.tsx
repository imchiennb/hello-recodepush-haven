import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Index from "./pages/Index";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import BlogManage from "./pages/BlogManage";
import BlogEditor from "./pages/BlogEditor";
import NotFound from "./pages/NotFound";
import AuthModal from "./components/AuthModal";
import BlogList from "./pages/BlogList";
import { useEffect } from "react";
import i18n, { supportedLanguages } from "./i18n";
import { useQueryProfile } from "./hooks/auth/use-query-profile";
import { LOCAL_STORAGE_KEYS } from "./constant/query-keys";
import NotionTextEditor from "./pages/NotionTextEditor";
// Protected route component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const isAuthenticated =
    localStorage.getItem(LOCAL_STORAGE_KEYS.TOKEN) !== null;

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

const queryClient = new QueryClient();

// Language route wrapper to ensure i18n is initialized
const LanguageRoute = ({ children }: { children: React.ReactNode }) => {
  const pathSegments = window.location.pathname.split("/").filter(Boolean);
  const langCode = pathSegments[0];

  useEffect(() => {
    // Check if the first path segment is a valid language code
    if (langCode && Object.keys(supportedLanguages).includes(langCode)) {
      i18n.changeLanguage(langCode);
    } else {
      // If no valid language code in URL, use browser language or default
      const detectedLng = navigator.language.split("-")[0];
      const validLng = Object.keys(supportedLanguages).includes(detectedLng)
        ? detectedLng
        : (i18n.options.fallbackLng as string);
      i18n.changeLanguage(validLng);
    }
  }, [langCode]);

  return <>{children}</>;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner
            toastOptions={{
              style: {
                padding: "18px",
                background: "white",
                color: "#000",
              },
            }}
          />

          <AuthModal />
          <LanguageRoute>
            <Routes>
              {/* Language-specific routes */}
              <Route path="/" element={<Index />} />
              <Route path="/blog" element={<BlogList />} />
              <Route path="/blog/:id" element={<BlogPost />} />
              <Route
                path="/blog/manage"
                element={
                  <ProtectedRoute>
                    <BlogManage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/blog/create"
                element={
                  <ProtectedRoute>
                    <BlogEditor />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/blog/edit/:id"
                element={
                  <ProtectedRoute>
                    <BlogEditor />
                  </ProtectedRoute>
                }
              />

              {/* Default routes (no language prefix) */}
              <Route path="/" element={<Index />} />
              <Route path="/blog" element={<BlogList />} />
              <Route path="/blog/:id" element={<BlogPost />} />
              <Route
                path="/blog/manage"
                element={
                  <ProtectedRoute>
                    <BlogManage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/blog/create"
                element={
                  <ProtectedRoute>
                    <BlogEditor />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/blog/edit/:id"
                element={
                  <ProtectedRoute>
                    <BlogEditor />
                  </ProtectedRoute>
                }
              />
              {/* Catch-all route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </LanguageRoute>
        </TooltipProvider>
      </AuthProvider>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
