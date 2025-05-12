
import React from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";

interface ProductFormBasicInfoProps {
  name: string;
  setName: (name: string) => void;
  sku: string;
  setSku: (sku: string) => void;
  price: string;
  setPrice: (price: string) => void;
  salePrice: string;
  setSalePrice: (salePrice: string) => void;
  stock: string;
  setStock: (stock: string) => void;
  description: string;
  setDescription: (description: string) => void;
  isActive: boolean;
  setIsActive: (isActive: boolean) => void;
  isFeatured: boolean;
  setIsFeatured: (isFeatured: boolean) => void;
}

const ProductFormBasicInfo: React.FC<ProductFormBasicInfoProps> = ({
  name,
  setName,
  sku,
  setSku,
  price,
  setPrice,
  salePrice,
  setSalePrice,
  stock,
  setStock,
  description,
  setDescription,
  isActive,
  setIsActive,
  isFeatured,
  setIsFeatured
}) => {
  return (
    <>
      <div>
        <Label htmlFor="name">Nombre del Producto *</Label>
        <Input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Ej. Alarma Viper 3606V"
          required
        />
      </div>
      
      <div>
        <Label htmlFor="sku">SKU *</Label>
        <Input
          id="sku"
          value={sku}
          onChange={(e) => setSku(e.target.value.toUpperCase())}
          placeholder="Formato: AAA-BBB-12345"
          required
        />
        <p className="text-xs text-gray-500 mt-1">
          Formato: [PREFIJO_CATEGORIA]-[PREFIJO_MARCA]-[IDENTIFICADOR]
        </p>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="price">Precio Regular (S/) *</Label>
          <Input
            id="price"
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="0.00"
            min="0.01"
            step="0.01"
            required
          />
        </div>
        
        <div>
          <Label htmlFor="salePrice">Precio de Oferta (S/)</Label>
          <Input
            id="salePrice"
            type="number"
            value={salePrice}
            onChange={(e) => setSalePrice(e.target.value)}
            placeholder="0.00"
            min="0.01"
            step="0.01"
          />
        </div>
      </div>
      
      <div>
        <Label htmlFor="stock">Stock (Unidades)</Label>
        <Input
          id="stock"
          type="number"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
          placeholder="1"
          min="0"
        />
      </div>
      
      <div>
        <Label htmlFor="description">Descripción</Label>
        <Textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Descripción detallada del producto..."
          rows={3}
        />
      </div>
      
      <div className="flex space-x-8">
        <div className="flex items-center space-x-2">
          <Switch
            id="is-active"
            checked={isActive}
            onCheckedChange={setIsActive}
          />
          <Label htmlFor="is-active">Activo</Label>
        </div>
        
        <div className="flex items-center space-x-2">
          <Switch
            id="is-featured"
            checked={isFeatured}
            onCheckedChange={setIsFeatured}
          />
          <Label htmlFor="is-featured">Destacado</Label>
        </div>
      </div>
    </>
  );
};

export default ProductFormBasicInfo;
