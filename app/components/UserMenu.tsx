import React, {useEffect, useState} from "react";
import {
    Accordion,
    AccordionItem,
    AccordionHeader,
    AccordionContent,
} from "./Accordian";
import {useLocation, useNavigate} from "react-router";
import {toast} from "react-toastify";
import {usePuterStore} from "~/lib/puter";

interface UserMenuProps {
    username: string;
    onLogout: () => void;
}

const UserMenu: React.FC<UserMenuProps> = ({ username, onLogout }) => {

    const location = useLocation();
    const navigate = useNavigate();
    const isHome = location.pathname === "/";
    const { fs, isLoading, kv } = usePuterStore();
    const [files, setFiles] = useState<FSItem[]>([]);

    useEffect(() => {
        const loadFiles = async () => {
            try {
                const files = (await fs.readDir("./")) as FSItem[];
                setFiles(files);
            } catch (error) {
                console.error("Failed to load files:", error);
                toast.error("Error loading files: Delete all resumes may not work");
            }
        }
        loadFiles();
    }, []);

    const handleDeleteAllResumes = async () => {

        if (!isLoading && files.length > 0) {
            for (const file of files) {
                await fs.delete(file.path);
            }
            kv.flush().then(() => {
                toast.success("All resumes deleted successfully");
                setFiles([]);
                navigate(0);
            }).catch(() => {
                toast.error("Error: Resumes could not be deleted");
            })
        }

    }

    return (
        <Accordion
            allowMultiple={false}
            className="relative"
        >
            <AccordionItem id="user-menu" className="border-none">

                <AccordionHeader
                    itemId="user-menu"
                    className="p-0 bg-transparent hover:bg-transparent"
                    icon={null}
                    disabled={isLoading}
                >
                    <img
                        src="/images/user-icon.png"
                        alt="User"
                        className="w-[40px] h-[40px] rounded-full cursor-pointer hover:opacity-80 transition"
                    />
                </AccordionHeader>

                <AccordionContent
                    itemId="user-menu"
                    className="absolute right-4 mt-2 w-50 rounded-lg bg-white shadow-lg border z-50"
                >
                    <div className="px-3 py-3 border-b text-sm font-medium text-gray-700 truncate">
                        <div className="relative group">
                        <span className="block max-w-full truncate text-center text-green-700 text-base">
                            {username}
                        </span>
                        <span className="absolute left-1/2 top-0 -translate-x-1/2 hidden bg-white cursor-pointer px-3 py-0 text-green-900 font-bold text-base animate-in fade-in duration-300 group-hover:block">
                            {username}
                        </span>
                        </div>
                    </div>

                    {isHome && files.length > 0 && (
                        <button
                            type="button"
                            onClick={handleDeleteAllResumes}
                            className="w-full text-center cursor-pointer px-3 mt-2 pt-2 pb-2 text-sm font-semibold hover:bg-gray-100 transition"
                        >
                            Delete All Resumes
                        </button>
                    )}

                    <button
                        type="button"
                        onClick={onLogout}
                        className="w-full text-center cursor-pointer px-3 py-2 text-sm font-bold hover:bg-gray-100 transition"
                    >
                        Log out
                    </button>
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    );
};

export default UserMenu;
