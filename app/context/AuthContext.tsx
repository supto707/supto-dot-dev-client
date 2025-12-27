"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import {
    onAuthStateChanged,
    signInWithPopup,
    signOut,
    User,
    getIdToken,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    RecaptchaVerifier,
    signInWithPhoneNumber,
    ConfirmationResult
} from "firebase/auth";
import { auth, googleProvider } from "@/lib/firebase";
import { getApiUrl } from "@/lib/api";

interface AuthContextType {
    user: User | null;
    userRole: string | null;
    loading: boolean;
    loginWithGoogle: () => Promise<void>;
    loginWithEmail: (email: string, pass: string) => Promise<void>;
    signupWithEmail: (email: string, pass: string) => Promise<void>;
    loginWithPhone: (phoneNumber: string, appVerifier: RecaptchaVerifier) => Promise<ConfirmationResult>;
    logout: () => Promise<void>;
    getAuthToken: () => Promise<string | null>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [userRole, setUserRole] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    const fetchUserRole = async (firebaseUser: User) => {
        try {
            const token = await getIdToken(firebaseUser);
            const res = await fetch(getApiUrl("/api/user/profile"), {
                headers: { Authorization: `Bearer ${token}` }
            });
            if (res.ok) {
                const data = await res.json();
                setUserRole(data.role);
            }
        } catch (error) {
            console.error("Failed to fetch user role:", error);
        }
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
            if (user) {
                fetchUserRole(user);
            } else {
                setUserRole(null);
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const loginWithGoogle = async () => {
        try {
            await signInWithPopup(auth, googleProvider);
        } catch (error) {
            console.error("Login failed:", error);
            throw error;
        }
    };

    const loginWithEmail = async (email: string, pass: string) => {
        try {
            await signInWithEmailAndPassword(auth, email, pass);
        } catch (error) {
            console.error("Email login failed:", error);
            throw error;
        }
    };

    const signupWithEmail = async (email: string, pass: string) => {
        try {
            await createUserWithEmailAndPassword(auth, email, pass);
        } catch (error) {
            console.error("Email signup failed:", error);
            throw error;
        }
    };

    const loginWithPhone = async (phoneNumber: string, appVerifier: RecaptchaVerifier) => {
        try {
            return await signInWithPhoneNumber(auth, phoneNumber, appVerifier);
        } catch (error) {
            console.error("Phone login failed:", error);
            throw error;
        }
    };

    const logout = async () => {
        try {
            await signOut(auth);
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    const getAuthToken = async () => {
        if (!user) return null;
        return await getIdToken(user);
    };

    return (
        <AuthContext.Provider value={{
            user,
            userRole,
            loading,
            loginWithGoogle,
            loginWithEmail,
            signupWithEmail,
            loginWithPhone,
            logout,
            getAuthToken
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
