"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Loader2, CheckCircle } from "lucide-react";
import { getApiUrl } from "@/lib/api";

const Contact = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        brief: "",
        message: "",
    });
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [errorMessage, setErrorMessage] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("loading");
        setErrorMessage("");

        try {
            const response = await fetch(getApiUrl("/api/contact"), {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error("Failed to send message");
            }

            setStatus("success");
            setFormData({ name: "", email: "", brief: "", message: "" });

            setTimeout(() => setStatus("idle"), 5000);
        } catch {
            setStatus("error");
            setErrorMessage("Failed to send message. Please try again.");
        }
    };

    return (
        <section id="contact" className="relative py-24 overflow-hidden">
            {/* Background effects */}
            <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-neon-purple/10 rounded-full blur-[150px]" />

            <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
                        Let's <span className="gradient-text">Build</span>
                    </h2>
                    <p className="text-gray-400 text-lg max-w-xl mx-auto">
                        Ready to start your next big project? Fill out the brief below.
                    </p>
                </motion.div>

                {/* Contact Form */}
                <motion.form
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    onSubmit={handleSubmit}
                    className="glass-card rounded-2xl p-8 md:p-12"
                >
                    <div className="grid md:grid-cols-2 gap-6 mb-6">
                        {/* Name Input */}
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                                Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-neon-purple focus:ring-1 focus:ring-neon-purple transition-colors"
                                placeholder="John Doe"
                            />
                        </div>

                        {/* Email Input */}
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-neon-purple focus:ring-1 focus:ring-neon-purple transition-colors"
                                placeholder="john@example.com"
                            />
                        </div>
                    </div>

                    {/* Project Brief Input */}
                    <div className="mb-6">
                        <label htmlFor="brief" className="block text-sm font-medium text-gray-300 mb-2">
                            Project Brief (Topic/Idea)
                        </label>
                        <input
                            type="text"
                            id="brief"
                            name="brief"
                            value={formData.brief}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-neon-purple focus:ring-1 focus:ring-neon-purple transition-colors"
                            placeholder="e.g. A SaaS platform for..."
                        />
                    </div>

                    {/* Message Input */}
                    <div className="mb-6">
                        <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                            Detailed Message
                        </label>
                        <textarea
                            id="message"
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            required
                            rows={5}
                            className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-neon-purple focus:ring-1 focus:ring-neon-purple transition-colors resize-none"
                            placeholder="Tell us more about your requirements..."
                        />
                    </div>

                    {/* Error Message */}
                    {status === "error" && (
                        <div className="mb-6 p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                            {errorMessage}
                        </div>
                    )}

                    {/* Success Message */}
                    {status === "success" && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="mb-6 p-4 rounded-lg bg-green-500/10 border border-green-500/20 text-green-400 text-sm flex items-center"
                        >
                            <CheckCircle className="w-5 h-5 mr-2" />
                            Message sent successfully!
                        </motion.div>
                    )}

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={status === "loading"}
                        className="w-full md:w-auto px-8 py-3 rounded-full bg-neon-purple text-white font-medium btn-glow border border-neon-purple-light/30 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                        {status === "loading" ? (
                            <>
                                <Loader2 className="w-5 h-5 animate-spin" />
                                Sending...
                            </>
                        ) : (
                            <>
                                Send Request
                                <Send className="w-5 h-5" />
                            </>
                        )}
                    </button>
                </motion.form>
            </div>
        </section>
    );
};

export default Contact;
