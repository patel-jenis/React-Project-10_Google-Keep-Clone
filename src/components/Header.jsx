import { Menu, Search, RefreshCw, Settings, Grid, User, Lightbulb } from "lucide-react";
import IconBtn from "./IconBtn";

const Header = ({ toggleSidebar }) => {
    return (
        <div className="fixed top-0 left-0 right-0 h-16 flex items-center justify-between px-4 bg-white border-b z-50">
            <div className="flex items-center gap-3">
                <IconBtn>
                    <Menu onClick={toggleSidebar} />
                </IconBtn>

                <div className="flex items-center gap-2">
                    <Lightbulb className="text-yellow-500" />
                    <span className="text-xl font-medium text-gray-700">Keep</span>
                </div>

                <div className="hidden lg:flex items-center bg-gray-100 px-4 py-2 rounded-lg ml-6 w-[500px]">
                    <Search size={18} className="text-gray-500" />
                    <input
                        type="text"
                        placeholder="Search"
                        className="bg-transparent outline-none px-3 w-full text-sm"
                    />
                </div>
            </div>

            <div className="flex items-center gap-2 text-gray-600">
                <IconBtn>
                    <RefreshCw size={18} />
                </IconBtn>
                <IconBtn>
                    <Grid size={18} />
                </IconBtn>
                <IconBtn>
                    <Settings size={18} />
                </IconBtn>
                <IconBtn>
                    <User size={18} />
                </IconBtn>
            </div>
        </div>
    );
};

export default Header;