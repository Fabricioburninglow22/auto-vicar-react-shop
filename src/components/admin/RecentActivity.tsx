
import React from 'react';

interface ActivityItem {
  id: string;
  action: string;
  user: string;
  datetime: string;
  target: string;
}

const RecentActivity = () => {
  // Mock data - in real app, this would come from API
  const activities: ActivityItem[] = [
    {
      id: '1',
      action: 'Producto creado',
      user: 'admin@vicar.com',
      datetime: '2025-05-10 14:30',
      target: 'Alarma Viper 3400V'
    },
    {
      id: '2',
      action: 'Producto actualizado',
      user: 'admin@vicar.com',
      datetime: '2025-05-10 13:15',
      target: 'Control remoto Pioneer'
    },
    {
      id: '3',
      action: 'Usuario registrado',
      user: 'usuario@example.com',
      datetime: '2025-05-10 11:45',
      target: 'usuario@example.com'
    },
    {
      id: '4',
      action: 'Banner promocional añadido',
      user: 'admin@vicar.com',
      datetime: '2025-05-09 16:20',
      target: 'Promoción Mayo 2025'
    },
    {
      id: '5',
      action: 'Categoría actualizada',
      user: 'admin@vicar.com',
      datetime: '2025-05-09 10:05',
      target: 'Alarmas'
    }
  ];

  return (
    <div className="bg-white shadow-sm rounded-lg overflow-hidden">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acción</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Usuario</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Elemento</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha/Hora</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {activities.map((activity) => (
            <tr key={activity.id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{activity.action}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{activity.user}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{activity.target}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{activity.datetime}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RecentActivity;
