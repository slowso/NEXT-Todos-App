import LoginForm from "@/components/login/LoginForm";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Todo App - Login',
    description: 'Todos App is a simple todo app that allows you to create, edit, and delete todos. The app is built using Next JS, TypeScript, TailwindCSS, ShadCN UI and mongoDB.',
};

const Login: React.FC = () => {
    return (
        <LoginForm />
    )
}

export default Login;