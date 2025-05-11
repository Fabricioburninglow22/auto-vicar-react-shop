
import React from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import AdminAnnouncements from '@/components/admin/AdminAnnouncements';

const AnnouncementsPage = () => {
  return (
    <AdminLayout>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Gestión de Anuncios</h1>
        <AdminAnnouncements />
      </div>
    </AdminLayout>
  );
};

export default AnnouncementsPage;
