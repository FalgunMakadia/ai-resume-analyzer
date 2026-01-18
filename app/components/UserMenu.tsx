import React from "react";
import {
    Accordion,
    AccordionItem,
    AccordionHeader,
    AccordionContent,
} from "./Accordian";

interface UserMenuProps {
    username: string;
    onLogout: () => void;
}

const UserMenu: React.FC<UserMenuProps> = ({ username, onLogout }) => {
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
                        <span className="block max-w-full truncate text-center">
                            {username}
                        </span>
                        <span className="absolute left-1/2 top-0 -translate-x-1/2 hidden bg-white px-3 py-0 text-gray-800 group-hover:block">
                            {username}
                        </span>
                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={onLogout}
                        className="w-full text-left cursor-pointer px-3 py-3 text-sm text-red-600 hover:bg-gray-100 transition"
                    >
                        Logout
                    </button>
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    );
};

export default UserMenu;
