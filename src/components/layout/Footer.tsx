
import { Facebook, Instagram, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-vicar-footer-gray pt-10 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Column 1: Contact Information */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-gray-800">Encuéntranos y Contáctanos</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="mr-2 mt-1">📍</span>
                <a 
                  href="https://maps.google.com/?q=Av. Pailo Sime 123, San Miguel, Lima"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-700 hover:underline"
                >
                  Av. Pailo Sime 123, San Miguel, Lima
                </a>
              </li>
              <li className="flex items-center">
                <span className="mr-2">📞</span>
                <a 
                  href="tel:+51999999999"
                  className="text-gray-700 hover:underline"
                >
                  +51 999 999 999
                </a>
              </li>
              <li className="flex items-center">
                <span className="mr-2">📱</span>
                <a 
                  href="https://wa.me/51999999999"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-700 hover:underline"
                >
                  WhatsApp: +51 999 999 999
                </a>
              </li>
              <li className="flex items-center">
                <span className="mr-2">✉️</span>
                <a 
                  href="mailto:info@vicarperu.com"
                  className="text-gray-700 hover:underline"
                >
                  info@vicarperu.com
                </a>
              </li>
              <li className="flex items-start">
                <span className="mr-2 mt-1">🕑</span>
                <div>
                  <p className="text-gray-700">Lunes a Viernes: 9am - 6pm</p>
                  <p className="text-gray-700">Sábados: 9am - 2pm</p>
                </div>
              </li>
            </ul>
          </div>
          
          {/* Column 2: Important Information */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-gray-800">Información Importante</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/nosotros" className="text-gray-700 hover:underline">
                  Sobre Nosotros
                </Link>
              </li>
              <li>
                <Link to="/terminos-condiciones" className="text-gray-700 hover:underline">
                  Términos y Condiciones
                </Link>
              </li>
              <li>
                <Link to="/politica-privacidad" className="text-gray-700 hover:underline">
                  Política de Privacidad
                </Link>
              </li>
              <li>
                <Link to="/preguntas-frecuentes" className="text-gray-700 hover:underline">
                  Preguntas Frecuentes
                </Link>
              </li>
              <li>
                <Link to="/envios" className="text-gray-700 hover:underline">
                  Política de Envíos
                </Link>
              </li>
              <li>
                <Link to="/garantias" className="text-gray-700 hover:underline">
                  Garantías
                </Link>
              </li>
              <li>
                <Link to="/contacto" className="text-gray-700 hover:underline">
                  Formulario de Contacto
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Column 3: Newsletter and Social */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-gray-800">Recibe Ofertas Exclusivas</h3>
            <p className="text-gray-700 mb-3">
              Suscríbete a nuestro newsletter y no te pierdas nuestras promociones.
            </p>
            <div className="flex mb-6">
              <input 
                type="email" 
                placeholder="Tu correo electrónico"
                className="flex-grow px-4 py-2 rounded-l-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-vicar-blue"
              />
              <button 
                type="button"
                className="bg-vicar-blue text-white px-4 py-2 rounded-r-md hover:bg-blue-700 transition-colors"
              >
                Suscribirse
              </button>
            </div>
            
            <h4 className="text-md font-bold mb-3 text-gray-800">Síguenos</h4>
            <div className="flex gap-3">
              <a 
                href="https://facebook.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Síguenos en Facebook"
                className="bg-white p-2 rounded-full text-blue-600 hover:bg-blue-100 transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a 
                href="https://instagram.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Síguenos en Instagram"
                className="bg-white p-2 rounded-full text-pink-600 hover:bg-pink-100 transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
        
        {/* Bottom Line */}
        <div className="border-t border-gray-400 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-700 text-sm text-center md:text-left">
            © {currentYear} VICARPERU. Todos los derechos reservados.
          </p>
          <div className="flex gap-4 items-center">
            <span className="text-gray-600 text-sm">Medios de pago:</span>
            <div className="flex gap-2">
              <span className="bg-white px-2 py-1 rounded text-xs font-medium">Yape</span>
              <span className="bg-white px-2 py-1 rounded text-xs font-medium">Plin</span>
              <span className="bg-white px-2 py-1 rounded text-xs font-medium">BCP</span>
              <span className="bg-white px-2 py-1 rounded text-xs font-medium">IBK</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
