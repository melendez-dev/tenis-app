import CredentialsProviders from "next-auth/providers/credentials";
import GoogleProviders from "next-auth/providers/google";

import { sql } from "@vercel/postgres";
import { comparePassword  } from "./encrypt";

export const authConfig = {
  providers: [
    CredentialsProviders({
      name: "Sign in",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "example@example.com",
        },
        password: {
          label: "Password",
          type: "password"
        }
      },

      async authorize(credentials) {
        if (!credentials || !credentials.email || !credentials.password)
          return null;

        const { rows } = await sql`SELECT * FROM users WHERE email = ${credentials.email}`;

        if (rows?.length) {
          const match = await comparePassword(credentials.password, rows[0]?.password);
          return match ? rows[0] : null;
        }

        return null
      },
    }),
    GoogleProviders({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    })
  ],
  callbacks: {
    async session({ session }) {
      if (session.user.email == process.env.NEXTAUTH_ADMIN)
        session.user.role = 'admin';
      else
        session.user.role = 'user';
      return session;
    }
  },
}
