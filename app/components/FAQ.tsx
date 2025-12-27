"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
    {
        question: "What is your typical project timeline?",
        answer: "Timelines vary by complexity. A simple landing page can take 1-2 weeks, while full SaaS applications typically take 4-8 weeks from discovery to launch."
    },
    {
        question: "How many revisions are included?",
        answer: "We include 3 rounds of revisions for design and development phases. Additional revisions can be accommodated at an hourly rate."
    },
    {
        question: "What tech stack do you use?",
        answer: "We specialize in the MERN stack (MongoDB, Express, React, Node.js) and Next.js for frontend, deployed on Vercel or AWS."
    },
    {
        question: "Do you offer post-launch support?",
        answer: "Yes! All our packages include a support period (varying by plan). We also offer monthly maintenance packages for long-term peace of mind."
    },
    {
        question: "How are payments handled?",
        answer: "We use a milestone-based payment structure or upfront payments for smaller packages. All transactions are secured via Stripe or PayPal."
    }
];

const FAQ = () => {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    const toggleFAQ = (index: number) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <section className="relative py-24 bg-black/50">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl font-bold mb-4">
                        Frequently Asked <span className="text-neon-cyan">Questions</span>
                    </h2>
                </motion.div>

                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="glass-card rounded-xl overflow-hidden"
                        >
                            <button
                                onClick={() => toggleFAQ(index)}
                                className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-white/5 transition-colors"
                            >
                                <span className="font-medium text-white">{faq.question}</span>
                                <ChevronDown
                                    className={`w-5 h-5 text-neon-cyan transition-transform duration-300 ${activeIndex === index ? "rotate-180" : ""
                                        }`}
                                />
                            </button>

                            <AnimatePresence>
                                {activeIndex === index && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <div className="px-6 pb-4 text-gray-400 text-sm leading-relaxed border-t border-white/5 pt-4">
                                            {faq.answer}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FAQ;
