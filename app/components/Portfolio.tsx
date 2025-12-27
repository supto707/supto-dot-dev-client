"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

const projects = [
    {
        title: "E-Commerce AI",
        category: "Full Stack / AI",
        image: "linear-gradient(135deg, #2a0845 0%, #6441a5 100%)", // Using gradient placeholder
        description: "AI-powered product recommendations with real-time analytics."
    },
    {
        title: "FinTech Dashboard",
        category: "Dashboard / SaaS",
        image: "linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%)",
        description: "Real-time financial data visualization and reporting platform."
    },
    {
        title: "HealthCare Portal",
        category: "Secure Platform",
        image: "linear-gradient(135deg, #134e5e 0%, #71b280 100%)",
        description: "HIPAA-compliant telemedicine platform for patient management."
    },
    {
        title: "Social Connect",
        category: "Mobile App / Web",
        image: "linear-gradient(135deg, #c31432 0%, #240b36 100%)",
        description: "Next-gen social networking with Web3 integration."
    }
];

const Portfolio = () => {
    return (
        <section id="work" className="relative py-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl sm:text-5xl font-bold mb-4">
                        Featured <span className="text-neon-cyan">Portfolio</span>
                    </h2>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                        Selected works that showcase our passion for quality and innovation.
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-8">
                    {projects.map((project, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="group relative h-[400px] rounded-2xl overflow-hidden glass-card cursor-pointer"
                        >
                            {/* Image Placeholder */}
                            <div
                                className="absolute inset-0 transition-transform duration-500 group-hover:scale-110"
                                style={{ background: project.image }}
                            />

                            {/* Overlay */}
                            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-colors duration-300" />

                            {/* Content */}
                            <div className="absolute inset-0 p-8 flex flex-col justify-end">
                                <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                    <span className="text-neon-cyan text-sm font-medium mb-2 block tracking-wider uppercase">
                                        {project.category}
                                    </span>
                                    <h3 className="text-3xl font-bold text-white mb-2">{project.title}</h3>
                                    <p className="text-gray-300 mb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                                        {project.description}
                                    </p>

                                    <Link href="#" className="inline-flex items-center text-white font-medium hover:text-neon-purple transition-colors">
                                        View Case Study <ArrowUpRight className="ml-2 w-4 h-4" />
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Portfolio;
