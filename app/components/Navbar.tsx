"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import AuthModal from "./AuthModal";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
    const { user, userRole, logout } = useAuth();

    const navLinks = [
        { href: "#work", label: "Work" },
        { href: "#services", label: "Services" },
        { href: "#process", label: "Process" },
        { href: "#pricing", label: "Pricing" },
    ];

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="fixed top-0 left-0 right-0 z-50 glass"
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link href="/" className="flex items-center space-x-2">
                        <span className="text-2xl font-bold gradient-text">Supto.dev</span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="text-gray-300 hover:text-white transition-colors duration-300 relative group"
                            >
                                {link.label}
                                <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-neon-purple to-neon-cyan group-hover:w-full transition-all duration-300" />
                            </Link>
                        ))}
                    </div>

                    {/* Login / User Info */}
                    <div className="hidden md:flex items-center gap-4">
                        {user ? (
                            <div className="relative group">
                                <button className="flex items-center gap-3 px-3 py-1.5 rounded-full hover:bg-white/5 transition-colors border border-transparent hover:border-white/10">
                                    <div className="text-right hidden sm:block">
                                        <p className="text-sm font-medium text-white line-clamp-1">{user.displayName}</p>
                                        <p className="text-[10px] text-gray-400 capitalize">{user.email?.split('@')[0]}</p>
                                    </div>
                                    <img
                                        src={user.photoURL || "/default-avatar.png"}
                                        alt="Avatar"
                                        className="w-9 h-9 rounded-full border border-neon-purple shadow-[0_0_10px_rgba(123,44,191,0.3)]"
                                    />
                                </button>

                                {/* Dropdown Menu */}
                                <div className="absolute right-0 top-full pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                                    <div className="w-56 glass-card rounded-xl p-2 shadow-2xl border border-white/10">
                                        <Link
                                            href="/dashboard"
                                            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10 text-gray-300 hover:text-white transition-colors"
                                        >
                                            Dashboard
                                        </Link>
                                        {userRole === 'admin' && (
                                            <Link
                                                href="/admin"
                                                className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-neon-purple/20 text-neon-purple font-medium transition-colors"
                                            >
                                                Admin Dashboard
                                            </Link>
                                        )}
                                        <Link
                                            href="/profile"
                                            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10 text-gray-300 hover:text-white transition-colors"
                                        >
                                            Profile Settings
                                        </Link>
                                        <div className="h-px bg-white/10 my-1" />
                                        <button
                                            onClick={() => logout()}
                                            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-red-500/10 text-red-500 transition-colors text-left"
                                        >
                                            Logout
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <button
                                onClick={() => setIsAuthModalOpen(true)}
                                className="inline-flex items-center px-6 py-2.5 rounded-full bg-black/50 text-white font-medium btn-glow border border-neon-purple hover:bg-neon-purple/20 transition-all"
                            >
                                Signup / Login
                            </button>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="md:hidden p-2 text-gray-300 hover:text-white transition-colors"
                    >
                        {isOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="md:hidden glass"
                    >
                        <div className="px-4 py-4 space-y-4">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    onClick={() => setIsOpen(false)}
                                    className="block text-gray-300 hover:text-white transition-colors"
                                >
                                    {link.label}
                                </Link>
                            ))}
                            {user ? (
                                <button
                                    onClick={() => logout()}
                                    className="block w-full text-center px-6 py-2.5 rounded-full bg-red-500/10 text-red-500 font-medium border border-red-500/20"
                                >
                                    Logout ({user.displayName})
                                </button>
                            ) : (
                                <button
                                    onClick={() => {
                                        setIsOpen(false);
                                        setIsAuthModalOpen(true);
                                    }}
                                    className="block w-full text-center px-6 py-2.5 rounded-full bg-neon-purple text-white font-medium btn-glow"
                                >
                                    Login with Google
                                </button>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Auth Modal */}
            <AuthModal
                isOpen={isAuthModalOpen}
                onClose={() => setIsAuthModalOpen(false)}
            />
        </motion.nav>
    );
};

export default Navbar;
