"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "../ui/use-toast";
import { credentialsLogin } from "@/actions/Login";
import { useRouter } from "next/navigation";

const LoginForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const handleSubmit = async (formData: FormData) => {
    setIsLoading(true);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (!email || !password) {
      toast({
        title: "Error",
        description: "Please provide all the details!",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }

    const result = await credentialsLogin(email, password);

    if (result.success) {
      toast({
        title: "Success",
        description: result.message,
        variant: "default",
      });
      router.refresh();
      // Redirect or update UI as needed
    } else {
      toast({
        title: "Login Failed",
        description: result.message,
        variant: "destructive",
      });
    }
    setIsLoading(false);
  };

  return (
    <form action={handleSubmit} className="flex flex-col gap-4">
      <Input type="email" placeholder="email" name="email" required />
      <Input type="password" placeholder="password" name="password" required />
      <Button type="submit" disabled={isLoading}>
        {isLoading ? "Logging in..." : "Login"}
      </Button>
    </form>
  );
};

export { LoginForm };
