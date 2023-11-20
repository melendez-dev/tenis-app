'use client';

import { signIn } from "next-auth/react";
import { useRouter } from 'next/navigation'
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

// actions
import { registerUser } from "@/app/lib/actions";

export default function RegisterForm() {
  const router = useRouter();
  const [error, setError] = useState(false)
  const { data: dataSession } = useSession();

  const handleSubmit = async(e) => {
    try{
      e.preventDefault();
      const data = new FormData(e.currentTarget);

      const creation = await registerUser(data);

      if (creation.rowCount != 1)
        return null
      
      const signInResponse = await signIn("credentials", {
        name: data.get("name"),
        email: data.get("email"),
        password: data.get("password"),
        redirect: false
      })

      if (!signInResponse && signInResponse.error) {
        setError(true);
      }
    }catch(err){
      // todo alertt this error
      console.error(err)
    }
  }
  console.log(dataSession)
  useEffect(() => {
    if (dataSession?.user) {
      router.push(`${dataSession.user.role}`);
    }
  }, [dataSession])

  return (
    <div>
    Register Form
    <form onSubmit={(e) => handleSubmit(e)} className="space-y-3">
      <div className="flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8">
        <div className="w-full">
          <div className="mt-4">
            <label
              className="mb-3 mt-5 block text-xs font-medium text-gray-900"
              htmlFor="name"
            >
              Nombre Completo
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="name"
                type="text"
                name="name"
                placeholder="Enter name"
                required
                //minLength={6}
              />
            </div>
          </div>
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
        <button type='submit'>Registrarse</button>
      </div>
    </form>
        <div>
          <small>¿Ya tienes cuenta? <Link href="/login">Ingresa</Link></small>
        </div>
    </div>
  );
}
