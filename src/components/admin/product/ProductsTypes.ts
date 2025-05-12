
export interface Product {
  id: string;
  name: string;
  sku: string;
  price: number;
  sale_price: number | null;
  stock: number;
  is_active: boolean;
  is_featured: boolean;
  category: string | null;
  category_id: string | null;
  brand: string | null;
  brand_id: string | null;
  subcategory_id: string | null;
  description: string | null;
  features: any;
  sale_start_date: string | null;
  sale_end_date: string | null;
}

export interface Category {
  id: string;
  name: string;
}

export interface Brand {
  id: string;
  name: string;
}

export interface ProductFilter {
  searchQuery: string;
  categoryFilter: string;
  brandFilter: string;
  statusFilter: string;
}
