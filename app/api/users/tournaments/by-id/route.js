import { db } from '@vercel/postgres';
import { NextResponse } from 'next/server';
 
export async function GET(req) {
  let client = null;
  try {
    client = await db.connect();
    const searchParams = req.nextUrl.searchParams;
    const id = searchParams.get("id");

    const { rows } = await client.sql`SELECT * FROM tournaments WHERE id = ${id}`;

    client.end()
    return NextResponse.json({ status: "success", data: rows });
  } catch (error) {
    return NextResponse.json({ status: "error", error: error });
  } finally{
    client && client.end();
  }
}


