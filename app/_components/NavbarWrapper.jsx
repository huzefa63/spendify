'use client';
import { usePathname } from "next/navigation"
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

function NavbarWrapper() {
    const pathname = usePathname();
    const publicPages = ['home','signup','login','about','features','pricing'];
    let isPublic = true;
    if(publicPages.includes(pathname.slice(1))) isPublic = true;
    else isPublic = false;

    if(isPublic){
        return <Navbar />
    }else return <Sidebar />;
}

export default NavbarWrapper
