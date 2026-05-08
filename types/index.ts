export interface Category {
  id: string;
  name: string;
  slug: string;
  image: string | null;
}

export interface Product {
  id: string;
  category_id: string;
  title: string;
  slug: string;
  short_description: string;
  full_description: string;
  actual_price: number;
  discount_price: number | null;
  trending: boolean;
  popular: boolean;
  stock: number;
  images: string[];
  weight_options: { weight: string; price: number }[];
}

export interface CartItem extends Product {
  quantity: number;
  selectedWeight?: string;
  selectedPrice: number;
}