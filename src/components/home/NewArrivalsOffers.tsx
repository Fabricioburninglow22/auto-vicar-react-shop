
import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ChevronUp, ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ProductCard from '../shared/ProductCard';

const NewArrivals = () => {
  const navigate = useNavigate();
  
  const newProducts = [
    {
      id: "n1",
      name: "Consola Android CarPlay para Toyota Hilux 2018+",
      description: "Sistema multimedia con pantalla táctil, GPS, WiFi y más",
      price: 1299.99,
      image: "https://via.placeholder.com/400x300?text=Consola+Android",
      isNew: true
    },
    {
      id: "n2",
      name: "Kit de Iluminación Interior LED RGB con App",
      description: "Personaliza el interior de tu vehículo con control por aplicación",
      price: 149.99,
      image: "https://via.placeholder.com/400x300?text=LED+RGB",
      isNew: true
    },
    {
      id: "n3",
      name: "Sensor de Estacionamiento con Cámara 360°",
      description: "Visión completa alrededor del vehículo para estacionamiento seguro",
      price: 349.99,
      image: "https://via.placeholder.com/400x300?text=Sensor+Estacionamiento",
      isNew: true
    },
    {
      id: "n4",
      name: "Alarma Cobra Two Way Pager",
      description: "Respuesta bidireccional y notificaciones en tiempo real",
      price: 549.99,
      image: "https://via.placeholder.com/400x300?text=Alarma+Cobra",
      isNew: true
    }
  ];
  
  const offers = [
    {
      id: "o1",
      name: "Alarma Viper 3305V con Sensor de Impacto",
      description: "Sistema de seguridad con tecnología avanzada",
      price: 299.99,
      oldPrice: 349.99,
      image: "https://via.placeholder.com/400x300?text=Alarma+Oferta",
      badge: "20% OFF"
    },
    {
      id: "o2",
      name: "Kit Xenón H4 6000K SuperBright",
      description: "Luz blanca intensa y mayor visibilidad nocturna",
      price: 129.99,
      oldPrice: 179.99,
      image: "https://via.placeholder.com/400x300?text=Xenon+Kit",
      badge: "30% OFF"
    },
    {
      id: "o3",
      name: "Autoradio Pioneer MVH-S215BT Bluetooth",
      description: "Con control para Spotify y llamadas manos libres",
      price: 249.99,
      oldPrice: 299.99,
      image: "https://via.placeholder.com/400x300?text=Autoradio+Oferta",
      badge: "15% OFF"
    },
    {
      id: "o4",
      name: "Cámara de Retroceso HD Visión Nocturna",
      description: "Para mejor visibilidad al estacionarse",
      price: 89.99,
      oldPrice: 119.99,
      image: "https://via.placeholder.com/400x300?text=Camara+Retroceso",
      badge: "25% OFF"
    },
    {
      id: "o5",
      name: "Servicio de Programación de Llaves",
      description: "Compatible con más de 40 marcas de vehículos",
      price: 149.99,
      oldPrice: 199.99,
      image: "https://via.placeholder.com/400x300?text=Programacion+Llaves",
      badge: "25% OFF"
    },
    {
      id: "o6",
      name: "Kit Completo de Parlantes Pioneer",
      description: "4 parlantes + amplificador + subwoofer + instalación",
      price: 899.99,
      oldPrice: 1099.99,
      image: "https://via.placeholder.com/400x300?text=Kit+Audio",
      badge: "25% OFF"
    }
  ];
  
  const [currentArrivalsIndex, setCurrentArrivalsIndex] = useState(0);
  const [currentOfferIndex, setCurrentOfferIndex] = useState(0);
  const [visibleOffers, setVisibleOffers] = useState(3);
  
  // Handle window resize to determine number of visible offers
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setVisibleOffers(1);
      } else if (window.innerWidth < 1024) {
        setVisibleOffers(2);
      } else {
        setVisibleOffers(3);
      }
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  const handleArrivalsScroll = (direction: "left" | "right") => {
    if (direction === "left") {
      setCurrentArrivalsIndex((prev) => 
        prev === 0 ? newProducts.length - 1 : prev - 1
      );
    } else {
      setCurrentArrivalsIndex((prev) => 
        (prev + 1) % newProducts.length
      );
    }
  };
  
  const handleOffersScroll = (direction: "up" | "down") => {
    if (direction === "up") {
      setCurrentOfferIndex((prev) => 
        prev === 0 ? Math.max(0, offers.length - visibleOffers) : Math.max(0, prev - 1)
      );
    } else {
      setCurrentOfferIndex((prev) => 
        prev >= (offers.length - visibleOffers) ? 0 : prev + 1
      );
    }
  };
  
  const handleProductClick = (productId: string) => {
    navigate(`/producto/${productId}`);
  };
  
  const handleOfferClick = (offerId: string) => {
    navigate(`/producto/${offerId}`);
  };
  
  // Auto rotate offers
  useEffect(() => {
    const interval = setInterval(() => {
      handleOffersScroll("down");
    }, 5000);
    
    return () => clearInterval(interval);
  }, [currentOfferIndex, visibleOffers]);

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* New Arrivals - 60% width */}
          <div className="lg:col-span-3">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Novedades que llegaron</h2>
              <div className="flex gap-2">
                <button 
                  onClick={() => handleArrivalsScroll("left")}
                  className="p-1 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button 
                  onClick={() => handleArrivalsScroll("right")}
                  className="p-1 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
            
            <div className="relative h-[400px] overflow-hidden rounded-lg bg-gray-50">
              {newProducts.map((product, index) => (
                <div 
                  key={product.id}
                  className={`absolute inset-0 transition-opacity duration-500 ${
                    index === currentArrivalsIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
                  } p-4`}
                >
                  <div className="h-full flex">
                    {/* Product Image */}
                    <div className="w-1/2 pr-4">
                      <div className="relative h-full">
                        <img 
                          src={product.image} 
                          alt={product.name}
                          className="w-full h-full object-cover rounded-lg"
                        />
                        <div className="absolute top-2 right-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded">
                          NUEVO
                        </div>
                      </div>
                    </div>
                    
                    {/* Product Info */}
                    <div className="w-1/2 flex flex-col justify-center">
                      <h3 className="text-xl font-bold mb-3">{product.name}</h3>
                      <p className="text-gray-600 mb-4">{product.description}</p>
                      <div className="mt-auto">
                        <span className="text-vicar-blue text-2xl font-bold block mb-4">S/ {product.price.toFixed(2)}</span>
                        <button 
                          onClick={() => handleProductClick(product.id)}
                          className="bg-vicar-blue text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors w-full"
                        >
                          Ver detalles
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Offers - 40% width */}
          <div className="lg:col-span-2">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Ofertas imperdibles</h2>
              <div className="flex gap-2">
                <button 
                  onClick={() => handleOffersScroll("up")}
                  className="p-1 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors"
                >
                  <ChevronUp className="w-5 h-5" />
                </button>
                <button 
                  onClick={() => handleOffersScroll("down")}
                  className="p-1 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors"
                >
                  <ChevronDown className="w-5 h-5" />
                </button>
              </div>
            </div>
            
            <div className="h-[400px] overflow-hidden bg-gray-50 rounded-lg relative">
              <div 
                className="flex flex-col transition-transform duration-500"
                style={{
                  transform: `translateY(-${currentOfferIndex * (100 / visibleOffers)}%)`,
                  height: `${(offers.length / visibleOffers) * 100}%`
                }}
              >
                {offers.map((offer) => (
                  <div 
                    key={offer.id} 
                    className="p-3" 
                    style={{ height: `${100 / visibleOffers}%` }}
                  >
                    <div className="bg-white rounded-lg shadow-md overflow-hidden h-full">
                      <div className="relative">
                        <img 
                          src={offer.image} 
                          alt={offer.name}
                          className="w-full h-32 object-cover"
                        />
                        <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                          {offer.badge}
                        </div>
                        <div className="absolute bottom-2 right-2 bg-black bg-opacity-50 px-2 py-1 rounded">
                          <span className="text-white text-xs line-through mr-1">
                            S/ {offer.oldPrice?.toFixed(2)}
                          </span>
                          <span className="text-white font-bold">
                            S/ {offer.price.toFixed(2)}
                          </span>
                        </div>
                      </div>
                      <div className="p-3">
                        <h3 className="font-bold text-gray-800 mb-1 line-clamp-1">{offer.name}</h3>
                        <p className="text-gray-600 text-sm line-clamp-2 mb-3">{offer.description}</p>
                        <button 
                          className="w-full bg-vicar-blue text-white py-2 rounded text-sm hover:bg-blue-700 transition-colors"
                          onClick={() => handleOfferClick(offer.id)}
                        >
                          Ver oferta
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewArrivals;
