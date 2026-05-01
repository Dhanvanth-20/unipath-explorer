import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import CountryComparison from "./pages/CountryComparison";
import UniversityFinder from "./pages/UniversityFinder";
import EligibilityChecker from "./pages/EligibilityChecker";
import CostCalculator from "./pages/CostCalculator";
import VisaProcess from "./pages/VisaProcess";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import AuthCallback from "./pages/AuthCallback";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";
import { GoogleOAuthProvider } from '@react-oauth/google';

const queryClient = new QueryClient();

const App = () => {
  const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID || 'your_google_client_id_here';
  return (
    <QueryClientProvider client={queryClient}>
      <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
        <AuthProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/auth/callback" element={<AuthCallback />} />
                <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                <Route path="/compare" element={<ProtectedRoute><CountryComparison /></ProtectedRoute>} />
                <Route path="/universities" element={<ProtectedRoute><UniversityFinder /></ProtectedRoute>} />
                <Route path="/eligibility" element={<ProtectedRoute><EligibilityChecker /></ProtectedRoute>} />
                <Route path="/calculator" element={<ProtectedRoute><CostCalculator /></ProtectedRoute>} />
                <Route path="/visa" element={<ProtectedRoute><VisaProcess /></ProtectedRoute>} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </AuthProvider>
      </GoogleOAuthProvider>
    </QueryClientProvider>
  );
};

export default App;
