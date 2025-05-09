
import { Check } from 'lucide-react';
import { Link } from 'react-router-dom';

const WhyChooseUs = () => {
  const reasons = [
    "Más de 10 años de experiencia en el mercado automotriz",
    "Técnicos certificados y en constante capacitación",
    "Productos originales con garantía oficial",
    "Servicio postventa personalizado",
    "Atención rápida y eficiente",
    "Precios competitivos y opciones de financiamiento"
  ];

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-2">¿Por qué elegir VICARPERU?</h2>
        <p className="text-gray-600 text-center mb-8">Nos distinguimos por ofrecer calidad, profesionalismo y confianza en cada servicio.</p>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - List of Reasons */}
          <div className="bg-white p-6 rounded-lg shadow">
            <ul className="space-y-4">
              {reasons.map((reason, index) => (
                <li key={index} className="flex items-start">
                  <div className="bg-vicar-blue rounded-full p-1 mr-3 mt-0.5">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-gray-700">{reason}</span>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Right Column - Image with Overlay */}
          <div className="relative rounded-lg overflow-hidden h-80 lg:h-auto">
            <img 
              src="https://images.unsplash.com/photo-1625047509252-ab38fb5c7343?q=80&w=1470&auto=format&fit=crop" 
              alt="Equipo de técnicos VICARPERU" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col justify-end p-6">
              <h3 className="text-white text-xl font-bold mb-3">Instalaciones y Atención de Primera</h3>
              <p className="text-gray-200 mb-4">Contamos con un taller equipado con tecnología de punta y un equipo de profesionales listos para atender tus necesidades.</p>
              <Link 
                to="/servicios"
                className="text-vicar-blue hover:text-blue-700 transition-colors font-medium text-sm"
              >
                Conoce más sobre nuestros servicios
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
