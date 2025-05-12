
import React from 'react';
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Category, Brand, ProductFilter } from './ProductsTypes';

interface ProductsFilterProps {
  categories: Category[];
  brands: Brand[];
  filters: ProductFilter;
  onFiltersChange: (filters: ProductFilter) => void;
}

const ProductsFilter: React.FC<ProductsFilterProps> = ({
  categories,
  brands,
  filters,
  onFiltersChange
}) => {
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFiltersChange({
      ...filters,
      searchQuery: e.target.value
    });
  };
  
  const handleCategoryChange = (value: string) => {
    onFiltersChange({
      ...filters,
      categoryFilter: value
    });
  };
  
  const handleBrandChange = (value: string) => {
    onFiltersChange({
      ...filters,
      brandFilter: value
    });
  };
  
  const handleStatusChange = (value: string) => {
    onFiltersChange({
      ...filters,
      statusFilter: value
    });
  };
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <Input
          placeholder="Buscar por nombre o SKU"
          value={filters.searchQuery}
          onChange={handleSearchChange}
          className="pl-10"
        />
      </div>
      
      <Select value={filters.categoryFilter} onValueChange={handleCategoryChange}>
        <SelectTrigger>
          <SelectValue placeholder="Filtrar por categoría" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Todas las categorías</SelectItem>
          {categories.map((category) => (
            <SelectItem key={category.id} value={category.id}>{category.name}</SelectItem>
          ))}
        </SelectContent>
      </Select>
      
      <Select value={filters.brandFilter} onValueChange={handleBrandChange}>
        <SelectTrigger>
          <SelectValue placeholder="Filtrar por marca" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Todas las marcas</SelectItem>
          {brands.map((brand) => (
            <SelectItem key={brand.id} value={brand.id}>{brand.name}</SelectItem>
          ))}
        </SelectContent>
      </Select>
      
      <Select value={filters.statusFilter} onValueChange={handleStatusChange}>
        <SelectTrigger>
          <SelectValue placeholder="Filtrar por estado" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Todos los estados</SelectItem>
          <SelectItem value="active">Activos</SelectItem>
          <SelectItem value="inactive">Inactivos</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default ProductsFilter;
