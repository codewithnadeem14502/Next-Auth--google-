import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";

import { hash } from "bcryptjs";
import { redirect } from "next/navigation";
import { connectToDB } from "@/lib/utils";
import { getUser } from "@/models/User";
import { HandleGoogle } from "@/actions/Login";

const Signup = () => {
  const handleSignUp = async (formData: FormData) => {
    "use server";

    const name = formData.get("name") as string | undefined;
    const email = formData.get("email") as string | undefined;
    const password = formData.get("password") as string | undefined;

    await connectToDB();
    const User = getUser();

    if (!name || !email || !password) {
      throw new Error("Please provide all the details!");
    }
    const user = await User.findOne({ email });

    if (user) throw new Error("User already exist!");

    const hashedPassword = await hash(password, 10);

    await User.create({
      name,
      email,
      password: hashedPassword,
    });
    redirect("/login");
  };
  return (
    <div className="flex justify-center items-center h-dvh">
      <Card>
        <CardHeader>
          <CardTitle>Sign up</CardTitle>
          <CardDescription>
            Already have an account
            <Link href="/login" className="underline">
              {" "}
              login
            </Link>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={handleSignUp} className="flex flex-col gap-4">
            <Input placeholder="name" name="name" />
            <Input type="email" placeholder="email" name="email" />
            <Input type="password" placeholder="password" name="password" />
            <Button type="submit">Sign up</Button>
          </form>
        </CardContent>

        <CardFooter className="flex flex-col gap-4">
          <span> or </span>
          <form action={HandleGoogle}>
            <Button type="submit" variant={"outline"}>
              Login With Google{" "}
            </Button>
          </form>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Signup;
