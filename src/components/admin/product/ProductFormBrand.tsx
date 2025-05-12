
import React from 'react';
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Brand } from './ProductFormUtils';

interface ProductFormBrandProps {
  brands: Brand[];
  brandId: string;
  onBrandChange: (value: string) => void;
}

const ProductFormBrand: React.FC<ProductFormBrandProps> = ({
  brands,
  brandId,
  onBrandChange
}) => {
  return (
    <div>
      <Label htmlFor="brand">Marca *</Label>
      <Select 
        value={brandId} 
        onValueChange={onBrandChange}
      >
        <SelectTrigger>
          <SelectValue placeholder="Seleccionar marca" />
        </SelectTrigger>
        <SelectContent>
          {brands.length === 0 ? (
            <SelectItem value="no-brands">No hay marcas disponibles</SelectItem>
          ) : (
            brands.map((brand) => (
              <SelectItem key={brand.id} value={brand.id}>
                {brand.name} ({brand.prefix})
              </SelectItem>
            ))
          )}
        </SelectContent>
      </Select>
      {brands.length === 0 && (
        <p className="text-xs text-red-500 mt-1">
          No hay marcas disponibles. Por favor, cree al menos una marca primero.
        </p>
      )}
    </div>
  );
};

export default ProductFormBrand;
