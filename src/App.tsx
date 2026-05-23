
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Ronaldo from "./pages/Ronaldo";
import Zidane from "./pages/Zidane";
import Raul from "./pages/Raul";
import RobertoCarlos from "./pages/RobertoCarlos";
import Ramos from "./pages/Ramos";
import Pepe from "./pages/Pepe";
import Victories from "./pages/Victories";
import Squad from "./pages/Squad";
import NewsSchedule from "./pages/NewsSchedule";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/ronaldo" element={<Ronaldo />} />
          <Route path="/zidane" element={<Zidane />} />
          <Route path="/raul" element={<Raul />} />
          <Route path="/roberto-carlos" element={<RobertoCarlos />} />
          <Route path="/ramos" element={<Ramos />} />
          <Route path="/pepe" element={<Pepe />} />
          <Route path="/victories" element={<Victories />} />
          <Route path="/squad" element={<Squad />} />
          <Route path="/news" element={<NewsSchedule />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;