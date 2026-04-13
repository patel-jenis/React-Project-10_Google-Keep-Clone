import { Lightbulb, Archive, Trash2, Tag, Pencil } from "lucide-react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import LabelModal from "./LabelModal";

const Sidebar = ({ open }) => {

    const [showModal, setShowModal] = useState(false);
    const labels = useSelector(state => state.notes.labels);

    const linkStyle = (isActive) =>
        `flex items-center rounded-r-full px-4 py-3 transition-all duration-200 ease-in-out 
        ${open ? "gap-4" : "justify-center"} 
        ${isActive
            ? "bg-yellow-100 text-black"
            : "hover:bg-gray-100 text-gray-700"
        }`;

    return (
        <div className={`pt-4 fixed top-16 left-0 h-[calc(100vh-4rem)] transition-all duration-300 ${open ? "w-64" : "w-20"}`}>
            <div className="space-y-2">
                <NavLink to="/" className={({ isActive }) => linkStyle(isActive)}>
                    <Lightbulb />
                    {open && "Notes"}
                </NavLink>

                <NavLink to="/archive" className={({ isActive }) => linkStyle(isActive)}>
                    <Archive />
                    {open && "Archive"}
                </NavLink>

                <NavLink to="/trash" className={({ isActive }) => linkStyle(isActive)}>
                    <Trash2 />
                    {open && "Trash"}
                </NavLink>

                {labels.map((label, i) => (
                    <NavLink key={i} to={`/label/${label}`} className={({ isActive }) => linkStyle(isActive)}>
                        <Tag />
                        {open && label}
                    </NavLink>
                ))}

                <div onClick={() => setShowModal(true)} className="flex items-center px-4 py-3 cursor-pointer hover:bg-gray-100">
                    <Pencil />
                    {open && <span className="ml-4">Edit Labels</span>}
                </div>

                {showModal && <LabelModal close={() => setShowModal(false)} />}
            </div>
        </div>
    );
};

export default Sidebar;