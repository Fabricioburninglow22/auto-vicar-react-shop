
import { useState, useEffect } from 'react';
import { X } from 'lucide-react';

interface EventPopupProps {
  eventId: string;
  title: string;
  description: string;
  dateRange: string;
  imageUrl: string;
  targetUrl: string;
}

const EventPopup = ({
  eventId,
  title,
  description,
  dateRange,
  imageUrl,
  targetUrl
}: EventPopupProps) => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const hasSeenEvent = localStorage.getItem(`event_${eventId}_seen`);
    
    if (!hasSeenEvent) {
      // Show popup after a short delay for better UX
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 2000);
      
      return () => clearTimeout(timer);
    }
  }, [eventId]);
  
  const closePopup = () => {
    setIsVisible(false);
  };
  
  const hideForever = () => {
    localStorage.setItem(`event_${eventId}_seen`, 'true');
    setIsVisible(false);
  };
  
  if (!isVisible) return null;
  
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black bg-opacity-50 animate-fade-in">
      <div className="bg-white rounded-lg shadow-xl w-[90%] max-w-md overflow-hidden animate-fade-in-up">
        {/* Close button */}
        <button 
          onClick={closePopup}
          aria-label="Cerrar"
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 z-10"
        >
          <X className="w-6 h-6" />
        </button>
        
        {/* Badge */}
        <div className="absolute top-4 left-4 bg-vicar-blue text-white text-xs px-2 py-1 rounded-md font-medium">
          Evento Especial
        </div>
        
        {/* Image */}
        <div className="w-full h-48">
          <img 
            src={imageUrl} 
            alt={title} 
            className="w-full h-full object-cover"
          />
        </div>
        
        {/* Content */}
        <div className="p-5">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">{title}</h2>
          <p className="text-gray-600 mb-3">{description}</p>
          <p className="text-sm text-gray-500 mb-4">{dateRange}</p>
          
          <div className="flex flex-col space-y-3">
            <a 
              href={targetUrl}
              className="bg-vicar-blue text-white py-2 rounded-md text-center font-medium hover:bg-blue-700 transition-colors"
            >
              Ver Ofertas
            </a>
            
            <button 
              onClick={hideForever}
              className="text-gray-500 text-sm hover:underline"
            >
              No mostrar de nuevo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventPopup;
