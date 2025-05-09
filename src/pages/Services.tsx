import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Wrench, Car, Shield, MapPin, Phone, Clock, Shield as ShieldIcon, CalendarClock } from 'lucide-react';

const Services = () => {
  // Categories for navbar
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

  // Services list
  const servicesList = [
    {
      id: 'installation',
      title: 'Instalación Profesional',
      description: 'Nuestros técnicos certificados instalan todos nuestros productos con la más alta calidad y precisión.',
      icon: <Wrench className="w-12 h-12 text-vicar-blue" />,
      features: ['Mano de obra garantizada', 'Técnicos certificados', 'Instalación rápida y segura']
    },
    {
      id: 'diagnostics',
      title: 'Diagnóstico Automotriz',
      description: 'Diagnóstico completo de sistemas electrónicos de tu vehículo para detectar cualquier falla.',
      icon: <Car className="w-12 h-12 text-vicar-blue" />,
      features: ['Scanner multimarcas', 'Diagnóstico computarizado', 'Informe detallado']
    },
    {
      id: 'security',
      title: 'Seguridad Vehicular',
      description: 'Instalación y configuración de sistemas de seguridad para proteger tu vehículo.',
      icon: <ShieldIcon className="w-12 h-12 text-vicar-blue" />,
      features: ['Alarmas con GPS', 'Bloqueo de motor', 'Monitoreo remoto']
    },
    {
      id: 'maintenance',
      title: 'Mantenimiento Preventivo',
      description: 'Servicios de mantenimiento para asegurar el correcto funcionamiento de tus sistemas.',
      icon: <CalendarClock className="w-12 h-12 text-vicar-blue" />,
      features: ['Revisión periódica', 'Actualización de software', 'Limpieza de componentes']
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar categories={categories} />

      <main className="flex-grow py-8">
        <section className="container mx-auto px-4">
          {/* Breadcrumb */}
          <div className="mb-6 text-sm text-gray-600">
            <Link to="/" className="hover:text-vicar-blue">Inicio</Link>
            <span className="mx-2">/</span>
            <span>Servicios</span>
          </div>

          {/* Page Title */}
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Nuestros Servicios</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Ofrecemos servicios profesionales de instalación, mantenimiento y 
              reparación para todos nuestros productos con técnicos certificados.
            </p>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {servicesList.map((service) => (
              <Card key={service.id} className="hover:shadow-lg transition-shadow">
                <CardHeader className="text-center">
                  <div className="flex justify-center mb-4">
                    {service.icon}
                  </div>
                  <CardTitle>{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center mb-4">
                    {service.description}
                  </CardDescription>
                  <ul className="space-y-2">
                    {service.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-vicar-blue mr-2">✓</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <a 
                    href="https://wa.me/51999999999?text=Hola,%20me%20interesa%20el%20servicio%20de%20" 
                    className="w-full bg-vicar-whatsapp-green text-white py-2 rounded-md text-center hover:bg-green-600 transition-colors"
                  >
                    Consultar
                  </a>
                </CardFooter>
              </Card>
            ))}
          </div>

          {/* Contact Info */}
          <div className="bg-gray-50 rounded-lg p-6 md:p-8 mb-12">
            <h2 className="text-2xl font-bold mb-6 text-center">Información de Contacto</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex flex-col items-center text-center">
                <MapPin className="w-10 h-10 text-vicar-blue mb-3" />
                <h3 className="font-medium text-lg mb-1">Ubicación</h3>
                <p className="text-gray-600">Av. Ejemplo 123, Lima</p>
                <p className="text-gray-600">Perú</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <Phone className="w-10 h-10 text-vicar-blue mb-3" />
                <h3 className="font-medium text-lg mb-1">Teléfonos</h3>
                <p className="text-gray-600">+51 999 999 999</p>
                <p className="text-gray-600">+51 (01) 555-5555</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <Clock className="w-10 h-10 text-vicar-blue mb-3" />
                <h3 className="font-medium text-lg mb-1">Horario</h3>
                <p className="text-gray-600">Lunes a Viernes: 9am - 7pm</p>
                <p className="text-gray-600">Sábados: 9am - 2pm</p>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">¿Necesitas un servicio especial?</h2>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Contamos con servicios personalizados para clientes corporativos y particulares.
              Contáctanos para recibir una cotización a medida.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a 
                href="https://wa.me/51999999999?text=Hola,%20necesito%20un%20servicio%20especial" 
                className="bg-vicar-whatsapp-green text-white px-6 py-3 rounded-md hover:bg-green-600 transition-colors flex items-center justify-center"
              >
                Contactar por WhatsApp
              </a>
              <Button variant="outline" asChild>
                <Link to="/productos">
                  Ver Productos
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Services;
