
import React from 'react';
import { Package, ShoppingBag, Heart, User } from 'lucide-react';

const StatCard = ({ 
  title, 
  value, 
  icon: Icon, 
  color 
}: { 
  title: string; 
  value: string; 
  icon: React.ElementType; 
  color: string;
}) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <div className="flex items-center">
        <div className={`p-3 rounded-full ${color} bg-opacity-20 mr-4`}>
          <Icon className={`h-6 w-6 ${color.replace('bg-', 'text-')}`} />
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className="text-2xl font-semibold">{value}</p>
        </div>
      </div>
    </div>
  );
};

const DashboardStats = () => {
  // For now, use static data. In a real implementation, this would come from API calls
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard 
        title="Total Productos" 
        value="152" 
        icon={Package} 
        color="bg-blue-500" 
      />
      <StatCard 
        title="Carritos Activos" 
        value="8" 
        icon={ShoppingBag}
        color="bg-green-500" 
      />
      <StatCard 
        title="Productos en Favoritos" 
        value="47" 
        icon={Heart} 
        color="bg-red-500" 
      />
      <StatCard 
        title="Usuarios Registrados" 
        value="65" 
        icon={User} 
        color="bg-purple-500" 
      />
    </div>
  );
};

export default DashboardStats;
