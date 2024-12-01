import { Product } from "@/interfaces/Product";
import { createConnection } from "@/utils/db";
import { ResultSetHeader } from "mysql2/promise";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const db = await createConnection(); // Create a new connection for this request
  try {
    const { id } = await context.params;
    const productId = parseInt(id, 10);

    if (isNaN(productId)) {
      return NextResponse.json(
        { error: "Invalid product ID" },
        { status: 400 }
      );
    }

    const sql = "SELECT * FROM product WHERE id = ?";
    const [rows] = await db.query<Product[]>(sql, [productId]);

    if (rows.length === 0) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json(rows[0]);
  } catch (error: unknown) {
    console.error("Error fetching product:", error);
    return NextResponse.json(
      { error: "Failed to fetch product" },
      { status: 500 }
    );
  } finally {
    if (db) await db.end(); // Explicitly close the connection
  }
}

export async function DELETE(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const db = await createConnection(); // Create a new connection for this request
  try {
    const { id } = await context.params;

    const sql = "DELETE FROM product WHERE id = ?";
    const [result] = await db.execute<ResultSetHeader>(sql, [id]);

    if (result.affectedRows === 0) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Product deleted successfully" });
  } catch (error: unknown) {
    console.error("Error deleting product:", error);
    return NextResponse.json(
      { error: "Failed to delete product" },
      { status: 500 }
    );
  } finally {
    if (db) await db.end(); // Explicitly close the connection
  }
}

export async function PUT(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const db = await createConnection(); // Create a new connection for this request
  try {
    const { id: productId } = await context.params;

    // Parse the request body
    const body = await req.json();

    // Ensure the ID is valid
    if (!productId || isNaN(Number(productId))) {
      return NextResponse.json(
        { error: "Invalid product ID" },
        { status: 400 }
      );
    }

    // Updated SQL query to include the new columns
    const sql = `
      UPDATE product
      SET 
      name = COALESCE(?, name),
      year = COALESCE(?, year),
      region = COALESCE(?, region),
      type = COALESCE(?, type),
      price = COALESCE(?, price),
      image = COALESCE(?, image),
      description = COALESCE(?, description),
      serving_temperature = COALESCE(?, serving_temperature),
      food_pairings = COALESCE(?, food_pairings),
      grape_varietals = COALESCE(?, grape_varietals),
      ageing_process = COALESCE(?, ageing_process),
      tasting_notes = COALESCE(?, tasting_notes),
      location_notes = COALESCE(?, location_notes),
      brand_description = COALESCE(?, brand_description),
      brand_image = COALESCE(?, brand_image),
      winemaker_notes = COALESCE(?, winemaker_notes),
      harvesting_technique = COALESCE(?, harvesting_technique)
      WHERE id = ?
    `;

    const price = body.price === "" ? null : body.price;

    const [result] = await db.execute<ResultSetHeader>(sql, [
      body.name ?? null,
      body.year ?? null,
      body.region ?? null,
      body.type ?? null,
      price,
      body.image ?? null,
      body.description ?? null,
      body.serving_temperature ?? null,
      body.food_pairings ?? null,
      body.grape_varietals ?? null,
      body.ageing_process ?? null,
      body.tasting_notes ?? null,
      body.location_notes ?? null,
      body.brand_description ?? null,
      body.brand_image ?? null,
      body.winemaker_notes ?? null,
      body.harvesting_technique ?? null,
      productId,
    ]);

    if (result.affectedRows === 0) {
      return NextResponse.json(
        { error: "Product not found or no changes made" },
        { status: 404 }
      );
    }

    const [rows] = await db.query<Product[]>(
      "SELECT * FROM product WHERE id = ?",
      [productId]
    );

    if (rows.length === 0) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json(rows[0]);
  } catch (error: unknown) {
    console.error("Error updating product:", error);
    return NextResponse.json(
      { error: "Failed to update product" },
      { status: 500 }
    );
  } finally {
    if (db) await db.end();
  }
}
