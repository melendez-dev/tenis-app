"use client";

import { useSession } from "next-auth/react";
export default function AdminPage() {
  const { data: { user } } = useSession();
  
  return (
    <div className="p-1">
      <div>
        <span className="text-3xl"><b>Bienvenido, {user?.name} !</b></span>
      </div>
      <div className="mt-8">
        <p>Estás logueado en cuenta de administrador. Podrás ver y gestionar usuarios, cambiarle algunos de sus campos como nombre o correo electrónico.</p>
        <br />
        <p>Podrás crear, leer, actualizar y eliminar torneos.</p>
        <br />
        <p>Recuerda usar esta cuenta con responsabilidad, cualquier cambio es permanente.</p>
      </div>
    </div>
  );
}
