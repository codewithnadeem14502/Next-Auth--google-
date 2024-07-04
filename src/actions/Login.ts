"use server";

import { signIn } from "@/auth";
import { AuthError } from "next-auth";

export const credentialsLogin = async (email: string, password: string) => {
  try {
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      console.log("SignIn error:", result.error); // Add this log
      return { success: false, message: "Invalid email or password" };
    }
    return { success: true, message: "Login successful" };
  } catch (error) {
    console.error("Detailed login error:", error);
    if (error instanceof AuthError) {
      console.log("AuthError type:", error.type); // Add this log
      return { success: false, message: "Invalid email or password" };
    }
    return { success: false, message: "An unexpected error occurred" };
  }
};

export const HandleGoogle = async () => {
  await signIn("google");
};
