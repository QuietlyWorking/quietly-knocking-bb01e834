import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { TenantProvider } from "@/contexts/TenantContext";
import { AuthGuard } from "@/components/auth/AuthGuard";
import { AuthRedirect } from "@/components/auth/AuthRedirect";
import { AppLayout } from "@/components/layout/AppLayout";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import ForgotPassword from "./pages/ForgotPassword";
import Onboarding from "./pages/Onboarding";
import Dashboard from "./pages/Dashboard";
import Campaigns from "./pages/Campaigns";
import Leads from "./pages/Leads";
import Sequences from "./pages/Sequences";
import LandingPages from "./pages/LandingPages";
import Infrastructure from "./pages/Infrastructure";
import Analytics from "./pages/Analytics";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const AppRoute = ({ children }: { children: React.ReactNode }) => (
  <AuthGuard>
    <AppLayout>{children}</AppLayout>
  </AuthGuard>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <TenantProvider>
            <Routes>
              {/* Public routes */}
              <Route path="/" element={<AuthRedirect><Landing /></AuthRedirect>} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />

              {/* Onboarding (auth required, no sidebar) */}
              <Route path="/onboarding" element={<AuthGuard><Onboarding /></AuthGuard>} />

              {/* App routes (auth required, with layout) */}
              <Route path="/dashboard" element={<AppRoute><Dashboard /></AppRoute>} />
              <Route path="/campaigns" element={<AppRoute><Campaigns /></AppRoute>} />
              <Route path="/leads" element={<AppRoute><Leads /></AppRoute>} />
              <Route path="/sequences" element={<AppRoute><Sequences /></AppRoute>} />
              <Route path="/landing-pages" element={<AppRoute><LandingPages /></AppRoute>} />
              <Route path="/infrastructure" element={<AppRoute><Infrastructure /></AppRoute>} />
              <Route path="/analytics" element={<AppRoute><Analytics /></AppRoute>} />
              <Route path="/settings" element={<AppRoute><Settings /></AppRoute>} />

              <Route path="*" element={<NotFound />} />
            </Routes>
          </TenantProvider>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
