import React, {useEffect} from 'react'
import {usePuterStore} from "~/lib/puter";
import {useLocation, useNavigate} from "react-router";
import { toast } from "react-toastify";

export const meta = () => ([
    {title: "Resumizer | Authentication"},
    {name: "Description", content: "Log into your account" },
])

const Auth = () => {

    const { isLoading, auth } = usePuterStore();
    const location = useLocation();
    const next = location.search.split("next=")[1];
    const navigate = useNavigate();

    const handleSignIn = async () => {
        auth.signIn().then(() => {
            toast.success("Successfully logged in");
        }).catch(() => {
            toast.error("Log in failed");
        })
    }

    const handleSignOut = async () => {
        auth.signOut().then(() => {
            toast.success("Successfully logged out");
        }).catch(() => {
            toast.error("Log out failed");
        })
    }

    useEffect(() => {
        if(auth.isAuthenticated) {
            if(next) navigate(next);
            else navigate("/");
        }
    }, [auth.isAuthenticated, next])

    return (
        <main className="bg-[url('/images/bg-auth.svg')] bg-cover min-h-screen flex items-center justify-center">
            <div className="gradient-border shadow-lg">
                <section className="flex flex-col gap-8 bg-white rounded-2xl p-10">
                    <div className="flex flex-col items-center gap-2 text-center">
                        <h1>RESUMIZER</h1>
                        <h2 className="pb-3">Log in to analyze your resume using AI</h2>
                    </div>
                    <div>
                        {isLoading ? (
                            <button className="auth-button animate-pulse">
                                <p>Logging in ...</p>
                            </button>
                        ) : (
                            <>
                                {auth.isAuthenticated ? (
                                    <button className="auth-button" onClick={handleSignOut}>
                                        <p>Log out</p>
                                    </button>
                                ) : (
                                    <button className="auth-button" onClick={handleSignIn}>
                                        <p>Log in</p>
                                    </button>
                                )}
                            </>
                        )}
                    </div>
                </section>
            </div>
        </main>
    )
}
export default Auth
