import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

const MainLayout = () => {
    const [open, setOpen] = useState(true);

    const toggleSidebar = () => {
        if (window.innerWidth < 550) return;

        setOpen(!open);
    };

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 550) {
                setOpen(false);
            }
        };

        handleResize();
        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <div className="bg-[#f1f3f4] min-h-screen">
            <Header toggleSidebar={toggleSidebar} />
            <Sidebar open={open} />

            <div className={`pt-20 sm:px-4 transition-all ${
                    open ? "ml-64" : "ml-20"
                }`}>
                <Outlet />
            </div>
        </div>
    );
};

export default MainLayout;