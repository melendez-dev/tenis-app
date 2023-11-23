'use server';
import { sql } from "@vercel/postgres";
import { v4 } from "uuid";

import { hashPassword } from "@/app/lib/encrypt";

export async function registerUser(formData) {
  try{
    const uuid = v4();
    const name = formData.get("name");
    const email = formData.get("email");
    const password = formData.get("password");
    const user = await getUserByEmail(email);

    console.log({user})

    if (user?.length) {
      return {status: "emailInUse"};
    }

    const passwordHashed = await hashPassword(password);

    return await sql`INSERT INTO users VALUES (${uuid}, ${name}, ${email}, ${passwordHashed}, 'user')`;
  }catch(error) {
    throw error;
  }
}

export async function getUserByEmail(email) {
  try{
    const  { rows }  = await sql`SELECT * FROM users where email = ${email}`
    return rows;
  }catch(err) {
    throw err;
  }
}
