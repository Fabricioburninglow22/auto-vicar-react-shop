
import { useState, useEffect } from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { Bell, Tag, Package, ShoppingCart, Clock } from 'lucide-react';

interface Notification {
  id: string;
  title: string;
  description: string;
  date: string;
  read: boolean;
  type: 'offer' | 'delivery' | 'order' | 'reminder';
}

const Notifications = () => {
  // Sample notifications data - in a real app, this would come from a database
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading notifications
    setTimeout(() => {
      setNotifications([
        {
          id: 'notif-1',
          title: '¡Nueva Oferta Disponible!',
          description: '15% de descuento en alarmas Viper este fin de semana',
          date: '2025-05-08',
          read: false,
          type: 'offer'
        },
        {
          id: 'notif-2',
          title: 'Pedido Entregado',
          description: 'Tu pedido #12345 ha sido entregado satisfactoriamente',
          date: '2025-05-07',
          read: true,
          type: 'delivery'
        },
        {
          id: 'notif-3',
          title: 'Cotización Lista',
          description: 'Hemos preparado tu cotización para Autoradio Pioneer',
          date: '2025-05-06',
          read: false,
          type: 'order'
        },
        {
          id: 'notif-4',
          title: 'Recordatorio de Servicio',
          description: 'Tu cita para mantenimiento está programada para mañana',
          date: '2025-05-05',
          read: true,
          type: 'reminder'
        }
      ]);
      setLoading(false);
    }, 800);
  }, []);

  const markAsRead = (id: string) => {
    setNotifications(notifications.map(notification => 
      notification.id === id ? { ...notification, read: true } : notification
    ));
  };

  const getIconForType = (type: string) => {
    switch (type) {
      case 'offer': return <Tag className="text-green-500" />;
      case 'delivery': return <Package className="text-blue-500" />;
      case 'order': return <ShoppingCart className="text-purple-500" />;
      case 'reminder': return <Clock className="text-orange-500" />;
      default: return <Bell className="text-gray-500" />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar categories={[]} />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 flex items-center gap-2">
          <Bell className="w-8 h-8" />
          Notificaciones
        </h1>
        
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="loader">Cargando...</div>
          </div>
        ) : notifications.length > 0 ? (
          <div className="space-y-4">
            {notifications.map(notification => (
              <div 
                key={notification.id} 
                className={`p-4 rounded-lg border ${notification.read ? 'bg-white' : 'bg-blue-50'}`}
                onClick={() => markAsRead(notification.id)}
              >
                <div className="flex">
                  <div className="mr-4 mt-1">
                    {getIconForType(notification.type)}
                  </div>
                  <div className="flex-grow">
                    <h3 className="font-medium">{notification.title}</h3>
                    <p className="text-gray-600">{notification.description}</p>
                    <p className="text-sm text-gray-500 mt-1">{new Date(notification.date).toLocaleDateString()}</p>
                  </div>
                  {!notification.read && (
                    <div className="w-3 h-3 rounded-full bg-vicar-blue"></div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <Bell className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h2 className="text-2xl font-medium text-gray-600 mb-2">No tienes notificaciones</h2>
            <p className="text-gray-500">Te notificaremos cuando haya novedades</p>
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default Notifications;
