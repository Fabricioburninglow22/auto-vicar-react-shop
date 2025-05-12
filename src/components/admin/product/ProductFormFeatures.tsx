
import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface ProductFormFeaturesProps {
  features: string[];
  onChange: (features: string[]) => void;
}

const ProductFormFeatures: React.FC<ProductFormFeaturesProps> = ({ features, onChange }) => {
  const [newFeature, setNewFeature] = useState('');
  
  const handleAddFeature = () => {
    if (newFeature.trim() && !features.includes(newFeature.trim())) {
      onChange([...features, newFeature.trim()]);
      setNewFeature('');
    }
  };
  
  const handleRemoveFeature = (index: number) => {
    onChange(features.filter((_, i) => i !== index));
  };
  
  return (
    <div>
      <div className="flex space-x-2 mb-2">
        <Input
          value={newFeature}
          onChange={(e) => setNewFeature(e.target.value)}
          placeholder="Nueva característica..."
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              handleAddFeature();
            }
          }}
        />
        <Button 
          type="button" 
          variant="secondary" 
          onClick={handleAddFeature}
        >
          Agregar
        </Button>
      </div>
      
      <div className="mt-2 space-y-2 max-h-40 overflow-y-auto">
        {features.map((feature, index) => (
          <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded-md">
            <span>{feature}</span>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => handleRemoveFeature(index)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductFormFeatures;
