"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { GoogleSignInButton } from "@/app/ui/AuthButtons";
import bg from "@/public/loginbackground.png";
import Image from "next/image";
import icon from "@/public/iconroot.svg";
import { Button, FormHelperText } from "@mui/material";

export default function LoginForm() {
	const router = useRouter();
	const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
	const { data: dataSession } = useSession();

	const handleSubmit = async (e) => {
    try{
      setLoading(true);
		  e.preventDefault();
		  const data = new FormData(e.currentTarget);

  		const signInResponse = await signIn("credentials", {
			  email: data.get("email"),
			  password: data.get("password"),
			  redirect: false,
		  });

		  if (signInResponse?.error === "CredentialsSignin") {
			  setError(true);
		  }
    }catch(err) {
      console.error(err);
    }finally {
      setLoading(false);
    }
	};

	useEffect(() => {
		if (dataSession?.user) {
			router.push(`${dataSession.user.role}`);
		}
	}, [dataSession]);

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
				<div className="p-6">
					<div className="flex items-center">
						<div className="bg-slate-50 p-3 w-1/3 rounded-2xl ml-10">
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
												/>
											</div>
										</div>
									</div>
                  <div className="mt-5">
									  <Button type="submit" variant="outlined" fullWidth disabled={loading}>Entrar</Button>
                  </div>
								</div>
								{error && <FormHelperText error>error en las credenciales</FormHelperText>}
							</form>
							<div>
								<small>
									¿No tienes una cuenta?{" "}
									  <Link href="/register"><b>Registrate</b></Link>
								</small>
							</div>
							<div>
								<GoogleSignInButton />
							</div>
						</div>
						<div className="ml-8">
              <div>
                <span className="text-white text-xl">LOGIN</span>
              </div>
              <div>
                <span className="text-white text-3xl"><b>TO ACCOUNT</b></span>
              </div>
            </div>
					</div>
				</div>
			</div>
		</div>
	);
}
