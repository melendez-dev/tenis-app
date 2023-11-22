import Link from "next/link";
import bg from "@/public/backgroundRoot.png"
import icon from "@/public/iconroot.svg"
import Image from "next/image";
import { Button } from "@mui/material";

export default function Home() {
  return (
   <div className="h-screen" style={{backgroundColor: "black"}}>
      <div
        style={{
          backgroundImage: `url(${bg.src})`,
          height: "100%",
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center"
        }}
      >
        <div className="flex justify-end p-3">
          <Image src={icon} alt="icon" width="50" height="50" />
        </div>
        <div className="h-auto w-screen flex items-center justify-center flex-col">
          <div>
            <h1 className="text-white text-4xl"><b>Liga de tenis</b></h1>
          </div>
          <div className="flex items-center justify-center gap-4 mt-40">
            <Link href="/login">
              <Button variant="contained">Entrar</Button>
            </Link>
            <Link href="/register">
              <Button variant="outlined">Registarse</Button>
            </Link>
          </div>
        </div>
      </div>
   </div>
  )
}
