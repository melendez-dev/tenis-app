import { db } from '@vercel/postgres';
import { v4  } from 'uuid';
import { NextResponse } from 'next/server';
 
export async function GET(req) {
  let client = null;
  try {
    client = await db.connect();
    
    let data = []
    const searchParams = req.nextUrl.searchParams;
    const filter = searchParams.get("filter");

    if (filter) {
      data = await client.sql`SELECT * FROM tournaments WHERE name = '%${filter}%'`;
      return NextResponse.json({ status: "success", data: data });
    }

    data = await client.sql`SELECT * FROM tournaments`;
    client.end()
    return NextResponse.json({ status: "success", data: data });
  } catch (error) {
    return NextResponse.json({ status: "error", error: error });
  } finally{
    client && client.end();
  }
}

export async function POST(request) {
  let client = null;
  try {
    client = await db.connect();
    const data = await request.json()
    const uuid = v4();
    await client.sql`
      INSERT INTO tournaments VALUES(
        ${uuid},
        ${data.name},
        ${data.city},
        ${data.start_date},
        ${data.end_date},
        ${data.total_money},
        ${data.max_users}
      )
    `
    client.end()
    return NextResponse.json({ status: "success",  data: []});
  }catch(error) {
    return NextResponse.json({ status: "error", error: error });
  }finally {
    client && client.end();
  }
}

export async function PUT(request) {
  let client = null;
  try{
    client = await db.connect();
    const data = await request.json();

    const updated_at = new Date();
    await client.sql`UPDATE tournaments SET
      name = ${data?.name},
      city = ${data?.city},
      start_date = ${data?.start_date},
      end_date = ${data?.end_date},
      total_money = ${data?.total_money},
      max_users = ${data?.max_users},
      updated_at = ${updated_at}
      WHERE id = ${data?.id}
    `;
    
    return NextResponse.json({ status: "success",  data: []});
  }catch(error) {
    return NextResponse.json({ status: "error", error: error });
  }finally {
    client && client.end();
  }
}

export async function DELETE(request) {
  let client = null;
  try{
    client = await db.connect();
    const data = await request.json();
    await client.sql`DELETE FROM tournaments WHERE id = ${data.id}`;

    return NextResponse.json({ status: "success",  data: []});
  }catch(error) {
    return NextResponse.json({ status: "error", error: error });
  }finally {
    client && client.end()
  }
}
