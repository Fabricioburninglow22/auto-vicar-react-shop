
import React from 'react';
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Category, Subcategory } from './ProductFormUtils';

interface ProductFormCategoriesProps {
  categories: Category[];
  subcategories: Subcategory[];
  filteredSubcategories: Subcategory[];
  categoryId: string;
  subcategoryId: string;
  onCategoryChange: (value: string) => void;
  onSubcategoryChange: (value: string) => void;
}

const ProductFormCategories: React.FC<ProductFormCategoriesProps> = ({
  categories,
  filteredSubcategories,
  categoryId,
  subcategoryId,
  onCategoryChange,
  onSubcategoryChange
}) => {
  return (
    <>
      <div>
        <Label htmlFor="category">Categoría *</Label>
        <Select 
          value={categoryId} 
          onValueChange={onCategoryChange}
        >
          <SelectTrigger>
            <SelectValue placeholder="Seleccionar categoría" />
          </SelectTrigger>
          <SelectContent>
            {categories.length === 0 ? (
              <SelectItem value="no-categories">No hay categorías disponibles</SelectItem>
            ) : (
              categories.map((category) => (
                <SelectItem key={category.id} value={category.id}>
                  {category.name} ({category.prefix})
                </SelectItem>
              ))
            )}
          </SelectContent>
        </Select>
        {categories.length === 0 && (
          <p className="text-xs text-red-500 mt-1">
            No hay categorías disponibles. Por favor, cree al menos una categoría.
          </p>
        )}
      </div>
      
      <div>
        <Label htmlFor="subcategory">Subcategoría</Label>
        <Select 
          value={subcategoryId} 
          onValueChange={onSubcategoryChange}
          disabled={!categoryId || (filteredSubcategories.length === 0 && categoryId !== "no-categories")}
        >
          <SelectTrigger>
            <SelectValue placeholder="Seleccionar subcategoría" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="none">Sin subcategoría</SelectItem>
            {filteredSubcategories.map((subcategory) => (
              <SelectItem key={subcategory.id} value={subcategory.id}>
                {subcategory.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </>
  );
};

export default ProductFormCategories;
