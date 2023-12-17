import Container from "@/components/home/Container";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Todo App - Home',
  description: 'Todos App is a simple todo app that allows you to create, edit, and delete todos. The app is built using Next JS, TypeScript, TailwindCSS, ShadCN UI and mongoDB.',
};

function Home() {
  return (
    <Container />
  );
};

export default Home;