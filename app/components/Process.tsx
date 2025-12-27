"use client";

import { motion } from "framer-motion";

const steps = [
    {
        number: "01",
        title: "Discovery",
        description: "We dive deep into your vision, requirements, and target audience to architect the perfect solution.",
        color: "from-neon-purple to-neon-purple-light"
    },
    {
        number: "02",
        title: "Architecture",
        description: "Designing scalable systems and intuitive UI/UX that aligns with your brand identity.",
        color: "from-neon-purple-light to-neon-cyan"
    },
    {
        number: "03",
        title: "Build",
        description: "Agile development using cutting-edge tech stacks with regular updates and feedback loops.",
        color: "from-neon-cyan to-neon-cyan"
    },
    {
        number: "04",
        title: "Launch",
        description: "Comprehensive testing, deployment, and post-launch optimization for maximum impact.",
        color: "from-neon-cyan to-neon-purple"
    }
];

const Process = () => {
    return (
        <section id="process" className="relative py-24 overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-neon-purple/5 rounded-full blur-[150px]" />

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl sm:text-5xl font-bold mb-4">
                        Our <span className="gradient-text">Process</span>
                    </h2>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                        A streamlined workflow designed to deliver excellence at every step.
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
                    {/* Connecting Line (Desktop) */}
                    <div className="hidden lg:block absolute top-[60px] left-[10%] right-[10%] h-0.5 bg-gradient-to-r from-neon-purple via-neon-cyan to-neon-purple opacity-20" />

                    {steps.map((step, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.2 }}
                            className="relative"
                        >
                            <div className="glass-card p-8 rounded-2xl h-full border-t border-white/10 hover:border-neon-cyan/30 transition-all duration-300">
                                <div className={`text-5xl font-bold bg-gradient-to-r ${step.color} bg-clip-text text-transparent mb-6`}>
                                    {step.number}
                                </div>
                                <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                                <p className="text-gray-400 text-sm leading-relaxed">
                                    {step.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Process;
