import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import authOptions from "@/lib/auth.options";
import prisma from "@/config/db.config";

export const POST = async (request: NextRequest) => {
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json({
                message: 'Unauthorized.',
                success: false
            }, { status: 401 });
        }
        const { content } = await request.json();
        if (!content) {
            return NextResponse.json({
                message: 'todo content is required.',
                success: false
            }, { status: 400 });
        }
        const todo = await prisma.todo.create({
            data: {
                content,
                // @ts-expect-error
                userId: session?.user?.id
            }
        });
        return NextResponse.json({
            message: 'Todo created successfully.',
            success: true,
            todo
        }, { status: 201 });
    } catch (error: any) {
        return NextResponse.json({
            message: 'Error while creating the todo.',
            error: error.message,
            success: false
        }, { status: 500 });
    }
};

export const GET = async () => {
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json({
                message: 'Unauthorized.',
                success: false
            }, { status: 401 });
        }
        const todos = await prisma.todo.findMany({
            where: {
                // @ts-expect-error
                userId: session?.user?.id
            }
        });
        return NextResponse.json({
            message: 'Todos fetched successfully.',
            success: true,
            todos
        }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({
            message: 'Error while fetching the todos.',
            error: error.message,
            success: false
        }, { status: 500 });
    }
};

export const PUT = async (request: NextRequest) => {
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json({
                message: 'Unauthorized.',
                success: false
            }, { status: 401 });
        }
        const { id, content } = await request.json();
        if (!id || !content) {
            return NextResponse.json({
                message: 'id and content are required.',
                success: false
            }, { status: 400 });
        }
        const todo = await prisma.todo.update({
            where: {
                id: id
            },
            data: {
                content: content,
            }
        });
        return NextResponse.json({
            message: 'Todo updated successfully.',
            success: true,
            todo
        }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({
            message: 'Error while updating the todo.',
            success: false,
            error: error.message
        }, { status: 500 });
    }
}

export const DELETE = async (request: NextRequest) => {
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json({
                message: 'Unauthorized.',
                success: false
            }, { status: 401 });
        }
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');
        if (!id) {
            return NextResponse.json({
                message: 'id is required.',
                success: false
            }, { status: 400 });
        }
        const todo = await prisma.todo.delete({
            where: {
                id: id
            }
        });
        return NextResponse.json({
            message: 'Todo deleted successfully.',
            success: true,
            todo
        }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({
            message: 'Error while deleting the todo.',
            success: false,
            error: error.message
        }, { status: 500 });
    }
}