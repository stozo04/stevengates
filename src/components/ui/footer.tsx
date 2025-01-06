import React from "react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="flex items-center justify-center">
      <div className="max-w-screen-xl mx-auto text-center">
        <span className={`text-sm sm:text-center`}>
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
