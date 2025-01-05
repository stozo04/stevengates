"use client"; // Enable client-side rendering for theme switching
import React from "react";
import { useTheme } from "next-themes";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { resolvedTheme } = useTheme(); // Get the current theme

  // Dynamic styles based on theme
  const footerBackground = resolvedTheme === "dark" ? "bg-black" : "bg-white";
  const textColor = resolvedTheme === "dark" ? "text-gray-400" : "text-gray-500";

  return (
    <footer className={`p-4 border-t md:p-8 lg:p-10 ${footerBackground}`}>
      <div className="max-w-screen-xl mx-auto text-center">
        <span className={`text-sm sm:text-center ${textColor}`}>
          © {currentYear}{" "}
          <a href="#" className="hover:underline">
            Steven Gates
          </a>
          . All Rights Reserved.
        </span>
      </div>
    </footer>
  );
};

export default Footer;
