
import { useState } from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { ShoppingCart, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useShoppingContext } from '@/contexts/ShoppingContext';

const Cart = () => {
  const { cartItems, removeFromCart, updateCartItemQuantity } = useShoppingContext();
  const [loading, setLoading] = useState(false);

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * (item.quantity || 1)), 0);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar categories={[]} />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 flex items-center gap-2">
          <ShoppingCart className="w-8 h-8" />
          Mi Carrito
        </h1>
        
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="loader">Cargando...</div>
          </div>
        ) : cartItems.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              {cartItems.map(item => (
                <div key={item.id} className="flex border-b py-4">
                  <div className="w-24 h-24 rounded overflow-hidden mr-4">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-grow">
                    <h3 className="font-medium">{item.name}</h3>
                    <p className="text-vicar-blue font-bold mt-1">S/ {item.price.toFixed(2)}</p>
                    <div className="flex items-center mt-3">
                      <button 
                        className="w-8 h-8 border rounded-l-md flex items-center justify-center"
                        onClick={() => updateCartItemQuantity(item.id, (item.quantity || 1) - 1)}
                      >
                        -
                      </button>
                      <span className="w-10 h-8 border-t border-b flex items-center justify-center">
                        {item.quantity || 1}
                      </span>
                      <button 
                        className="w-8 h-8 border rounded-r-md flex items-center justify-center"
                        onClick={() => updateCartItemQuantity(item.id, (item.quantity || 1) + 1)}
                      >
                        +
                      </button>
                      <button 
                        className="ml-4 text-red-500 hover:text-red-700"
                        onClick={() => removeFromCart(item.id)}
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">S/ {(item.price * (item.quantity || 1)).toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="bg-gray-50 p-6 rounded-lg h-fit">
              <h3 className="text-xl font-bold mb-4">Resumen</h3>
              
              <div className="space-y-2 mb-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>S/ {calculateTotal().toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>IGV (18%)</span>
                  <span>S/ {(calculateTotal() * 0.18).toFixed(2)}</span>
                </div>
                <div className="border-t pt-2 mt-2 font-bold flex justify-between">
                  <span>Total</span>
                  <span>S/ {(calculateTotal() * 1.18).toFixed(2)}</span>
                </div>
              </div>
              
              <Button className="w-full bg-vicar-blue hover:bg-blue-700">
                Solicitar Cotización
              </Button>
              
              <p className="text-sm text-gray-500 mt-4 text-center">
                Nos comunicaremos contigo para finalizar tu pedido.
              </p>
            </div>
          </div>
        ) : (
          <div className="text-center py-16">
            <ShoppingCart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h2 className="text-2xl font-medium text-gray-600 mb-2">Tu carrito está vacío</h2>
            <p className="text-gray-500 mb-6">Agrega productos a tu carrito para verlos aquí</p>
            <a href="/productos" className="bg-vicar-blue text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors">
              Explorar Productos
            </a>
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default Cart;
