import dbConnect from "@/lib/dbConnection";
import { UserT } from "@/types"; 
import bcrypt from "bcrypt";

// Define the type for the return value
interface RegisterResponse {
  message: string;
  status?: number;
}

export const registerUser = async (payload: UserT): Promise<RegisterResponse> => {
  const { email, password } = payload;

  try {
    const userCollection = await dbConnect("users"); // Await for the db connection

    // Check if email and password are provided
    if (!email || !password) {
      return { message: "Please fill email and password" };
    }

    // Check if user already exists
    const checkUser = await userCollection.findOne({ email });
    if (checkUser) {
      return { message: "User already exists!", status: 409 };
    }

    // Hash the password before saving
    const hashPassword = await bcrypt.hash(password, 10);
    payload.password = hashPassword;

    // Insert the new user into the database
    const result = await userCollection.insertOne(payload as any);

    if (result.acknowledged) {
      return { message: "User created successfully", status: 201 };
    } else {
      return { message: "Failed to create user", status: 500 };
    }
  } catch (err: any) {
    console.error(err.message);
    return { message: "Something went wrong, please try again later", status: 500 };
  }
};
