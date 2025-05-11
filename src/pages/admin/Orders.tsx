
import React from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import AdminOrders from '@/components/admin/AdminOrders';

const OrdersPage = () => {
  return (
    <AdminLayout>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Gestión de Pedidos</h1>
        <AdminOrders />
      </div>
    </AdminLayout>
  );
};

export default OrdersPage;
