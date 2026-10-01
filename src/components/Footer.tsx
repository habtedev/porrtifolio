"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Heart, ArrowUp } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <footer className="bg-card border-t border-border relative overflow-hidden">
      {/* Glow Background Effect */}
      <div className="absolute inset-0 bg-gradient-to-t from-primary/5 via-transparent to-transparent pointer-events-none" />

      <div className="container mx-auto px-4 py-10 sm:py-16 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-10 mb-8 sm:mb-12">
          {/* Brand Section */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            transition={{ duration: 0.6 }}
            className="md:col-span-2 col-span-2"
          >
            <button
              onClick={scrollToTop}
              className="text-2xl sm:text-3xl font-bold bg-gradient-hero bg-clip-text text-transparent mb-3 sm:mb-4 hover:opacity-80 transition-opacity"
            >
              Habtamu.dev
            </button>
            <p className="text-muted-foreground mb-4 sm:mb-6 max-w-md leading-relaxed text-sm">
              Backend-focused Software Engineer & Full-Stack Developer from Gondar, Ethiopia.
              Specialized in scalable Node.js, Express, Python, Django, React, Next.js, MongoDB, and PostgreSQL architectures.
            </p>

            <div className="flex space-x-5">
              {[
                {
                  icon: Github,
                  href: "https://github.com/habtedev",
                  label: "GitHub",
                },
                {
                  icon: Linkedin,
                  href: "https://www.linkedin.com/in/habtamudev",
                  label: "LinkedIn",
                },
                {
                  icon: Mail,
                  href: "mailto:habtamudev@gmail.com",
                  label: "Email",
                },
              ].map(({ icon: Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  className="p-2 rounded-full bg-gradient-to-tr from-primary/10 to-primary/20 text-muted-foreground hover:text-primary shadow-sm transition-all duration-300"
                >
                  <Icon size={20} />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            transition={{ duration: 0.6, delay: 0.1 }}
            className="col-span-1"
          >
            <h4 className="font-semibold mb-3 sm:mb-4 text-base sm:text-lg">Quick Links</h4>
            <ul className="space-y-3">
              {[
                { name: "Home", href: "#home" },
                { name: "About", href: "#about" },
                { name: "Portfolio", href: "#portfolio" },
                { name: "Services", href: "#services" },
                { name: "Contact", href: "#contact" },
              ].map((link) => (
                <li key={link.name}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-muted-foreground hover:text-primary transition-colors duration-300"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Services */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            transition={{ duration: 0.6, delay: 0.2 }}
            className="col-span-1"
          >
            <h4 className="font-semibold mb-3 sm:mb-4 text-base sm:text-lg">Services</h4>
            <ul className="space-y-3 text-muted-foreground text-sm">
              {[
                "Authentication Systems",
                "Payment Integration",
                "Full-Stack Development",
                "Database Management",
                "Admin Panels",
                "Performance Optimization",
              ].map((service) => (
                <li
                  key={service}
                  className="hover:text-primary transition-colors duration-300"
                >
                  {service}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Bottom Section */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          transition={{ duration: 0.6, delay: 0.3 }}
          className="border-t border-border pt-6 sm:pt-8 flex flex-col sm:flex-row justify-between items-center text-muted-foreground text-xs sm:text-sm gap-3 sm:gap-0"
        >
          <div className="flex items-center">
            <span>© {currentYear} Habtamu Amare. Built with</span>
            <Heart size={16} className="text-red-500 mx-1 animate-pulse" />
            <span>in Ethiopia.</span>
          </div>

          <div className="flex items-center space-x-6">
            <button
              onClick={() => scrollToSection("#contact")}
              className="hover:text-primary transition-colors duration-300"
            >
              Privacy Policy
            </button>
            <button
              onClick={() => scrollToSection("#contact")}
              className="hover:text-primary transition-colors duration-300"
            >
              Terms
            </button>
            <span className="hidden sm:block">React + Tailwind + Motion</span>
          </div>
        </motion.div>

        {/* Floating Scroll-to-Top Button - hidden on mobile to avoid overlap with bottom bar */}
        <motion.button
          onClick={scrollToTop}
          whileHover={{ scale: 1.15 }}
          className="hidden md:flex fixed bottom-8 right-8 p-3 rounded-full bg-gradient-hero text-white shadow-lg hover:shadow-strong transition-all duration-300"
        >
          <ArrowUp size={20} />
        </motion.button>
      </div>
    </footer>
  );
};

export default Footer;
