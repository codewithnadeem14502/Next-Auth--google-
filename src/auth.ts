import NextAuth, { AuthError, CredentialsSignin } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

import { compare } from "bcryptjs";
import { connectToDB } from "./lib/utils";
import { getUser } from "./models/User";
import { use } from "react";
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    CredentialsProvider({
      name: "credientails",
      credentials: {
        email: {
          label: "email",
          type: "email",
        },
        password: {
          label: "password",
          type: "password",
        },
      },
      async authorize(credentials) {
        if (!credentials) {
          return null;
        }
        const User = getUser();
        const email = credentials.email as string | undefined;
        const password = credentials.password as string | undefined;

        console.log("email and password ", email, password);

        await connectToDB();

        if (!email || !password) {
          throw new CredentialsSignin("Please check the credentials again");
        }

        // Change: Explicitly select the password field
        const user = await User.findOne({ email }).select("+password");

        // Change: Check for user.password instead of user.passcode
        if (!user || !user.password) {
          throw new CredentialsSignin("Invalid email or password");
        }

        const isMatch = await compare(password, user.password);

        if (!isMatch) {
          throw new CredentialsSignin("Invalid email or password");
        }
        return { name: user.name, email: user.email, id: user._id };
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    signIn: async ({ user, account }) => {
      if (account?.provider == "google") {
        try {
          const { email, name, image, id } = user;

          await connectToDB();
          const User = getUser();
          const alreadyExisted = await User.findOne({ email });
          if (!alreadyExisted)
            await User.create({ name, email, image, googleId: id });

          return true;
        } catch (error) {
          throw new AuthError("Error while creating user");
        }
      }
      return false;
    },
  },
});
