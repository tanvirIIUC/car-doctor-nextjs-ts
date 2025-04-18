import type { NextAuthOptions, User } from "next-auth";
import { loginUser } from "@/action/auth/LoginUser";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import dbConnect from "./dbConnection";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "Enter your email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(
        credentials: Record<"email" | "password", string> | undefined
      ): Promise<User | null> {
        if (!credentials?.email || !credentials?.password) return null;

        const user = await loginUser(credentials);

        if (!user) return null;

        
        return {
          id: user._id.toString(),
          name: user.name || null,
          email: user.email,
          image: user.image || null,
        };
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async signIn({ user, account }) {
      if (account && user.email) {
        const { providerAccountId, provider } = account;
        const { email, image, name } = user;

        const userCollection = await dbConnect("users");

        const isExist = await userCollection.findOne({ email });

        if (!isExist) {
          await userCollection.insertOne({
            providerAccountId,
            email,
            name,
            image,
            provider,
          });
        }
      }
      return true;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt', // Required for getToken to work in middleware
  },
  
};
