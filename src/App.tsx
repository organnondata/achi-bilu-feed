import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import Splash from "./pages/Splash";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import SignupFace from "./pages/SignupFace";
import SignupSuccess from "./pages/SignupSuccess";
import Feed from "./pages/Feed";
import Explore from "./pages/Explore";
import AdDetail from "./pages/AdDetail";
import Publish from "./pages/Publish";
import Events from "./pages/Events";
import EventDetail from "./pages/EventDetail";
import Links from "./pages/Links";
import Profile from "./pages/Profile";
import Admin from "./pages/Admin";
import UserProfile from "./pages/UserProfile";
import OrientadorProfile from "./pages/OrientadorProfile";
import Orientadores from "./pages/Orientadores";
import Premium from "./pages/Premium";
import AtivosDakila from "./pages/AtivosDakila";
import SaibaMaisBDM from "./pages/SaibaMaisBDM";
import RadioPage from "./pages/RadioPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isFaceVerified } = useAuth();
  if (!isAuthenticated) return <Navigate to="/" replace />;
  if (!isFaceVerified) return <Navigate to="/signup/face" replace />;
  return <>{children}</>;
};

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Splash />} />
    <Route path="/login" element={<Login />} />
    <Route path="/signup" element={<Signup />} />
    <Route path="/signup/face" element={<SignupFace />} />
    <Route path="/signup/success" element={<SignupSuccess />} />
    <Route path="/feed" element={<ProtectedRoute><Feed /></ProtectedRoute>} />
    <Route path="/explore" element={<ProtectedRoute><Explore /></ProtectedRoute>} />
    <Route path="/ad/:id" element={<ProtectedRoute><AdDetail /></ProtectedRoute>} />
    <Route path="/publish" element={<ProtectedRoute><Publish /></ProtectedRoute>} />
    <Route path="/events" element={<ProtectedRoute><Events /></ProtectedRoute>} />
    <Route path="/events/:id" element={<ProtectedRoute><EventDetail /></ProtectedRoute>} />
    <Route path="/links" element={<ProtectedRoute><Links /></ProtectedRoute>} />
    <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
    <Route path="/admin" element={<ProtectedRoute><Admin /></ProtectedRoute>} />
    <Route path="/user/:id" element={<ProtectedRoute><UserProfile /></ProtectedRoute>} />
    <Route path="/orientadores" element={<ProtectedRoute><Orientadores /></ProtectedRoute>} />
    <Route path="/orientador/:id" element={<ProtectedRoute><OrientadorProfile /></ProtectedRoute>} />
    <Route path="/premium" element={<ProtectedRoute><Premium /></ProtectedRoute>} />
    <Route path="/ativos" element={<ProtectedRoute><AtivosDakila /></ProtectedRoute>} />
    <Route path="/bdm" element={<ProtectedRoute><SaibaMaisBDM /></ProtectedRoute>} />
    <Route path="/radio" element={<ProtectedRoute><RadioPage /></ProtectedRoute>} />
    <Route path="*" element={<NotFound />} />
  </Routes>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
