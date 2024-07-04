import { type ClassValue, clsx } from "clsx";
import mongoose from "mongoose";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const connectToDB = async () => {
  try {
    if (mongoose.connection && mongoose.connections[0].readyState) return;

    const { connection } = await mongoose.connect(
      process.env.MONGODB_URL as string,
      {
        dbName: "next-auth",
      }
    );

    console.log(`Data base is connected ${connection.host}`);
  } catch (error) {
    throw new Error("Error in connecting DB");
  }
};
