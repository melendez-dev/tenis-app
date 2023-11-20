'use client';

import { signIn } from "next-auth/react";
import { useRouter } from 'next/navigation'
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { GoogleSignInButton } from "@/app/ui/AuthButtons";

export default function LoginForm() {
  const router = useRouter();
  const [error, setError] = useState(false)
  const { data: dataSession } = useSession();

  const handleSubmit = async(e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);

    const signInResponse = await signIn("credentials", {
      email: data.get("email"),
      password: data.get("password"),
      redirect: false
    })
    if (!signInResponse && signInResponse.error) {
      setError(true);
    }
  }

  useEffect(() => {
    if (dataSession?.user) {
      router.push(`${dataSession.user.role}`);
    }
  }, [dataSession])


  return (
    <div>
      Login Form
    <form onSubmit={(e) => handleSubmit(e)} className="space-y-3">
      <div className="flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8">
        <div className="w-full">
          <div>
            <label
              className="mb-3 mt-5 block text-xs font-medium text-gray-900"
              htmlFor="email"
            >
              Email
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="email"
                type="email"
                name="email"
                placeholder="Enter your email address"
                required
              />
            </div>
          </div>
          <div className="mt-4">
            <label
              className="mb-3 mt-5 block text-xs font-medium text-gray-900"
              htmlFor="password"
            >
              Password
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="password"
                type="password"
                name="password"
                placeholder="Enter password"
                required
                //minLength={6}
              />
            </div>
          </div>
        </div>
        <button type='submit'>Entrar</button>
      </div>
      {error && <div>error en las credenciales</div>}
    </form>
    <div>
       <small>¿No tienes una cuenta? <Link href="/register">Registrate</Link></small>
     </div>
      <div><GoogleSignInButton /></div>
    </div>
  );
}
