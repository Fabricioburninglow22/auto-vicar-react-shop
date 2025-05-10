
import React, { useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Smartphone, Menu } from 'lucide-react';
import { useAuth } from '@/contexts/AuthProvider';
import { NavbarActionIcons, NavbarSearchBar } from '@/components/layout/NavbarActions';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface CategoryType {
  id: string;
  name: string;
  icon: string;
  subcategories: { id: string; name: string }[];
}

interface DesktopHeaderProps {
  categories: CategoryType[];
  activeDropdown: string | null;
  setActiveDropdown: (id: string | null) => void;
  isScrolled: boolean;
  openMobileMenu: () => void;
}

const DesktopHeader = ({ 
  categories, 
  activeDropdown, 
  setActiveDropdown, 
  isScrolled, 
  openMobileMenu 
}: DesktopHeaderProps) => {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      toast({
        title: "Sesión cerrada",
        description: "Has cerrado sesión exitosamente"
      });
      navigate('/');
    } catch (error: any) {
      toast({
        title: "Error",
        description: "No se pudo cerrar la sesión",
        variant: "destructive"
      });
    }
  };

  return (
    <div className={`hidden lg:block ${isScrolled ? 'shadow-md' : ''}`}>
      {/* First Row */}
      <div className="container mx-auto flex items-center justify-between py-4 px-4 bg-white">
        {/* Logo and Menu */}
        <div className="flex items-center gap-6">
          <Link to="/" className="font-bold text-2xl">VICAR-PERU</Link>
          <button 
            onClick={openMobileMenu}
            aria-label="Toggle menu"
            className="p-1 hover:bg-gray-100 rounded-md"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
        
        {/* Search Bar */}
        <div className="relative w-1/3">
          <NavbarSearchBar />
        </div>
        
        {/* User Actions */}
        <div className="flex items-center gap-5">
          <NavbarActionIcons />
          
          {user ? (
            <div className="relative group">
              <div className="cursor-pointer flex items-center gap-2 bg-gray-100 px-3 py-2 rounded-md hover:bg-gray-200">
                <div className="w-6 h-6 rounded-full bg-vicar-blue text-white flex items-center justify-center font-medium">
                  {user.email?.charAt(0).toUpperCase() || "U"}
                </div>
                <span className="font-medium text-sm">{user.email?.split('@')[0]}</span>
              </div>
              
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg overflow-hidden z-20 invisible group-hover:visible">
                <div className="py-2">
                  <div className="px-4 py-2 text-xs text-gray-500">
                    {user.email}
                  </div>
                  <div className="border-t border-gray-100"></div>
                  <Link to="/mi-perfil" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Mi perfil
                  </Link>
                  <Link to="/mis-ordenes" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Mis órdenes
                  </Link>
                  {(user.email === "fabricioburning22@gmail.com" || user.email === "admin@vicar.com") && (
                    <Link to="/admin" className="block px-4 py-2 text-sm text-blue-700 hover:bg-gray-100 font-medium">
                      Panel de administración
                    </Link>
                  )}
                  <div className="border-t border-gray-100"></div>
                  <button 
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                  >
                    Cerrar sesión
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <Link 
              to="/auth"
              className="bg-vicar-blue text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              ACCEDER
            </Link>
          )}
        </div>
      </div>
      
      {/* Second Row - Categories */}
      <div className="bg-white shadow" ref={dropdownRef}>
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex">
            {categories.map((category) => (
              <div 
                key={category.id}
                className="relative group"
                onMouseEnter={() => setActiveDropdown(category.id)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  to={`/categoria/${category.id.toLowerCase()}`}
                  className={`flex items-center gap-2 px-4 py-3 hover:text-vicar-blue transition-colors ${activeDropdown === category.id ? 'text-vicar-blue' : ''}`}
                >
                  <span>{category.icon}</span>
                  <span>{category.name}</span>
                </Link>
                
                {/* Dropdown */}
                {activeDropdown === category.id && (
                  <div className="absolute top-full left-0 bg-white shadow-lg rounded-b-lg p-4 min-w-[200px] z-[9000] animate-fade-in">
                    <div className="grid gap-2">
                      {category.subcategories.map((subcategory) => (
                        <Link
                          key={subcategory.id}
                          to={`/categoria/${category.id.toLowerCase()}?sub=${subcategory.id}`}
                          className="hover:bg-gray-100 px-3 py-2 rounded-md transition-colors"
                          onClick={() => setActiveDropdown(null)}
                        >
                          {subcategory.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
          
          <div className="flex items-center gap-2">
            <a 
              href="https://wa.me/51999999999?text=Hola,%20te%20quedaste%20sin%20batería?"
              className="flex items-center gap-2 bg-vicar-whatsapp-light text-vicar-whatsapp-green px-4 py-3 font-medium hover:bg-green-50 transition-colors"
            >
              ¿Te quedaste sin batería?
            </a>
            <a 
              href="https://wa.me/51999999999"
              aria-label="Contactar por WhatsApp"
              className="flex items-center justify-center bg-vicar-whatsapp-green p-2 rounded-full hover:bg-green-600 transition-colors"
            >
              <Smartphone className="w-5 h-5 text-white" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DesktopHeader;
