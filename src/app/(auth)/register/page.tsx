import RegisterForm from "@/components/register/RegisterForm";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Todo App - Register',
    description: 'Todos App is a simple todo app that allows you to create, edit, and delete todos. The app is built using Next JS, TypeScript, TailwindCSS, ShadCN UI and mongoDB.',
};

const Register: React.FC = () => {
    return (
        <RegisterForm />
    );
};

export default Register;