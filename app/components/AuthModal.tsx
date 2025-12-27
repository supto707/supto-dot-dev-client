"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Mail, Github, Phone, Lock, ArrowRight } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { RecaptchaVerifier } from "firebase/auth";
import { auth } from "@/lib/firebase";

interface AuthModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
    const { loginWithGoogle, loginWithEmail, signupWithEmail, loginWithPhone } = useAuth();
    const [isLogin, setIsLogin] = useState(true);
    const [authMethod, setAuthMethod] = useState<"email" | "phone">("email");

    // Form States
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [verificationCode, setVerificationCode] = useState("");
    const [confirmationResult, setConfirmationResult] = useState<any>(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!isOpen) {
            setError("");
            setConfirmationResult(null);
            setVerificationCode("");
            setLoading(false);
        }
    }, [isOpen]);

    const handleEmailAuth = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);
        try {
            if (isLogin) {
                await loginWithEmail(email, password);
            } else {
                await signupWithEmail(email, password);
            }
            onClose();
        } catch (err: any) {
            setError(err.message || "Authentication failed");
        } finally {
            setLoading(false);
        }
    };

    const setupRecaptcha = () => {
        if (!(window as any).recaptchaVerifier) {
            (window as any).recaptchaVerifier = new RecaptchaVerifier(auth, "recaptcha-container", {
                size: "invisible",
                callback: () => {
                    console.log("Recaptcha resolved");
                }
            });
        }
    };

    const handlePhoneSignIn = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);
        try {
            setupRecaptcha();
            const appVerifier = (window as any).recaptchaVerifier;
            const result = await loginWithPhone(phoneNumber, appVerifier);
            setConfirmationResult(result);
        } catch (err: any) {
            setError(err.message || "Phone authentication failed");
        } finally {
            setLoading(false);
        }
    };

    const handleVerifyOtp = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);
        try {
            await confirmationResult.confirm(verificationCode);
            onClose();
        } catch (err: any) {
            setError(err.message || "Invalid verification code");
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6">
                {/* Backdrop */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                />

                {/* Modal Content */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 20 }}
                    className="relative w-full max-w-md glass-card rounded-2xl p-8 shadow-2xl overflow-hidden border border-white/10"
                >
                    <div id="recaptcha-container"></div>

                    {/* Close Button */}
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white transition-colors"
                    >
                        <X size={20} />
                    </button>

                    {/* Header */}
                    <div className="text-center mb-6">
                        <h2 className="text-3xl font-bold bg-gradient-to-r from-neon-purple to-neon-cyan bg-clip-text text-transparent">
                            {isLogin ? "Welcome Back" : "Create Account"}
                        </h2>
                        <p className="text-gray-400 mt-2 text-sm">
                            {isLogin ? "Sign in to access your dashboard" : "Join the future of web development"}
                        </p>
                    </div>

                    {/* Method Switcher */}
                    <div className="flex bg-white/5 p-1 rounded-xl mb-6">
                        <button
                            onClick={() => setAuthMethod("email")}
                            className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${authMethod === "email" ? "bg-neon-purple text-white" : "text-gray-400 hover:text-white"
                                }`}
                        >
                            Email
                        </button>
                        <button
                            onClick={() => setAuthMethod("phone")}
                            className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${authMethod === "phone" ? "bg-neon-purple text-white" : "text-gray-400 hover:text-white"
                                }`}
                        >
                            Phone
                        </button>
                    </div>

                    {error && (
                        <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-500 text-xs text-center">
                            {error}
                        </div>
                    )}

                    {/* Auth Forms */}
                    <div className="space-y-4">
                        {authMethod === "email" ? (
                            <form onSubmit={handleEmailAuth} className="space-y-4">
                                <div className="space-y-3">
                                    <div className="relative">
                                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4" />
                                        <input
                                            type="email"
                                            required
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="Email address"
                                            className="w-full pl-11 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-neon-purple transition-all"
                                        />
                                    </div>
                                    <div className="relative">
                                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4" />
                                        <input
                                            type="password"
                                            required
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            placeholder="Password"
                                            className="w-full pl-11 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-neon-purple transition-all"
                                        />
                                    </div>
                                </div>
                                <button
                                    disabled={loading}
                                    type="submit"
                                    className="w-full py-3 rounded-xl bg-neon-purple text-white font-semibold shadow-[0_0_20px_rgba(123,44,191,0.3)] hover:shadow-[0_0_30px_rgba(123,44,191,0.5)] transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                                >
                                    {loading ? "Processing..." : isLogin ? "Sign In" : "Get Started"}
                                    {!loading && <ArrowRight size={18} />}
                                </button>
                            </form>
                        ) : (
                            <div className="space-y-4">
                                {!confirmationResult ? (
                                    <form onSubmit={handlePhoneSignIn} className="space-y-4">
                                        <div className="relative">
                                            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4" />
                                            <input
                                                type="tel"
                                                required
                                                value={phoneNumber}
                                                onChange={(e) => setPhoneNumber(e.target.value)}
                                                placeholder="+1 234 567 890"
                                                className="w-full pl-11 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-neon-purple transition-all"
                                            />
                                        </div>
                                        <button
                                            disabled={loading}
                                            type="submit"
                                            className="w-full py-3 rounded-xl bg-neon-purple text-white font-semibold transition-all disabled:opacity-50"
                                        >
                                            {loading ? "Sending Code..." : "Send Verification Code"}
                                        </button>
                                    </form>
                                ) : (
                                    <form onSubmit={handleVerifyOtp} className="space-y-4">
                                        <div className="relative">
                                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4" />
                                            <input
                                                type="text"
                                                required
                                                value={verificationCode}
                                                onChange={(e) => setVerificationCode(e.target.value)}
                                                placeholder="Enter 6-digit code"
                                                className="w-full pl-11 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-neon-purple transition-all text-center tracking-[0.5em] font-mono"
                                                maxLength={6}
                                            />
                                        </div>
                                        <button
                                            disabled={loading}
                                            type="submit"
                                            className="w-full py-3 rounded-xl bg-neon-purple text-white font-semibold transition-all disabled:opacity-50"
                                        >
                                            {loading ? "Verifying..." : "Verify & Sign In"}
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setConfirmationResult(null)}
                                            className="w-full text-xs text-gray-400 hover:text-white transition-colors"
                                        >
                                            Change Phone Number
                                        </button>
                                    </form>
                                )}
                            </div>
                        )}

                        {/* Divider */}
                        <div className="flex items-center gap-4 my-6">
                            <div className="flex-1 h-px bg-white/10" />
                            <span className="text-gray-500 text-[10px] uppercase tracking-wider font-bold">Social Login</span>
                            <div className="flex-1 h-px bg-white/10" />
                        </div>

                        {/* Social Login Buttons */}
                        <div className="grid grid-cols-2 gap-4">
                            <button
                                onClick={async () => {
                                    try {
                                        await loginWithGoogle();
                                        onClose();
                                    } catch (err: any) {
                                        setError(err.message || "Google login failed");
                                    }
                                }}
                                className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm font-medium hover:bg-white/10 transition-all group"
                            >
                                <svg className="w-4 h-4 group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
                                    <path
                                        fill="currentColor"
                                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                    />
                                    <path
                                        fill="currentColor"
                                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                    />
                                    <path
                                        fill="currentColor"
                                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                    />
                                    <path
                                        fill="currentColor"
                                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                    />
                                </svg>
                                Google
                            </button>

                            <button className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm font-medium hover:bg-white/10 transition-all group">
                                <Github size={16} className="group-hover:scale-110 transition-transform" />
                                GitHub
                            </button>
                        </div>
                    </div>

                    {/* Toggle */}
                    <p className="text-center mt-6 text-gray-400 text-sm">
                        {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
                        <button
                            onClick={() => setIsLogin(!isLogin)}
                            className="text-neon-cyan font-semibold hover:underline"
                        >
                            {isLogin ? "Sign Up" : "Sign In"}
                        </button>
                    </p>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};

export default AuthModal;
