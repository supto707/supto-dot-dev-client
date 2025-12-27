"use client";

import { motion } from "framer-motion";
import { Check, Zap, Crown, Building2, Rocket } from "lucide-react";
import { getApiUrl } from "@/lib/api";

const plans = [
    {
        name: "Starter",
        price: "$100",
        period: "/project",
        description: "Perfect for MVPs and small prototypes",
        icon: Rocket,
        features: [
            "Landing Page Design",
            "Next.js Development",
            "Contact Form",
            "1 Week Support",
            "Basic SEO",
        ],
        cta: "Start Project",
        popular: false,
    },
    {
        name: "Growth",
        price: "$150",
        period: "/project",
        description: "Most popular for growing startups",
        icon: Zap,
        features: [
            "Full Web Application",
            "Database Integration",
            "Auth System",
            "1 Month Support",
            "Advanced Analytics",
            "Admin Dashboard",
        ],
        cta: "Select Growth",
        popular: true,
    },
    {
        name: "Pro",
        price: "$180",
        period: "/project",
        description: "Professional grade solution",
        icon: Crown,
        features: [
            "Everything in Growth",
            "Payment Integration",
            "Cloud Infrastructure",
            "3 Months Support",
            "Performance Optimization",
            "Custom API",
            "UI/UX Design Files",
        ],
        cta: "Go Pro",
        popular: false,
    },
    {
        name: "Enterprise",
        price: "$200",
        period: "/project",
        description: "For large scale organizations",
        icon: Building2,
        features: [
            "Everything in Pro",
            "Dedicated Team",
            "24/7 Priority Support",
            "SLA Guarantee",
            "Advanced Security",
            "Custom Integrations",
            "Scalability Planning",
        ],
        cta: "Contact Sales",
        popular: false,
    },
];

const Pricing = () => {
    const handleCheckout = async (planName: string) => {
        try {
            const response = await fetch(getApiUrl("/api/checkout"), {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({ plan: planName.toLowerCase() }),
            });

            const data = await response.json();
            if (data.url) {
                window.location.href = data.url;
            } else if (!data.success) {
                // Redirect to login if auth required
                window.location.href = getApiUrl("/auth/google");
            }
        } catch (error) {
            console.error("Checkout error:", error);
        }
    };

    return (
        <section id="pricing" className="relative py-24 overflow-hidden">
            {/* Background effects */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-neon-purple/10 rounded-full blur-[150px]" />

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
                        Transparent <span className="text-neon-cyan">Pricing</span>
                    </h2>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                        Choose the perfect plan for your project needs. No hidden fees.
                    </p>
                </motion.div>

                {/* Pricing Cards */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {plans.map((plan, index) => (
                        <motion.div
                            key={plan.name}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            className={`relative rounded-2xl p-6 flex flex-col ${plan.popular
                                ? "glass-card border border-neon-purple shadow-[0_0_30px_rgba(123,44,191,0.3)] scale-105 z-10"
                                : "glass-card hover:border-neon-cyan/30"
                                }`}
                        >
                            {/* Popular Badge */}
                            {plan.popular && (
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-full text-center">
                                    <span className="px-4 py-1.5 rounded-full bg-neon-purple text-white text-sm font-medium shadow-[0_0_20px_rgba(123,44,191,0.5)]">
                                        Most Popular
                                    </span>
                                </div>
                            )}

                            {/* Plan Icon */}
                            <div className={`inline-flex p-3 rounded-lg mb-6 self-start ${plan.popular ? "bg-neon-purple/20 text-neon-purple" : "bg-white/5 text-gray-400"
                                }`}>
                                <plan.icon className="w-6 h-6" />
                            </div>

                            {/* Plan Name & Price */}
                            <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
                            <div className="flex items-baseline mb-4">
                                <span className={`text-4xl font-bold ${plan.popular ? "text-neon-purple text-glow" : "text-white"
                                    }`}>
                                    {plan.price}
                                </span>
                                <span className="text-gray-500 text-sm ml-1">{plan.period}</span>
                            </div>
                            <p className="text-gray-400 text-xs mb-6 h-8">{plan.description}</p>

                            {/* Features */}
                            <ul className="space-y-3 mb-8 flex-grow">
                                {plan.features.map((feature, i) => (
                                    <li key={i} className="flex items-start text-gray-300">
                                        <Check className={`w-4 h-4 mr-2 flex-shrink-0 mt-0.5 ${plan.popular ? "text-neon-purple" : "text-neon-cyan"
                                            }`} />
                                        <span className="text-xs">{feature}</span>
                                    </li>
                                ))}
                            </ul>

                            {/* CTA Button */}
                            <button
                                onClick={() => handleCheckout(plan.name)}
                                className={`w-full py-3 rounded-full font-medium text-sm transition-all duration-300 ${plan.popular
                                    ? "bg-neon-purple text-white btn-glow border border-neon-purple-light/30 hover:bg-neon-purple-light"
                                    : "bg-white/5 text-white hover:bg-white/10 border border-white/10 hover:border-neon-cyan/50"
                                    }`}
                            >
                                {plan.cta}
                            </button>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Pricing;
