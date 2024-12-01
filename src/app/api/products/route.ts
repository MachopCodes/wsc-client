import { ProductEditForm } from "@/interfaces/Product";
import { createConnection } from "@/utils/db";
import { ResultSetHeader } from "mysql2/promise";
import { NextResponse } from "next/server";

export async function GET() {
  const db = await createConnection();
  try {
    const sql = "SELECT * FROM product";
    const [products] = await db.query(sql);
    return NextResponse.json(products);
  } catch (error: unknown) {
    console.error("Error fetching products:", error);
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message });
    }
    return NextResponse.json({ error: "An unexpected error occurred" });
  } finally {
    if (db) await db.end();
  }
}


export async function POST(req: Request) {
  const db = await createConnection(); // Create a new connection for this request
  try {
    const body: ProductEditForm = await req.json(); // Explicitly type the request body

    // Validate required fields
    if (!body.name) {
      return NextResponse.json(
        { error: "Name is a required field." },
        { status: 400 }
      );
    }

    const sql = `
      INSERT INTO product (
        name,
        year,
        region,
        type,
        price,
        image,
        description,
        serving_temperature,
        food_pairings,
        grape_varietals,
        ageing_process,
        tasting_notes,
        location_notes,
        brand_description,
        brand_image,
        winemaker_notes,
        harvesting_technique
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [
      body.name,
      body.year || null,
      body.region || null,
      body.type || null,
      body.price || null,
      body.image || null,
      body.description || null,
      body.serving_temperature || null,
      body.food_pairings || null,
      body.grape_varietals || null,
      body.ageing_process || null,
      body.tasting_notes || null,
      body.location_notes || null,
      body.brand_description || null,
      body.brand_image || null,
      body.winemaker_notes || null,
      body.harvesting_technique || null,
    ];

    const [result] = await db.execute<ResultSetHeader>(sql, values); // Specify ResultSetHeader as the result type

    // Build the response with the newly inserted product
    const newProduct = { id: result.insertId, ...body };

    return NextResponse.json(newProduct, { status: 201 });
  } catch (error: unknown) {
    console.error("Error adding product:", error);
    return NextResponse.json(
      { error: "Failed to add product" },
      { status: 500 }
    );
  } finally {
    if (db) await db.end(); // Explicitly close the connection
  }
}