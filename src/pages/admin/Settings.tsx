
import React from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import AdminSettings from '@/components/admin/AdminSettings';

const SettingsPage = () => {
  return (
    <AdminLayout>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Configuración del Sistema</h1>
        <AdminSettings />
      </div>
    </AdminLayout>
  );
};

export default SettingsPage;
