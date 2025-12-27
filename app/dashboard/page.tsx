"use client";

import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { LayoutDashboard, ShieldCheck, Package, Clock, ExternalLink } from "lucide-react";
import { getApiUrl } from "@/lib/api";
import Navbar from "../components/Navbar";

export default function Dashboard() {
    const { user, loading, getAuthToken } = useAuth();
    const [stats, setStats] = useState<any>(null);

    useEffect(() => {
        const fetchUserData = async () => {
            if (user) {
                try {
                    const token = await getAuthToken();
                    const res = await fetch(getApiUrl("/api/user/profile"), {
                        headers: { Authorization: `Bearer ${token}` }
                    });
                    if (res.ok) {
                        const data = await res.json();
                        setStats(data.user);
                    } else {
                        console.error("Failed to fetch user profile:", res.status, res.statusText);
                    }
                } catch (error) {
                    console.error("Dashboard failed to fetch stats", error);
                }
            }
        };
        if (user) fetchUserData();
    }, [user, getAuthToken]);

    if (loading) return <div className="min-h-screen bg-black flex items-center justify-center text-neon-purple animate-pulse">Loading Dashboard...</div>;

    return (
        <div className="min-h-screen bg-black text-white">
            <Navbar />

            <main className="max-w-7xl mx-auto pt-24 px-4 sm:px-6 lg:px-8 pb-12">
                {!user ? (
                    <div className="text-center py-20 glass-card rounded-2xl border border-white/10 bg-gradient-to-br from-neon-purple/5 to-transparent">
                        <h2 className="text-3xl font-bold mb-4 gradient-text">Your Command Center Awaits</h2>
                        <p className="text-gray-400 mb-8 max-w-lg mx-auto">Please login to access your dashboard, manage project inquiries, and track your development legacy.</p>
                        {/* The login button is in the Navbar */}
                    </div>
                ) : (
                    <>
                        <header className="mb-12">
                            <h1 className="text-4xl font-bold gradient-text">Dashboard</h1>
                            <p className="text-gray-400 mt-2">Manage your subscriptions and projects.</p>
                        </header>

                        <div className="grid md:grid-cols-3 gap-8">
                            {/* Subscription Card */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="glass-card p-6 rounded-2xl border border-white/10"
                            >
                                <div className="flex items-center gap-4 mb-6 text-neon-cyan">
                                    <ShieldCheck size={28} />
                                    <h2 className="text-xl font-bold">Active Plan</h2>
                                </div>
                                <div className="space-y-2">
                                    <p className="text-3xl font-bold capitalize">{stats?.plan || 'None'}</p>
                                    <p className="text-gray-400 text-sm italic">Next billing: N/A</p>
                                </div>
                                <button className="w-full mt-6 py-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                                    Manage Subscription
                                </button>
                            </motion.div>

                            {/* Usage/Stats Card */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                                className="glass-card p-6 rounded-2xl border border-white/10"
                            >
                                <div className="flex items-center gap-4 mb-6 text-neon-purple">
                                    <Package size={28} />
                                    <h2 className="text-xl font-bold">Project Inquiries</h2>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-3xl font-bold">0</p>
                                    <p className="text-gray-400 text-sm">Total active requests</p>
                                </div>
                                <button className="w-full mt-6 py-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                                    View All Requests
                                </button>
                            </motion.div>

                            {/* Quick Support Card */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="glass-card p-6 rounded-2xl border border-white/10 bg-gradient-to-br from-neon-purple/5 to-transparent"
                            >
                                <div className="flex items-center gap-4 mb-6 text-white">
                                    <Clock size={28} />
                                    <h2 className="text-xl font-bold">Support Status</h2>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-lg font-medium">Ready to built</p>
                                    <p className="text-gray-400 text-sm">Priority support is available for Pro & Enterprise users.</p>
                                </div>
                                <button onClick={() => window.location.href = "#contact"} className="w-full mt-6 py-2 rounded-lg bg-neon-purple text-white font-medium hover:bg-neon-purple/80 transition-colors">
                                    New Brief
                                </button>
                            </motion.div>
                        </div>

                        {/* Integration/Activity placeholder */}
                        <div className="mt-12 glass-card p-8 rounded-2xl border border-white/10">
                            <h3 className="text-xl font-bold mb-6">Recent Activity</h3>
                            <div className="text-gray-500 text-center py-12 italic border-2 border-dashed border-white/5 rounded-xl">
                                No recent activity found. Start by submitting a project brief!
                            </div>
                        </div>
                    </>
                )}
            </main>
        </div>
    );
}
