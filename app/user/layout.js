'use client';
import { useSession } from "next-auth/react";
import { useRouter } from 'next/navigation'
export default function AdminLayaout({ children }) {
  const router = useRouter();
  const { status: statusSession } = useSession();


  if (statusSession != "authenticated" && statusSession != "loading") {
    router.push("/")
  }

  return (
    <div>
      <div>section user</div>
      {children}
    </div>
  )
}
