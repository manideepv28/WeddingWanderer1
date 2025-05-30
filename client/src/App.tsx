import { useState } from "react";
import { Switch, Route } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Navigation } from "@/components/navigation";
import { AuthModals } from "@/components/auth-modals";
import { Home } from "@/pages/home";
import { Events } from "@/pages/events";
import { Dashboard } from "@/pages/dashboard";
import NotFound from "@/pages/not-found";
import { useAuth } from "@/hooks/use-auth";

function Router() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const { isAuthenticated } = useAuth();

  const handleShowLogin = () => {
    setIsRegisterOpen(false);
    setIsLoginOpen(true);
  };

  const handleShowRegister = () => {
    setIsLoginOpen(false);
    setIsRegisterOpen(true);
  };

  const handleCloseLogin = () => {
    setIsLoginOpen(false);
  };

  const handleCloseRegister = () => {
    setIsRegisterOpen(false);
  };

  const handleSwitchToRegister = () => {
    setIsLoginOpen(false);
    setIsRegisterOpen(true);
  };

  const handleSwitchToLogin = () => {
    setIsRegisterOpen(false);
    setIsLoginOpen(true);
  };

  const handleAuthRequired = () => {
    if (!isAuthenticated) {
      setIsLoginOpen(true);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation
        onShowLogin={handleShowLogin}
        onShowRegister={handleShowRegister}
      />
      
      <main>
        <Switch>
          <Route path="/" exact>
            <Home onExploreClick={() => window.location.href = "/events"} />
          </Route>
          <Route path="/events">
            <Events onAuthRequired={handleAuthRequired} />
          </Route>
          <Route path="/dashboard">
            <Dashboard />
          </Route>
          <Route path="/destinations">
            <div className="py-16 text-center">
              <h1 className="text-4xl font-serif font-bold mb-4">Destinations</h1>
              <p className="text-gray-600">Coming soon...</p>
            </div>
          </Route>
          <Route path="/about">
            <div className="py-16 text-center">
              <h1 className="text-4xl font-serif font-bold mb-4">About WeddingWander</h1>
              <p className="text-gray-600">Learn more about our mission to connect hearts across continents.</p>
            </div>
          </Route>
          <Route component={NotFound} />
        </Switch>
      </main>

      <AuthModals
        isLoginOpen={isLoginOpen}
        isRegisterOpen={isRegisterOpen}
        onCloseLogin={handleCloseLogin}
        onCloseRegister={handleCloseRegister}
        onSwitchToRegister={handleSwitchToRegister}
        onSwitchToLogin={handleSwitchToLogin}
      />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Router />
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
