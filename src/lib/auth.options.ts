import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import prisma from "@/config/db.config";

const authOptions: NextAuthOptions = {
    providers: [
        // @ts-ignore
        CredentialsProvider({
            id: "credentials",
            name: "Credentials",
            async authorize(credentials) {
                try {
                    const user = await prisma.user.findUnique({
                        where: {
                            email: credentials?.email
                        }
                    });
                    if (!user) {
                        throw new Error('invalid credentials');
                    }
                    const match = await bcrypt.compare(credentials?.password!, user.password);
                    if (!match) {
                        throw new Error('invalid credentials');
                    }
                    return { id: user.id, email: user.email, name: user.name };
                } catch (error: any) {
                    throw new Error(error.message);
                }
            }
        }),
    ],
    callbacks: {
        async session({ session }) {
            try {
                const exist = await prisma.user.findUnique({
                    where: {
                        email: session.user?.email!
                    }
                });
                if (exist) {
                    // @ts-ignore
                    session.user.id = exist.id;
                    // @ts-ignore
                    session.user.email = exist.email;
                    // @ts-ignore
                    session.user.name = exist.name;
                }
                return session;
            } catch (error: any) {
                throw new Error(error.message);
            }
        },
    },
    secret: process.env.NEXTAUTH_SECRET as string,
    pages: {
        signIn: '/login',
        signOut: '/login',
        error: '/login'
    },
};

export default authOptions;
