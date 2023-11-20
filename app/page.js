import Link from "next/link";

export default function Home() {
  return (
   <div>
      <div>
        Bienvenido al app de torneo de tenis
      </div>
      <div>
        <div>
          <Link href="/login">Ingresar</Link>
        </div>
        <div>
          <Link href="/register">Registrarse</Link>
        </div>
      </div>
      <div>
        made by sebastian Melendez ❤️
      </div>
   </div>
  )
}
