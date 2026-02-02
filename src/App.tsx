import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MainLayout } from "./components/layout/MainLayout";
import Dashboard from "./pages/Dashboard";
import TimesheetIngestion from "./pages/TimesheetIngestion";
import ValidationQueue from "./pages/ValidationQueue";
import Approvals from "./pages/Approvals";
import AIAssistant from "./pages/AIAssistant";
import OCSIntegration from "./pages/OCSIntegration";
import PayrollReadiness from "./pages/PayrollReadiness";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <MainLayout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/ingestion" element={<TimesheetIngestion />} />
            <Route path="/validation" element={<ValidationQueue />} />
            <Route path="/approvals" element={<Approvals />} />
            <Route path="/ai-assistant" element={<AIAssistant />} />
            <Route path="/ocs-integration" element={<OCSIntegration />} />
            <Route path="/payroll" element={<PayrollReadiness />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </MainLayout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
