
import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Loader2, MoreVertical } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Product } from './ProductsTypes';

interface ProductsTableProps {
  products: Product[];
  isLoading: boolean;
  onEdit: (product: Product) => void;
  onDelete: (productId: string) => void;
}

const ProductsTable: React.FC<ProductsTableProps> = ({
  products,
  isLoading,
  onEdit,
  onDelete
}) => {
  const formatPrice = (price: number | null) => {
    if (price === null) return '-';
    return `S/ ${price.toFixed(2)}`;
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>SKU</TableHead>
          <TableHead>Producto</TableHead>
          <TableHead>Categoría</TableHead>
          <TableHead>Marca</TableHead>
          <TableHead>Precio</TableHead>
          <TableHead>Oferta</TableHead>
          <TableHead>Stock</TableHead>
          <TableHead>Estado</TableHead>
          <TableHead className="text-right">Acciones</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {isLoading ? (
          <TableRow>
            <TableCell colSpan={9} className="h-24 text-center">
              <div className="flex items-center justify-center">
                <Loader2 className="h-6 w-6 animate-spin text-gray-500" />
                <span className="ml-2">Cargando productos...</span>
              </div>
            </TableCell>
          </TableRow>
        ) : products.length === 0 ? (
          <TableRow>
            <TableCell colSpan={9} className="h-24 text-center">
              No se encontraron productos
            </TableCell>
          </TableRow>
        ) : (
          products.map((product) => (
            <TableRow key={product.id}>
              <TableCell className="font-mono text-sm">{product.sku}</TableCell>
              <TableCell>
                <div className="font-medium">{product.name}</div>
                {product.is_featured && (
                  <Badge variant="secondary" className="mt-1 bg-blue-100">
                    Destacado
                  </Badge>
                )}
              </TableCell>
              <TableCell>{product.category || '-'}</TableCell>
              <TableCell>{product.brand || '-'}</TableCell>
              <TableCell>{formatPrice(product.price)}</TableCell>
              <TableCell>
                {product.sale_price ? (
                  <span className="text-green-600 font-medium">
                    {formatPrice(product.sale_price)}
                  </span>
                ) : (
                  '-'
                )}
              </TableCell>
              <TableCell>{product.stock}</TableCell>
              <TableCell>
                {product.is_active ? (
                  <div className="flex items-center">
                    <div className="h-2.5 w-2.5 rounded-full bg-green-500 mr-2"></div>
                    <span>Activo</span>
                  </div>
                ) : (
                  <div className="flex items-center">
                    <div className="h-2.5 w-2.5 rounded-full bg-gray-300 mr-2"></div>
                    <span>Inactivo</span>
                  </div>
                )}
              </TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <span className="sr-only">Abrir menú</span>
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                    <DropdownMenuItem 
                      onClick={() => onEdit(product)}
                    >
                      Editar producto
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem 
                      onClick={() => onDelete(product.id)}
                      className="text-red-600"
                    >
                      Eliminar producto
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
};

export default ProductsTable;
