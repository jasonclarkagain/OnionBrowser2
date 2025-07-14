import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import MatrixBackground from "@/components/three/MatrixBackground";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import Education from "@/pages/education";
import Tools from "@/pages/tools";
import Proxy from "@/pages/proxy";
import Assessment from "@/pages/assessment";
import Contact from "@/pages/contact";
import PrivacyPolicy from "@/pages/privacy-policy";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";

function Router() {
  return (
    <div className="min-h-screen flex flex-col relative">
      <MatrixBackground />
      <div className="relative z-10">
        <Navbar />
        <main className="flex-1">
          <Switch>
            <Route path="/" component={Home} />
            <Route path="/education" component={Education} />
            <Route path="/tools" component={Tools} />
            <Route path="/proxy" component={Proxy} />
            <Route path="/assessment" component={Assessment} />
            <Route path="/contact" component={Contact} />
            <Route path="/privacy-policy" component={PrivacyPolicy} />
            <Route component={NotFound} />
          </Switch>
        </main>
        <Footer />
      </div>
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
