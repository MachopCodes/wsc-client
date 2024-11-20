import { createConnection } from "@/utils/db";
import { NextResponse } from "next/server";


export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
      const { id } = await params; // Await params
      const db = await createConnection();
      const productId = parseInt(id, 10);
  
      if (isNaN(productId)) {
        return NextResponse.json(
          { error: "Invalid product ID" },
          { status: 400 }
        );
      }
  
      const sql = "SELECT * FROM product WHERE id = ?";
      const [rows] = await db.query(sql, [productId]);
  
      if (rows.length === 0) {
        return NextResponse.json({ error: "Product not found" }, { status: 404 });
      }
  
      return NextResponse.json(rows[0]);
    } catch (error: any) {
      console.error("Error fetching product:", error);
      return NextResponse.json(
        { error: "Failed to fetch product" },
        { status: 500 }
      );
    }
  }

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    // Ensure `params.id` is awaited before accessing
    const { id } = params;

    if (!id) {
      return NextResponse.json({ error: "Product ID is required" }, { status: 400 });
    }

    const db = await createConnection();
    const sql = "DELETE FROM product WHERE id = ?";
    const [result] = await db.execute(sql, [id]);

    if (result.affectedRows === 0) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Product deleted successfully" });
  } catch (error: any) {
    console.error("Error deleting product:", error);
    return NextResponse.json({ error: "Failed to delete product" }, { status: 500 });
  }
}


export async function PUT(req: Request, { params }: { params: { id: string } }) {
    try {
      const db = await createConnection();
  
      // Parse the request body
      const body = await req.json();
      const productId = params.id;
  
      // Ensure the ID is valid
      if (!productId || isNaN(Number(productId))) {
        return NextResponse.json(
          { error: "Invalid product ID" },
          { status: 400 }
        );
      }

      
      // Construct the SQL query to update the product
      const sql = `
      UPDATE product
      SET 
      name = COALESCE(?, name),
      year = COALESCE(?, year),
      region = COALESCE(?, region),
      type = COALESCE(?, type),
      price = COALESCE(?, price),
      image = COALESCE(?, image),
      description = COALESCE(?, description)
      WHERE id = ?
      `;
      
      // Safely handle the price field and convert empty strings to null
      const price = body.price === "" ? null : body.price;
      
      // Execute the query with parameters
      const [result] = await db.execute(sql, [
        body.name ?? null,
        body.year ?? null,
        body.region ?? null,
        body.type ?? null,
        price,
        body.image ?? null,
        body.description ?? null,
        productId,
      ]);
  
      // Check if the product was updated
      if ((result as any).affectedRows === 0) {
        return NextResponse.json(
          { error: "Product not found or no changes made" },
          { status: 404 }
        );
      }
  
      // Fetch the updated product
      const [updatedProduct] = await db.execute(
        "SELECT * FROM product WHERE id = ?",
        [productId]
      );
  
      return NextResponse.json(updatedProduct[0]);
    } catch (error: any) {
      console.error("Error updating product:", error);
      return NextResponse.json(
        { error: "Failed to update product" },
        { status: 500 }
      );
    }
  }


