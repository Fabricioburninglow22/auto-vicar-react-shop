
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthProvider";
import { ShoppingProvider } from "./contexts/ShoppingContext";
import { AuthGuard } from "./guards/AuthGuard";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Catalog from "./pages/Catalog";
import Services from "./pages/Services";
import NotFound from "./pages/NotFound";
import Favorites from "./pages/Favorites";
import Cart from "./pages/Cart";
import Notifications from "./pages/Notifications";
import ProductDetails from "./pages/ProductDetails";

// Admin Pages
import AdminDashboard from "./pages/admin/Dashboard";
import AdminGuard from "./guards/AdminGuard";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <ShoppingProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/auth" element={<Auth />} />
              
              {/* Protected Routes */}
              <Route path="/productos" element={<AuthGuard><Catalog /></AuthGuard>} />
              <Route path="/servicios" element={<Services />} />
              <Route path="/categoria/:categoryId" element={<AuthGuard><Catalog /></AuthGuard>} />
              <Route path="/producto/:productId" element={<AuthGuard><ProductDetails /></AuthGuard>} />
              <Route path="/favoritos" element={<AuthGuard><Favorites /></AuthGuard>} />
              <Route path="/carrito" element={<AuthGuard><Cart /></AuthGuard>} />
              <Route path="/notificaciones" element={<AuthGuard><Notifications /></AuthGuard>} />
              
              {/* Admin Routes */}
              <Route path="/admin" element={<AdminGuard><AdminDashboard /></AdminGuard>} />
              <Route path="/admin/productos" element={<AdminGuard><AdminDashboard /></AdminGuard>} />
              <Route path="/admin/categorias" element={<AdminGuard><AdminDashboard /></AdminGuard>} />
              <Route path="/admin/usuarios" element={<AdminGuard><AdminDashboard /></AdminGuard>} />
              <Route path="/admin/anuncios" element={<AdminGuard><AdminDashboard /></AdminGuard>} />
              <Route path="/admin/banners" element={<AdminGuard><AdminDashboard /></AdminGuard>} />
              <Route path="/admin/pedidos" element={<AdminGuard><AdminDashboard /></AdminGuard>} />
              <Route path="/admin/favoritos" element={<AdminGuard><AdminDashboard /></AdminGuard>} />
              <Route path="/admin/configuracion" element={<AdminGuard><AdminDashboard /></AdminGuard>} />
              <Route path="/admin/*" element={<AdminGuard><AdminDashboard /></AdminGuard>} />
              
              {/* Catch-all route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </ShoppingProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
