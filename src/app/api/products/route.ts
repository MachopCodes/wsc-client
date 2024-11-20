import { createConnection } from "@/utils/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const db = await createConnection();
    const sql = "SELECT * FROM product";
    const [products] = await db.query(sql);
    return NextResponse.json(products);
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
}

export async function POST(req: Request) {
  try {
    const db = await createConnection();
    const body = await req.json();

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

    const [result] = await db.query(sql, values);

    // Return the newly added product
    const newProduct = {
      id: result.insertId, // Assuming `insertId` is provided by MySQL
      ...body,
    };

    return NextResponse.json(newProduct, { status: 201 });
  } catch (error: any) {
    console.error("Error adding product:", error);
    return NextResponse.json({ error: "Failed to add product" }, { status: 500 });
  }
}
