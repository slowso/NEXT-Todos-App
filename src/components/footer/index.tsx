import dynamic from "next/dynamic";

const Footer = dynamic(()=>import("./FootNav"))
export default Footer
