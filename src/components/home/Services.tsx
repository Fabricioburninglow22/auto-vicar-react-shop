
import { Wrench, Shield, Car, Clock, CreditCard } from 'lucide-react';
import { Link } from 'react-router-dom';

const Services = () => {
  const services = [
    {
      id: 1,
      icon: <Car className="w-10 h-10 text-vicar-blue" />,
      title: "Instalación Profesional",
      description: "Instalamos todos nuestros productos con técnicos certificados y con los más altos estándares de calidad."
    },
    {
      id: 2,
      icon: <Shield className="w-10 h-10 text-vicar-blue" />,
      title: "Garantía en Todos los Servicios",
      description: "Ofrecemos garantía en todos nuestros trabajos de instalación y reparación."
    },
    {
      id: 3,
      icon: <Wrench className="w-10 h-10 text-vicar-blue" />,
      title: "Mantenimiento y Diagnóstico",
      description: "Servicio completo de diagnóstico y mantenimiento para sistemas eléctricos automotrices."
    },
    {
      id: 4,
      icon: <Wrench className="w-10 h-10 text-vicar-blue" />,
      title: "Reparación Especializada",
      description: "Reparación de sistemas de seguridad, audio, electrónica y más para tu vehículo."
    },
    {
      id: 5,
      icon: <Clock className="w-10 h-10 text-vicar-blue" />,
      title: "Servicio Express",
      description: "Atención prioritaria y servicios rápidos para emergencias con tu vehículo."
    },
    {
      id: 6,
      icon: <CreditCard className="w-10 h-10 text-vicar-blue" />,
      title: "Financiamiento Disponible",
      description: "Opciones de pago fraccionado para proyectos de mayor envergadura."
    }
  ];

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-2">Nuestros Servicios Profesionales</h2>
        <p className="text-gray-600 text-center mb-8">Contamos con técnicos calificados y garantizamos todos nuestros trabajos.</p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {services.map((service) => (
            <div 
              key={service.id}
              className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow h-full flex flex-col"
            >
              <div className="flex justify-center mb-4">
                {service.icon}
              </div>
              <h3 className="font-bold text-lg text-center mb-3">{service.title}</h3>
              <p className="text-gray-600 text-center flex-grow">{service.description}</p>
            </div>
          ))}
        </div>
        
        <div className="text-center">
          <Link 
            to="/servicios"
            className="inline-block bg-vicar-blue text-white px-6 py-3 rounded-md font-medium hover:bg-blue-700 transition-colors"
          >
            Descubrir Todos Nuestros Servicios
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Services;
