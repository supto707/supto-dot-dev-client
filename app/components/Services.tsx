"use client";

import { motion } from "framer-motion";
import { Code2, PenTool, Bot, Cloud, Database, Hammer } from "lucide-react";

const services = [
    {
        icon: Code2,
        title: "Full Stack Dev",
        description: "End-to-end web applications using Next.js and Node.js ecosystems."
    },
    {
        icon: PenTool,
        title: "UI/UX Design",
        description: "Creating intuitive, accessible, and beautiful user interfaces."
    },
    {
        icon: Bot,
        title: "AI Integration",
        description: "Integrating LLMs and machine learning models into your apps."
    },
    {
        icon: Cloud,
        title: "Cloud Scaling",
        description: "Serverless architecture and DevOps for high-availability systems."
    },
    {
        icon: Database,
        title: "API Development",
        description: "Robust REST and GraphQL APIs designed for scalability."
    },
    {
        icon: Hammer,
        title: "Maintenance",
        description: "Ongoing support, updates, and performance optimization."
    }
];

const Services = () => {
    return (
        <section id="services" className="relative py-24 bg-black/50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl sm:text-5xl font-bold mb-4">
                        Our <span className="text-neon-purple">Services</span>
                    </h2>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                        Comprehensive solutions to bring your digital vision to life.
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((service, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="glass-card p-8 rounded-2xl hover:border-neon-cyan/50 transition-colors duration-300 group"
                        >
                            <div className="w-12 h-12 bg-white/5 rounded-lg flex items-center justify-center mb-6 group-hover:bg-neon-cyan/20 transition-colors">
                                <service.icon className="w-6 h-6 text-gray-300 group-hover:text-neon-cyan" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3">{service.title}</h3>
                            <p className="text-gray-400 leading-relaxed text-sm">
                                {service.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Services;
