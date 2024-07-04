import { auth } from "@/auth";
import Image from "next/image";
import { encode, decode } from "next-auth/jwt";
import { cookies } from "next/headers";
export default async function Home() {
  const session = await auth();
  const user = session?.user;
  const cookess = cookies().get("authjs.session-token");
  console.log(
    "cookis",
    await decode({
      token: cookess?.value!,
      salt: cookess?.name!,
      secret: process.env.AUTH_SECRET!,
    })
  );
  // console.log("Session:", session);
  // console.log("User details:", user);
  const userData = await decode({
    token: cookess?.value!,
    salt: cookess?.name!,
    secret: process.env.AUTH_SECRET!,
  });
  const profileImage = userData?.picture as string;
  const userName = userData?.name;
  const userEmail = userData?.email;
  return (
    <div className="flex flex-col justify-center items-center h-dvh">
      <img
        className="w-[250px] h-[250px] rounded-full mb-10"
        src={profileImage}
        alt="user iamge"
      />
      <h1>{userName}</h1>
      <h1>{userEmail}</h1>
    </div>
  );
}
