
import React from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import AdminBanners from '@/components/admin/AdminBanners';

const BannersPage = () => {
  return (
    <AdminLayout>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Gestión de Banners</h1>
        <AdminBanners />
      </div>
    </AdminLayout>
  );
};

export default BannersPage;
