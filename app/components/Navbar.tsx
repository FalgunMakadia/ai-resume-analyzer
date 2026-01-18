import React, {useEffect, useState} from 'react'
import {Link, useNavigate} from "react-router";
import UserMenu from "~/components/UserMenu";
import {usePuterStore} from "~/lib/puter";

const Navbar = () => {

    const { auth } = usePuterStore();
    const [username, setUsername] = useState("Username");
    const navigate = useNavigate();

    const handleLogout = () => {
        auth.signOut();
        navigate("/auth");
    };

    useEffect(() => {
        const loadUser = async () => {
            const user = auth.getUser();
            if (!user) return;

            setUsername(user.username);
        }
        loadUser();
    })

    return (
        <>
            <nav className="navbar">
                <Link to="/">
                    <p className="text-2xl font-bold text-gradient">RESUMIZER</p>
                </Link>
                <section className="flex items-center">
                    <Link to="/upload" className="primary-button w-fit">
                        Upload Resume
                    </Link>
                    <UserMenu username={username} onLogout={handleLogout} />
                </section>
            </nav>


        </>
    )
}
export default Navbar
