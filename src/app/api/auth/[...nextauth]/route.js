import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "@/models/userSchema";
import { connectToDB } from "@/lib/connect";
import bcrypt from "bcrypt";

const handler = NextAuth({
  providers: [
    // Google Authentication
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),

    // Credentials Authentication
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "you@example.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        await connectToDB();

        // Find the user in MongoDB
        const user = await User.findOne({ email: credentials.email }).select(
          "+password"
        );
        if (!user) {
          throw new Error("No user found with this email.");
        }
        console.log("User: ", user);

        console.log("Credentials: ", credentials);
        console.log("Password: ", credentials.password);
        console.log("Hashed Password: ", user.password);

        // Verify the password
        const isPasswordValid = await bcrypt.compare(
          credentials.password,
          user.password
        );
        if (!isPasswordValid) {
          throw new Error("Invalid email or password.");
        }

        // Return user data
        return {
          id: user._id.toString(),
          email: user.email,
          name: user.username,
          image: user.image, // optional, if you store it
        };
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      await connectToDB();

      if (token) {
        session.user.id = token.id;
        session.user.email = token.email;
        session.user.name = token.name;
      }

      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
      }

      return token;
    },
    async signIn({ account, profile }) {
      if (account.provider === "google") {
        try {
          await connectToDB();

          // Check if user exists
          const userExists = await User.findOne({ email: profile.email });

          if (!userExists) {
            // Create a new user if not found
            await User.create({
              email: profile.email,
              username: profile.name.replace(" ", "").toLowerCase(),
              image: profile.picture,
            });
          }

          return true;
        } catch (error) {
          console.error("Error during Google sign-in:", error.message);
          return false;
        }
      }

      return true;
    },
  },
  session: {
    strategy: "jwt", // Use JWT for sessions
    maxAge: 30 * 24 * 60 * 60, // Session expiration (optional) - 30 days
  },
  secret: process.env.NEXT_AUTH_SECRET,
});

export { handler as GET, handler as POST };
