import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { LoginForm } from "@/components/client/LoginForm";
import { auth, signIn } from "@/auth";
import { redirect } from "next/navigation";
import { HandleGoogle } from "@/actions/Login";

const Login = async () => {
  const session = await auth();

  if (session?.user) redirect("/");
  return (
    <div className="flex justify-center items-center h-dvh">
      <Card>
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>
            Don't have an account
            <Link href="/signup" className="underline">
              {" "}
              Sign up
            </Link>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <LoginForm />
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

export default Login;
