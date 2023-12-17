import { NextRequest, NextResponse } from "next/server";
import bcrypt from 'bcryptjs';
import prisma from "@/config/db.config";

export const POST = async (request: NextRequest) => {
    try {
        const { name, email, password } = await request.json();
        if (!name || !email || !password) {
            return NextResponse.json({
                message: 'Name, Email, Password is required.',
                success: false
            }, { status: 400 });
        }
        const alreadyExist = await prisma.user.findFirst({
            where: {
                email: email
            }
        });
        if (alreadyExist) {
            return NextResponse.json({
                message: 'User already registered.',
                success: false
            }, { status: 400 });
        };
        const hashedPassword = await bcrypt.hash(password, 10);
        await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword
            }
        });
        return NextResponse.json({
            message: 'User registered successfully.',
            success: true
        }, { status: 201 });
    } catch (error: any) {
        return NextResponse.json({
            message: 'Error while registering the user.',
            error: error.message,
            success: false
        }, { status: 500 });
    }
};