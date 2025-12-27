"use client";

import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Users, FileText, LayoutDashboard, Search, ExternalLink } from "lucide-react";
import Navbar from "../components/Navbar";

export default function AdminDashboard() {
    const { user, loading, getAuthToken } = useAuth();
    const [data, setData] = useState<any>(null);
    const [isAdmin, setIsAdmin] = useState(false);
    const [activeTab, setActiveTab] = useState<'stats' | 'projects'>('stats');

    useEffect(() => {
        const verifyAdmin = async () => {
            if (user) {
                const token = await getAuthToken();
                const res = await fetch("http://localhost:5000/api/admin/stats", {
                    headers: { Authorization: `Bearer ${token}` }
                });
                if (res.ok) {
                    setIsAdmin(true);
                    const statsData = await res.json();
                    setData(statsData.stats);
                } else {
                    setIsAdmin(false);
                }
            }
        };
        if (user) verifyAdmin();
    }, [user]);

    const fetchProjects = async () => {
        const token = await getAuthToken();
        const res = await fetch("http://localhost:5000/api/admin/projects", {
            headers: { Authorization: `Bearer ${token}` }
        });
        const projectsData = await res.json();
        setData(projectsData.projects);
    };

    useEffect(() => {
        if (isAdmin && activeTab === 'projects') {
            fetchProjects();
        }
    }, [activeTab, isAdmin]);

    if (loading) return <div className="min-h-screen bg-black flex items-center justify-center">Checking Admin Access...</div>;
    if (!user || !isAdmin) return (
        <div className="min-h-screen bg-black flex flex-col items-center justify-center text-white gap-4">
            <h1 className="text-4xl font-bold text-red-500">403: Forbidden</h1>
            <p className="text-gray-400">You do not have administrative privileges.</p>
            <a href="/" className="text-neon-cyan hover:underline">Return Home</a>
        </div>
    );

    return (
        <div className="min-h-screen bg-black text-white">
            <Navbar />

            <div className="max-w-7xl mx-auto pt-28 px-4 sm:px-6 lg:px-8 pb-12 flex flex-col md:flex-row gap-8">
                {/* Sidebar Navigation */}
                <aside className="w-full md:w-64 space-y-2">
                    <button
                        onClick={() => setActiveTab('stats')}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'stats' ? 'bg-neon-purple text-white' : 'hover:bg-white/5 text-gray-400'}`}
                    >
                        <LayoutDashboard size={20} />
                        Overview
                    </button>
                    <button
                        onClick={() => setActiveTab('projects')}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'projects' ? 'bg-neon-purple text-white' : 'hover:bg-white/5 text-gray-400'}`}
                    >
                        <FileText size={20} />
                        Project Inquiries
                    </button>
                    <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-gray-400 hover:bg-white/5 cursor-not-allowed opacity-50">
                        <Users size={20} />
                        User Management
                    </button>
                </aside>

                {/* Main Content Area */}
                <main className="flex-1">
                    <header className="mb-8 p-6 glass-card rounded-2xl border border-white/5">
                        <h2 className="text-2xl font-bold capitalize">{activeTab} Dashboard</h2>
                        <p className="text-sm text-gray-500 mt-1">Logged in as {user.displayName} (Admin)</p>
                    </header>

                    {activeTab === 'stats' && data && (
                        <div className="grid sm:grid-cols-3 gap-6">
                            <div className="glass-card p-6 rounded-2xl border border-white/10 text-center">
                                <p className="text-gray-400 text-sm mb-2">Total Users</p>
                                <p className="text-4xl font-bold text-neon-cyan">{data.totalUsers}</p>
                            </div>
                            <div className="glass-card p-6 rounded-2xl border border-white/10 text-center">
                                <p className="text-gray-400 text-sm mb-2">Inquiries</p>
                                <p className="text-4xl font-bold text-neon-purple">{data.totalProjects}</p>
                            </div>
                            <div className="glass-card p-6 rounded-2xl border border-white/10 text-center">
                                <p className="text-gray-400 text-sm mb-2">Subs</p>
                                <p className="text-4xl font-bold text-white">{data.activeSubscriptions}</p>
                            </div>
                        </div>
                    )}

                    {activeTab === 'projects' && Array.isArray(data) && (
                        <div className="glass-card rounded-2xl border border-white/10 overflow-hidden">
                            <table className="w-full text-left">
                                <thead className="bg-white/5 text-xs uppercase text-gray-400">
                                    <tr>
                                        <th className="px-6 py-4 font-medium">Name</th>
                                        <th className="px-6 py-4 font-medium">Brief</th>
                                        <th className="px-6 py-4 font-medium">Status</th>
                                        <th className="px-6 py-4 font-medium">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5">
                                    {data.map((proj: any) => (
                                        <tr key={proj._id} className="hover:bg-white/[0.02] transition-colors">
                                            <td className="px-6 py-4">
                                                <p className="font-medium">{proj.contactName}</p>
                                                <p className="text-xs text-gray-500">{proj.contactEmail}</p>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-300 max-w-xs truncate">{proj.brief}</td>
                                            <td className="px-6 py-4">
                                                <span className="px-2 py-1 rounded-full bg-yellow-500/10 text-yellow-500 text-[10px] font-bold uppercase transition-all">
                                                    {proj.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-gray-400 hover:text-white transition-colors cursor-pointer">
                                                <ExternalLink size={18} />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
}
