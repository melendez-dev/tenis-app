'use client';
import { useSession } from "next-auth/react";
import { useRouter } from 'next/navigation'
import SideNav from "@/app/ui/Dashboard/SideNav";

export default function AdminLayaout({ children }) {
  const router = useRouter();
  const { data: dataSession, status: statusSession } = useSession();

  console.log(dataSession, statusSession)

  if (statusSession != "authenticated" && statusSession != "loading") {
    router.push("/")
  }

  if (dataSession?.user?.role !== "admin") {
    return <>No tienes permiso para ver esta pagina</>
  }

  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
      <div className="w-full flex-none md:w-64">
        <SideNav />
      </div>
      <div className="grow p-6 md:overflow-y-auto md:p-12">{children}</div>
    </div>
  );
}
