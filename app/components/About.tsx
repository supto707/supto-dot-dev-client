"use client";

import { motion } from "framer-motion";

const About = () => {
    return (
        <section className="relative py-24 overflow-hidden">
            {/* Background Glow */}
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-96 h-96 bg-neon-purple/5 rounded-full blur-[120px]" />

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid md:grid-cols-2 gap-16 items-center">
                    {/* Left: 3D Glowing Card */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="relative perspective-1000"
                    >
                        <div className="relative z-10 glass-card rounded-2xl p-8 border-glow transform rotate-y-12 hover:rotate-y-0 transition-transform duration-500 ease-out h-[400px] flex items-center justify-center">
                            <div className="absolute inset-0 bg-gradient-to-br from-neon-purple/20 to-neon-cyan/20 rounded-2xl" />
                            <div className="text-center relative z-20">
                                <h3 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-neon-purple to-neon-cyan">
                                    Visionary
                                </h3>
                                <p className="text-xl text-gray-300">Engineering the Future</p>
                            </div>
                        </div>

                        {/* Decoration */}
                        <div className="absolute -top-10 -right-10 w-32 h-32 bg-neon-cyan/20 rounded-full blur-2xl" />
                        <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-neon-purple/20 rounded-full blur-2xl" />
                    </motion.div>

                    {/* Right: Mission Text */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <h2 className="text-4xl md:text-5xl font-bold mb-6">
                            Building <span className="gradient-text">High-Performance</span> SaaS
                        </h2>
                        <p className="text-lg text-gray-400 mb-6 leading-relaxed">
                            At Supto.dev, we don't just write code; we architect digital experiences that define brands.
                            Our mission is to empower developers and businesses with scalable, secure, and future-proof
                            web applications that stand the test of time.
                        </p>
                        <p className="text-lg text-gray-400 mb-8 leading-relaxed">
                            We leverage the power of modern stacks like Next.js and Cloud Native technologies to deliver
                            speed, reliability, and stunning aesthetics.
                        </p>

                        <div className="flex gap-4">
                            <div className="px-6 py-3 rounded-lg bg-white/5 border border-white/10">
                                <span className="block text-2xl font-bold text-white mb-1">5+</span>
                                <span className="text-sm text-gray-500">Years Experience</span>
                            </div>
                            <div className="px-6 py-3 rounded-lg bg-white/5 border border-white/10">
                                <span className="block text-2xl font-bold text-white mb-1">50+</span>
                                <span className="text-sm text-gray-500">Projects Launched</span>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default About;
