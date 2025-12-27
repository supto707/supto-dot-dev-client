"use client";

import { motion } from "framer-motion";
import { Code2, Rocket, Shield, Zap, GitBranch, Layers } from "lucide-react";

const features = [
    {
        icon: Code2,
        title: "Modern Stack",
        description: "Built with the latest technologies including Next.js, TypeScript, and more.",
    },
    {
        icon: Rocket,
        title: "Blazing Fast",
        description: "Optimized for performance with lightning-fast load times and smooth interactions.",
    },
    {
        icon: Shield,
        title: "Secure by Default",
        description: "Enterprise-grade security with encryption, OAuth, and secure data handling.",
    },
    {
        icon: Zap,
        title: "Real-time Sync",
        description: "Instant synchronization across all your devices and team members.",
    },
    {
        icon: GitBranch,
        title: "Version Control",
        description: "Built-in versioning and rollback capabilities for all your projects.",
    },
    {
        icon: Layers,
        title: "Scalable",
        description: "Grows with your needs from prototype to production at any scale.",
    },
];

const Features = () => {
    return (
        <section id="features" className="relative py-24 overflow-hidden">
            {/* Background effects */}
            <div className="absolute top-0 right-1/4 w-96 h-96 bg-neon-purple/10 rounded-full blur-[150px]" />

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
                        Powerful <span className="gradient-text">Features</span>
                    </h2>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                        Everything you need to build, deploy, and scale your projects with confidence.
                    </p>
                </motion.div>

                {/* Features Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <motion.div
                            key={feature.title}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="group glass-card rounded-xl p-6 hover:border-neon-purple/50 transition-all duration-300"
                        >
                            <div className="inline-flex p-3 rounded-lg bg-neon-purple/10 text-neon-purple mb-4 group-hover:bg-neon-purple/20 transition-colors">
                                <feature.icon className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                            <p className="text-gray-400 text-sm leading-relaxed">{feature.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Features;
