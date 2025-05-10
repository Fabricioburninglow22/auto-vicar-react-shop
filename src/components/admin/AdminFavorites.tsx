
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { BarChart } from '@/components/ui/chart-components';

const AdminFavorites = () => {
  // Mock data for product in favorites
  const mockFavoriteProducts = [
    { 
      id: '1',
      name: 'Alarma Viper 3606V',
      category: 'Alarmas',
      favoriteCount: 24
    },
    {
      id: '2',
      name: 'Autoradio Pioneer MVH-S215BT',
      category: 'Autoradios',
      favoriteCount: 18
    },
    {
      id: '3',
      name: 'Batería Bosch S4 60D',
      category: 'Baterías',
      favoriteCount: 15
    },
    {
      id: '4',
      name: 'Parlantes Pioneer TS-A6960F',
      category: 'Parlantes',
      favoriteCount: 12
    },
    {
      id: '5',
      name: 'Alarma Prestige APS997E',
      category: 'Alarmas',
      favoriteCount: 10
    }
  ];

  // Mock data for chart
  const chartData = [
    {
      name: 'Alarmas',
      total: 34
    },
    {
      name: 'Autoradios',
      total: 28
    },
    {
      name: 'Baterías',
      total: 22
    },
    {
      name: 'Parlantes',
      total: 16
    },
    {
      name: 'Luces',
      total: 9
    }
  ];

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Análisis de Favoritos</h2>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardContent className="p-6">
            <div>
              <p className="text-sm font-medium text-gray-500">Total de productos en favoritos</p>
              <p className="text-3xl font-bold">109</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div>
              <p className="text-sm font-medium text-gray-500">Usuarios con favoritos</p>
              <p className="text-3xl font-bold">47</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div>
              <p className="text-sm font-medium text-gray-500">Promedio de favoritos por usuario</p>
              <p className="text-3xl font-bold">2.3</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Chart Card */}
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">Favoritos por Categoría</h3>
            <div className="h-80">
              <BarChart 
                data={chartData}
                index="name"
                categories={['total']}
                colors={['#3B82F6']}
                valueFormatter={(value: number) => `${value} favoritos`}
                yAxisWidth={40}
              />
            </div>
          </CardContent>
        </Card>

        {/* Top Products Card */}
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">Productos Más Favoriteados</h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Producto</TableHead>
                  <TableHead>Categoría</TableHead>
                  <TableHead className="text-right">Favoritos</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockFavoriteProducts.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell className="font-medium">{product.name}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-gray-100">
                        {product.category}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <span className="font-semibold">{product.favoriteCount}</span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      {/* Conversion Card */}
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4">Conversiones de Favoritos a Carrito</h3>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="p-4 bg-gray-50 rounded-md">
              <div className="text-sm font-medium text-gray-500">Ratio de conversión</div>
              <div className="text-3xl font-bold text-vicar-blue">32%</div>
              <div className="text-sm text-gray-500">de favoritos a carrito</div>
            </div>
            <div className="p-4 bg-gray-50 rounded-md">
              <div className="text-sm font-medium text-gray-500">Tiempo promedio</div>
              <div className="text-3xl font-bold text-vicar-blue">2.5 días</div>
              <div className="text-sm text-gray-500">de favorito a carrito</div>
            </div>
            <div className="p-4 bg-gray-50 rounded-md">
              <div className="text-sm font-medium text-gray-500">Productos Top</div>
              <div className="text-3xl font-bold text-vicar-blue">Alarmas</div>
              <div className="text-sm text-gray-500">mayor conversión</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminFavorites;
