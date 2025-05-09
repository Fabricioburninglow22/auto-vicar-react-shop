
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const PromoBanner = () => {
  const offers = [
    "15% de descuento en alarmas Viper + instalación gratis",
    "20% de descuento en cámaras de retroceso + instalación",
    "Duplicado de llaves con chip desde S/ 150",
    "2x1 en luces LED para tu vehículo",
    "Autoradio Pioneer con instalación desde S/ 299"
  ];
  
  const [currentOffer, setCurrentOffer] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentOffer((prevOffer) => (prevOffer + 1) % offers.length);
    }, 4000);
    
    return () => clearInterval(interval);
  }, [offers.length]);
  
  return (
    <section className="bg-vicar-blue text-white py-8 md:py-12">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-6">¡OFERTA ESPECIAL!</h2>
        
        <div className="relative h-12 md:h-16 overflow-hidden mb-6">
          {offers.map((offer, index) => (
            <div
              key={index}
              className={`absolute w-full transition-all duration-500 ${
                index === currentOffer 
                  ? "opacity-100 transform translate-y-0" 
                  : "opacity-0 transform translate-y-8"
              }`}
            >
              <p className="text-lg md:text-2xl font-medium">{offer}</p>
            </div>
          ))}
        </div>
        
        <Link 
          to="/productos?offers=true"
          className="inline-block bg-white text-vicar-blue font-bold py-3 px-8 rounded-md hover:bg-gray-100 transition-colors"
        >
          Ver Ofertas
        </Link>
      </div>
    </section>
  );
};

export default PromoBanner;
