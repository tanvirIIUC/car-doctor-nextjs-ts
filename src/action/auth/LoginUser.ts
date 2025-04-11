import dbConnect from "@/lib/dbConnection";
import { UserT } from "@/types";

import bcrypt from "bcrypt";

export const loginUser = async (payload: UserT) => {
  const { email, password } = payload;

  if (!email || !password) {
    return null;
  }

  try {
    const userCollection = await dbConnect("users"); // await added

    const user = await userCollection.findOne({ email });
    if (!user) {
      return null;
    }

    const isPasswordOk = await bcrypt.compare(password, user.password); // fixed order + await
    if (!isPasswordOk) {
      return null;
    }

    return user;
  } catch (err: any) {
    console.error("Login error:", err.message);
    return null;
  }
};
