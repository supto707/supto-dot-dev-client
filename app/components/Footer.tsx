import { Github, Twitter, Linkedin, CreditCard } from "lucide-react";
import { SiPaypal, SiStripe, SiVisa } from "react-icons/si";

const Footer = () => {
    return (
        <footer className="relative py-12 border-t border-white/10 bg-black">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                    {/* Logo & Copyright */}
                    <div className="text-center md:text-left">
                        <span className="text-2xl font-bold gradient-text">Supto.dev</span>
                        <p className="text-gray-500 text-sm mt-2">
                            © {new Date().getFullYear()} Supto.dev. All rights reserved.
                        </p>
                    </div>

                    {/* Accepted Payments */}
                    <div className="flex flex-col items-center gap-2">
                        <span className="text-xs text-gray-500 uppercase tracking-widest">Accepted Payments</span>
                        <div className="flex items-center gap-4 text-gray-400">
                            <SiVisa className="w-8 h-8 hover:text-white transition-colors" />
                            <SiStripe className="w-8 h-8 hover:text-[#635BFF] transition-colors" />
                            <SiPaypal className="w-6 h-6 hover:text-[#00457C] transition-colors" />
                        </div>
                    </div>

                    {/* Social Icons */}
                    <div className="flex items-center gap-4">
                        <a
                            href="#"
                            className="p-2 rounded-lg bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
                        >
                            <Github className="w-5 h-5" />
                        </a>
                        <a
                            href="#"
                            className="p-2 rounded-lg bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
                        >
                            <Twitter className="w-5 h-5" />
                        </a>
                        <a
                            href="#"
                            className="p-2 rounded-lg bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
                        >
                            <Linkedin className="w-5 h-5" />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
