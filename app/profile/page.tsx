"use client";

import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { User as UserIcon, Mail, Camera, Save, Loader2, Shield, ShieldCheck, MapPin, Calendar } from "lucide-react";
import Navbar from "../components/Navbar";
import { getApiUrl } from "@/lib/api";

export default function Profile() {
    const { user, loading, getAuthToken } = useAuth();
    const [name, setName] = useState("");
    const [isSaving, setIsSaving] = useState(false);
    const [message, setMessage] = useState("");

    useEffect(() => {
        if (user?.displayName) {
            setName(user.displayName);
        }
    }, [user]);

    const handleUpdateProfile = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);
        setMessage("");

        try {
            const token = await getAuthToken();
            const res = await fetch(getApiUrl("/api/user/profile"), {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({ name })
            });

            if (res.ok) {
                setMessage("Profile updated successfully! (Refresh to see changes in Google session)");
            } else {
                setMessage("Failed to update profile.");
            }
        } catch (error) {
            setMessage("Error connecting to server.");
        } finally {
            setIsSaving(false);
        }
    };

    if (loading) return <div className="min-h-screen bg-black flex items-center justify-center text-neon-cyan">Loading...</div>;

    return (
        <div className="min-h-screen bg-black text-white">
            <Navbar />

            <main className="max-w-4xl mx-auto pt-32 px-4 sm:px-6 lg:px-8 pb-12">
                {!user ? (
                    <div className="text-center py-20 glass-card rounded-2xl border border-white/10">
                        <h2 className="text-2xl font-bold mb-4 italic">Join the Legacy</h2>
                        <p className="text-gray-400 mb-8">Please login to access your profile and personalized settings.</p>
                        {/* The login button is in the Navbar, but we can add one here too if needed */}
                    </div>
                ) : (
                    <>
                        <header className="mb-12">
                            <h1 className="text-4xl font-bold gradient-text">Profile Settings</h1>
                            <p className="text-gray-400 mt-2">Update your personal information and preferences.</p>
                        </header>

                        <div className="grid md:grid-cols-3 gap-12">
                            {/* Left: Avatar Column */}
                            <div className="flex flex-col items-center gap-6">
                                <div className="relative group">
                                    <img
                                        src={user.photoURL || "/default-avatar.png"}
                                        alt="Avatar"
                                        className="w-40 h-40 rounded-full border-4 border-neon-purple shadow-[0_0_30px_rgba(123,44,191,0.3)] object-cover"
                                    />
                                    <div className="absolute inset-0 bg-black/40 rounded-full opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity cursor-pointer">
                                        <Camera size={24} />
                                    </div>
                                </div>
                                <p className="text-xs text-gray-500 text-center px-4">Avatars are synced via Google. Update your Google account image to change it here.</p>
                            </div>

                            {/* Right: Form Column */}
                            <motion.form
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                onSubmit={handleUpdateProfile}
                                className="md:col-span-2 space-y-8 glass-card p-8 rounded-2xl border border-white/10"
                            >
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-400 mb-2">Display Name</label>
                                        <div className="relative">
                                            <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
                                            <input
                                                type="text"
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                                className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-neon-purple transition-all outline-none"
                                                placeholder="Your full name"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-400 mb-2">Email Address (Read Only)</label>
                                        <div className="relative">
                                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
                                            <input
                                                type="email"
                                                value={user.email || ""}
                                                disabled
                                                className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/5 border border-white/5 text-gray-500 cursor-not-allowed outline-none"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {message && (
                                    <p className={`text-sm ${message.includes('successfully') ? 'text-green-400' : 'text-red-400'}`}>
                                        {message}
                                    </p>
                                )}

                                <button
                                    type="submit"
                                    disabled={isSaving}
                                    className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-neon-purple text-white font-bold btn-glow hover:bg-neon-purple/80 transition-all disabled:opacity-50"
                                >
                                    {isSaving ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />}
                                    {isSaving ? "Saving..." : "Save Changes"}
                                </button>
                            </motion.form>
                        </div>
                    </>
                )}
            </main>
        </div>
    );
}

// Helper to remove duplicated content
const ProfilePage = () => { return null; };
