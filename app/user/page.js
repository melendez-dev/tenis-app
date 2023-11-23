'use client';

import { useSession } from 'next-auth/react';
import { useState, useEffect } from "react";

import bg from "@/public/userbackground.png";
import Image from "next/image";
import icon from "@/public/iconroot.svg";
import Loading from '@/app/ui/Shared/Loading';
import  ControlledAccordions  from "@/app/ui/Shared/Accordion";
import DetailTournamentViewUser from '../ui/Users/viewUser/DetailTournament';
import svgIcon from "@/public/signout.svg"
import { signOut } from "next-auth/react";
import { Button } from '@mui/material';


export default function UserPage() {
  const session = useSession();

  const [tournaments, setTournaments] = useState([]);
  const [loading, setLoading] = useState(false);

  const [expanded, setExpanded] = useState(false);
  const handleChange = (panel) => (_event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const getData = async () => {
    try{
      setLoading(true);
      const res = await fetch("/api/users/tournaments");
      const data = await res.json();
      setTournaments(data?.data)
    }catch(err) {
      console.error(err)
    }finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getData();
  }, [])

  return (
    <div className="h-screen">
			<div
				style={{
					backgroundImage: `url(${bg.src})`,
					height: "100%",
					backgroundSize: "cover",
					backgroundRepeat: "no-repeat",
					backgroundPosition: "center",
				}}
			>
				<div className="flex justify-end p-3">
					<Image src={icon} alt="icon" width="50" height="50" />
				</div>
        <div className="p-2">
          <div className="my-1 flex items-center">
            <h2 className="text-white ml-10 text-2xl"><b>Bienvenid(@), {session && session?.data?.user?.name}</b></h2>
            <h3 className="text-white ml-10 text-2xl"><b>Torneo - Calendario</b></h3>
            <span className="ml-8">
              <Button variant="contained" className="flex items-center" onClick={() => signOut()}>
                <Image src={svgIcon} width={16} height={18} alt='signoutIcon'/>
                <div className="hidden md:block ml-3">
                  <span className="text-black hover:text-white w-full p-3">Salir</span>
                </div>
              </Button>
            </span>
          </div>
				  <div className="bg-slate-50 p-3 w-1/3 rounded-2xl ml-10" style={{height: "400px", width: "900px", overflowY: "scroll"}}>
            {loading ? <Loading /> : tournaments?.length
              ? tournaments?.map((tournament, key) => (
                <div key={key} className='mt-5'>
                  <ControlledAccordions
                    summary={<b>{tournament?.month_and_year}</b>}
                    details={<DetailTournamentViewUser tournament={tournament?.tournaments}/>}
                    handleChange={handleChange}
                    expanded={expanded}
                    panel={tournament?.month_and_year}
                  />
                </div>
              ))
              : <>No hay fechas de torneos</>
            }
          </div>
        </div>
      </div>
    </div>
  );
}
