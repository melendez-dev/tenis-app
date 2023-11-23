import { db } from '@vercel/postgres';
import { NextResponse } from 'next/server';
import { v4 } from 'uuid'; 

export async function GET(req) {
  let client = null;
  try {
    client = await db.connect();
    const searchParams = req.nextUrl.searchParams;
    const id = searchParams.get("id");
    console.log({id})
    const { rows } = await client.sql`SELECT * FROM tournament_users WHERE tournament_id = ${id}`;
    console.log({rows})
    client.end();
    return NextResponse.json({ status: "success", data: rows ?? [] });
  }catch(error) {
    return NextResponse.json({ status: "error", error: error });
  }finally {
    client && client.end()
  }
}

export async function POST(req) {
  let client = null;
  try {
    client = await db.connect();
    const uuid = v4();
    const data = await req.json();
    console.log({data})

    await client.sql`INSERT INTO tournament_users VALUES 
    (
      ${uuid}, 
      ${data?.tournament_id}, 
      ${data?.email},
      ${data?.name}
    )
    `
    client.end();

    return NextResponse.json({ status: "success", data: [] });
  }catch(error) {
    return NextResponse.json({ status: "error", error: error });
  }finally {
    client && client.end()
  }
}
