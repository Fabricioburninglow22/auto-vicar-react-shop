
import React from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import AdminFavorites from '@/components/admin/AdminFavorites';

const FavoritesPage = () => {
  return (
    <AdminLayout>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Análisis de Favoritos</h1>
        <AdminFavorites />
      </div>
    </AdminLayout>
  );
};

export default FavoritesPage;
