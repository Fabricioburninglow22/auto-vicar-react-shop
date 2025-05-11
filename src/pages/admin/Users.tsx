
import React from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import AdminUsers from '@/components/admin/AdminUsers';

const UsersPage = () => {
  return (
    <AdminLayout>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Gestión de Usuarios</h1>
        <AdminUsers />
      </div>
    </AdminLayout>
  );
};

export default UsersPage;
