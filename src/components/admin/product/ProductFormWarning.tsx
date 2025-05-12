
import React from 'react';
import { AlertCircle } from "lucide-react";

interface ProductFormWarningProps {
  hasBrands: boolean;
  hasCategories: boolean;
}

const ProductFormWarning: React.FC<ProductFormWarningProps> = ({ hasBrands, hasCategories }) => {
  if (hasBrands && hasCategories) return null;
  
  return (
    <div className="bg-yellow-50 border border-yellow-200 rounded-md p-3 mt-2 flex items-start">
      <AlertCircle className="h-5 w-5 text-yellow-500 mr-2 flex-shrink-0 mt-0.5" />
      <div>
        <h3 className="text-sm font-medium text-yellow-800">Atención</h3>
        <div className="text-sm text-yellow-700 mt-1">
          <p>Antes de crear productos, debes tener al menos:</p>
          <ul className="list-disc ml-5 mt-1">
            {(!hasCategories) && (
              <li className="mb-1">
                Una <a href="/admin/categorias" className="text-blue-600 hover:underline">categoría</a>
              </li>
            )}
            {(!hasBrands) && (
              <li>
                Una <a href="/admin/marcas" className="text-blue-600 hover:underline">marca</a>
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ProductFormWarning;
