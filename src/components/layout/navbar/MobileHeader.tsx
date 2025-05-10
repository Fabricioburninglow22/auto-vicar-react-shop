
import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, Smartphone } from 'lucide-react';
import { NavbarActionIcons, NavbarSearchBar } from '@/components/layout/NavbarActions';
import { useShoppingContext } from '@/contexts/ShoppingContext';

interface MobileHeaderProps {
  openMobileMenu: () => void;
}

const MobileHeader = ({ openMobileMenu }: MobileHeaderProps) => {
  // Check if ShoppingContext is available
  let shoppingContextAvailable = false;
  try {
    useShoppingContext();
    shoppingContextAvailable = true;
  } catch (e) {
    // ShoppingContext is not available
  }

  return (
    <div className="lg:hidden">
      {/* First Row */}
      <div className="flex items-center justify-between px-4 py-3 bg-white shadow-sm">
        {/* Logo */}
        <Link to="/" className="font-bold text-xl">VICAR-PERU</Link>
        
        {/* Menu Trigger */}
        <button 
          onClick={openMobileMenu}
          aria-label="Open menu"
          className="p-1 hover:bg-gray-100 rounded-md"
        >
          <Menu className="w-6 h-6" />
        </button>
        
        {/* Icons - Only render NavbarActionIcons if ShoppingContext is available */}
        {shoppingContextAvailable ? (
          <NavbarActionIcons />
        ) : (
          <div className="w-[88px] flex justify-end">
            {/* This is a placeholder with the same width to maintain layout */}
          </div>
        )}
      </div>
      
      {/* Second Row */}
      <div className="flex items-center justify-between px-4 py-2 bg-white shadow">
        {/* Search Bar */}
        <div className="relative flex-grow">
          <NavbarSearchBar />
        </div>
        
        {/* WhatsApp Button */}
        <div className="flex items-center gap-2">
          <a 
            href="https://wa.me/51999999999?text=Hola,%20te%20quedaste%20sin%20batería?"
            className="ml-3 flex items-center justify-center bg-vicar-whatsapp-light text-vicar-whatsapp-green px-3 py-2 rounded-md font-medium text-sm whitespace-nowrap"
          >
            ¿Te quedaste sin batería?
          </a>
          <a 
            href="https://wa.me/51999999999"
            aria-label="Contactar por WhatsApp"
            className="flex items-center justify-center bg-vicar-whatsapp-green p-2 rounded-full"
          >
            <Smartphone className="w-5 h-5 text-white" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default MobileHeader;
