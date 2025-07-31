import NextAuth from "next-auth";
import FacebookProvider from "next-auth/providers/facebook";
import GoogleProvider from "next-auth/providers/google";
import {User} from "@/models/user";
import connectToDatabase from "@/lib/dbConnect";

export const authOptions = NextAuth({
  providers: [
    // OAuth authentication providers...
    FacebookProvider({
      clientId: process.env.FACEBOOK_ID,
      clientSecret: process.env.FACEBOOK_SECRET,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      if (account.provider == "github" || account.provider == "facebook" || account.provider =="google") {
        // Connect to the database

        await connectToDatabase()
        const CurrentUser = await User.findOne({ email: profile.email });
        if (!CurrentUser) {
          const newUser = new User({
            email: profile.email,
            username: profile.email.split("@")[0],
            name: profile.name,
            profilePic: profile.picture,
          });
          await newUser.save();
        }
        return true;
      }
    },
    async session({ session, user, token }) {
      const dbUser = await User.findOne({ email: session.user.email });
      session.user.name = dbUser.username;
      session.user.id=dbUser._id;
      return session;
    },
  },
});

export { authOptions as GET, authOptions as POST };
