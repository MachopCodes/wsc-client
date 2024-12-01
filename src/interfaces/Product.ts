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
    serving_temperature?: string; // VARCHAR(255),
    food_pairings?: string; // TEXT,
    grape_varietals?: string; // VARCHAR(255),
    ageing_process?: string; // TEXT,
    tasting_notes?: string; // TEXT,
    location_notes?: string; // TEXT,
    brand_description?: string; // TEXT,
    brand_image?: string; // VARCHAR(255),
    winemaker_notes?: string; // TEXT,
    harvesting_technique?: string; // TEXT;
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
    serving_temperature?: string; // VARCHAR(255),
    food_pairings?: string; // TEXT,
    grape_varietals?: string; // VARCHAR(255),
    ageing_process?: string; // TEXT,
    tasting_notes?: string; // TEXT,
    location_notes?: string; // TEXT,
    brand_description?: string; // TEXT,
    brand_image?: string; // VARCHAR(255),
    winemaker_notes?: string; // TEXT,
    harvesting_technique?: string; // TEXT;
  }

  export interface ImageUploadResult {
    event: string; // This could be further refined to "success" | "error" if those are the only options.
    info: {
      secure_url: string;
      [key: string]: unknown; // Optional to allow other properties if needed.
    };
  }
  