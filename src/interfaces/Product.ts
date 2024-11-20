export interface Product {
    id: number;
    name: string;
    year?: number;
    region?: string;
    type?: string;
    price?: string; // Stored as a string to match potential backend format
    image?: string; // URL of the product image
    description?: string;
  }