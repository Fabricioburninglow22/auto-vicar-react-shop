
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { X, ChevronRight, ChevronLeft, LogOut } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface CategoryType {
  id: string;
  name: string;
  icon: string;
  subcategories: { id: string; name: string }[];
}

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  categories: CategoryType[];
  user: any;
  handleLogout: () => void;
}

const MobileMenu = ({ isOpen, onClose, categories, user, handleLogout }: MobileMenuProps) => {
  const [activeCategory, setActiveCategory] = useState<CategoryType | null>(null);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 animate-fade-in" onClick={onClose}>
      <div 
        className="fixed top-0 left-0 h-full w-[80%] max-w-xs bg-white shadow-lg animate-slide-right z-50"
        onClick={e => e.stopPropagation()}
      >
        {/* Main Menu */}
        {!activeCategory ? (
          <>
            {/* Header */}
            <div className="flex justify-between items-center p-4 border-b">
              <h2 className="font-bold text-lg">Menú</h2>
              <button onClick={onClose} aria-label="Cerrar menú">
                <X className="w-6 h-6" />
              </button>
            </div>
            
            {/* User Actions */}
            <div className="p-4 border-b">
              {user ? (
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-vicar-blue text-white flex items-center justify-center font-medium">
                      {user.email?.charAt(0).toUpperCase() || "U"}
                    </div>
                    <div>
                      <p className="font-medium">{user.email}</p>
                    </div>
                  </div>
                  <button 
                    onClick={handleLogout}
                    className="flex items-center gap-2 py-2 px-3 rounded-md hover:bg-gray-100 text-red-500"
                  >
                    <LogOut className="w-5 h-5" />
                    <span>Cerrar sesión</span>
                  </button>
                </div>
              ) : (
                <Link 
                  to="/auth" 
                  className="flex items-center gap-2 py-2 px-3 rounded-md hover:bg-gray-100"
                  onClick={onClose}
                >
                  <span>Acceder / Registrarse</span>
                </Link>
              )}
            </div>
            
            {/* Categories */}
            <div className="p-4 border-b">
              <h3 className="font-medium text-sm text-gray-500 mb-2">Categorías</h3>
              <ul>
                {categories.map(category => (
                  <li key={category.id}>
                    <button 
                      className="flex justify-between items-center w-full py-2 hover:bg-gray-100 px-2 rounded-md"
                      onClick={() => setActiveCategory(category)}
                    >
                      <span className="flex items-center gap-2">
                        <span>{category.icon}</span>
                        <span>{category.name}</span>
                      </span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Quick Links */}
            <div className="p-4">
              <Link 
                to="/productos" 
                className="block py-2 hover:text-vicar-blue" 
                onClick={onClose}
              >
                Catálogo Completo
              </Link>
              <Link 
                to="/favoritos" 
                className="block py-2 hover:text-vicar-blue" 
                onClick={onClose}
              >
                Favoritos
              </Link>
              <Link 
                to="/carrito" 
                className="block py-2 hover:text-vicar-blue" 
                onClick={onClose}
              >
                Carrito/Cotización
              </Link>
              <a 
                href="https://wa.me/51999999999?text=Hola,%20tengo%20una%20consulta%20sobre" 
                className="flex items-center gap-2 mt-4 text-vicar-whatsapp-green font-medium"
                onClick={onClose}
              >
                <span>Consultar vía WhatsApp</span>
              </a>
            </div>
          </>
        ) : (
          // Subcategories menu
          <>
            {/* Header */}
            <div className="flex justify-between items-center p-4 border-b">
              <button 
                onClick={() => setActiveCategory(null)} 
                className="flex items-center gap-1 text-vicar-blue"
              >
                <ChevronLeft className="w-5 h-5" />
                <span>Volver</span>
              </button>
              <button onClick={onClose} aria-label="Cerrar menú">
                <X className="w-6 h-6" />
              </button>
            </div>
            
            {/* Category Title */}
            <div className="p-4 border-b">
              <h2 className="font-bold text-lg flex items-center gap-2">
                <span>{activeCategory.icon}</span>
                <span>{activeCategory.name}</span>
              </h2>
            </div>
            
            {/* Subcategories */}
            <div className="p-4">
              <ul>
                {activeCategory.subcategories.map(subcategory => (
                  <li key={subcategory.id}>
                    <Link 
                      to={`/categoria/${activeCategory.id.toLowerCase()}?sub=${subcategory.id}`}
                      className="block py-3 px-2 hover:bg-gray-100 rounded-md" 
                      onClick={onClose}
                    >
                      {subcategory.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default MobileMenu;
