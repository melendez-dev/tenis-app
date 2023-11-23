import { db } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function GET() {
  let client = null;
  try {
    client = await db.connect();
    const { rows } = await client.sql`
      SELECT
      TO_CHAR(start_date, 'YYYY-MM') AS month_and_year,
      json_agg(tournaments ORDER BY start_date) AS tournaments
      FROM tournaments
      GROUP BY month_and_year;
    `;
    return NextResponse.json({ status: "success", data: rows ?? [] });
  } catch (error) {
    return NextResponse.json({ status: "error", error: error });
  } finally{
    client && client.end();
  }
}


