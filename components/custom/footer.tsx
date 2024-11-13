import Link from "next/link";
import React from "react";
const Footer = () => {
  const currentYear = new Date().getFullYear();
  const links = [
    { href: "/about", label: "About" },
    { href: "/blog", label: "Blog" },
    { href: "/faqs", label: "FAQs" },
    { href: "/sign-in", label: "Sign In" },
    { href: "/coins", label: "Coins" },
  ];
  return (
    <footer className="p-4 bg-white border-t md:p-8 lg:p-10">
      <div className="max-w-screen-xl mx-auto text-center">
        <span className="text-sm text-gray-500 sm:text-center">
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