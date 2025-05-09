
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="bg-white py-8 md:py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Left Panel */}
          <div className="order-2 lg:order-1">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              VICARPERU: Protege y Mejora tu Vehículo
            </h1>
            <p className="text-lg text-gray-700 mb-6">
              Alarmas, GPS, Autoradios Pioneer, Luces LED, Duplicado de llaves con chip y Servicio de instalación profesional en Lima.
            </p>
            <Link
              to="/productos"
              className="bg-vicar-blue text-white px-6 py-3 rounded-md font-medium hover:bg-blue-700 transition-colors inline-block"
            >
              Explorar Catálogo
            </Link>
          </div>
          
          {/* Right Panel */}
          <div className="order-1 lg:order-2 relative">
            <img 
              src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1470&auto=format&fit=crop" 
              alt="Auto con productos VICARPERU" 
              className="rounded-lg shadow-lg w-full h-auto object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6 rounded-b-lg">
              <h2 className="text-white text-xl md:text-2xl font-bold mb-2">
                ¡Instalación GRATIS en Productos Seleccionados!
              </h2>
              <p className="text-white text-sm md:text-base mb-4">
                Aprovecha la instalación gratuita en alarmas Viper, autoradios Pioneer y más. ¡Consúltanos!
              </p>
              <Link
                to="/servicios"
                className="bg-white text-vicar-blue px-4 py-2 rounded-md font-medium hover:bg-gray-100 transition-colors inline-block text-sm"
              >
                Ver Servicios de Instalación
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
