
import { useState, useEffect } from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Hero from '../components/home/Hero';
import BrandShowcase from '../components/home/BrandShowcase';
import PromoBanner from '../components/home/PromoBanner';
import Categories from '../components/home/Categories';
import BestSellers from '../components/home/BestSellers';
import NewArrivalsOffers from '../components/home/NewArrivalsOffers';
import Services from '../components/home/Services';
import Testimonials from '../components/home/Testimonials';
import WhatsappConsultation from '../components/home/WhatsappConsultation';
import CategoriesShowcase from '../components/home/CategoriesShowcase';
import WhyChooseUs from '../components/home/WhyChooseUs';
import EventPopup from '../components/shared/EventPopup';

const Index = () => {
  // Sample categories data with subcategories
  const categories = [
    {
      id: "llaves",
      name: "Llaves",
      icon: "🔑",
      subcategories: [
        { id: "con-chip", name: "Con chip" },
        { id: "sin-chip", name: "Sin chip" },
        { id: "carcasas", name: "Carcasas" },
        { id: "controles", name: "Controles" }
      ]
    },
    {
      id: "alarmas",
      name: "Alarmas",
      icon: "🚨",
      subcategories: [
        { id: "con-llave", name: "Con llave" },
        { id: "sin-llave", name: "Sin llave" },
        { id: "viper", name: "Viper" },
        { id: "oem", name: "OEM" }
      ]
    },
    {
      id: "luces",
      name: "Luces",
      icon: "💡",
      subcategories: [
        { id: "led", name: "LED" },
        { id: "halogenos", name: "Halógenos" },
        { id: "barras", name: "Barras LED" },
        { id: "neblineros", name: "Neblineros" }
      ]
    },
    {
      id: "gps",
      name: "GPS",
      icon: "📍",
      subcategories: [
        { id: "tracker", name: "Tracker" },
        { id: "accesorios-gps", name: "Accesorios GPS" }
      ]
    },
    {
      id: "parlantes",
      name: "Parlantes",
      icon: "🔊",
      subcategories: [
        { id: "pioneer", name: "Pioneer" },
        { id: "subwoofer", name: "Subwoofer" },
        { id: "amplificadores", name: "Amplificadores" }
      ]
    },
    {
      id: "autoradios",
      name: "Autoradios",
      icon: "📻",
      subcategories: [
        { id: "con-chip", name: "Con chip" },
        { id: "sin-chip", name: "Sin chip" },
        { id: "consolas", name: "Consolas" }
      ]
    },
    {
      id: "corporativas",
      name: "Corporativas",
      icon: "🏢",
      subcategories: [
        { id: "alarmas-corp", name: "Alarmas" },
        { id: "gps-corp", name: "GPS" },
        { id: "cercos", name: "Cercos Electrónicos" }
      ]
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar categories={categories} />
      
      <main className="flex-grow">
        <Hero />
        <BrandShowcase />
        <PromoBanner />
        <Categories />
        <BestSellers />
        <NewArrivalsOffers />
        <Services />
        <Testimonials />
        <WhatsappConsultation />
        <CategoriesShowcase />
        <WhyChooseUs />
      </main>
      
      <Footer />
      
      {/* Event Popup - enable for special events */}
      <EventPopup 
        eventId="cyberday-2025"
        title="CYBERDAY"
        description="Aprovecha descuentos exclusivos en alarmas, GPS y autoradios hasta el 20 de mayo."
        dateRange="15 - 20 Mayo 2025"
        imageUrl="https://via.placeholder.com/600x300?text=CYBERDAY+2025"
        targetUrl="/ofertas/cyberday"
      />
    </div>
  );
};

export default Index;
