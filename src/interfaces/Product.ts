import { RowDataPacket } from "mysql2";

export interface Product extends RowDataPacket {
    id: number;
    name: string;
    year?: number;
    region?: string;
    type?: string;
    price?: string; // Stored as a string to match potential backend format
    image?: string; // URL of the product image
    description?: string;
  }

  export interface ProductCardProps {
    product: Product;
  }

 export interface ProductEditForm {
    name: string;
    year?: string;
    region?: string;
    type?: string;
    price?: string;
    image?: string;
    description?: string;
  }

  export interface ImageUploadResult {
    event: string; // This could be further refined to "success" | "error" if those are the only options.
    info: {
      secure_url: string;
      [key: string]: unknown; // Optional to allow other properties if needed.
    };
  }
  