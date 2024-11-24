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
      INSERT INTO product (name, year, region, type, price, image, description)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [
      body.name,
      body.year || null,
      body.region || null,
      body.type || null,
      body.price || null,
      body.image || null,
      body.description || null,
    ];

    // Specify ResultSetHeader as the result type
    const [result] = await db.execute<ResultSetHeader>(sql, values);

    // Return the newly added product
    const newProduct = {
      id: result.insertId, // `insertId` is typed correctly with ResultSetHeader
      ...body,
    };

    return NextResponse.json(newProduct, { status: 201 });
  } catch (error: unknown) {
    console.error("Error adding product:", error);
    return NextResponse.json({ error: "Failed to add product" }, { status: 500 });
  } finally {
    if (db) await db.end(); // Explicitly close the connection
  }
}