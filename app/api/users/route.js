import { db } from '@vercel/postgres';
import { NextResponse } from 'next/server';
 
export async function GET() {
  let client = null;
  try {
    client = await db.connect();
    const { rows } = await client.sql`SELECT * FROM users WHERE role = 'user'`;
    client.end();
    return NextResponse.json({ status: "success", data: rows ?? [] });
  } catch (error) {
    return NextResponse.json({ status: "error", error: error });
  } finally{
    client && client.end();
  }
}

export async function PUT(request) {
  let client = null;
  try {
    client = await db.connect();
    const data = await request.json();

    const updated_at = new Date();

    await client.sql`UPDATE users SET 
      name = ${data?.name},
      email = ${data?.email},
      updated_at = ${updated_at}
      WHERE id = ${data?.id}`;
    client.end();
    return NextResponse.json({ status: "success", data: [] });
  } catch (error) {
    return NextResponse.json({ status: "error", error: error });
  } finally{
    client && client.end();
  }
}
