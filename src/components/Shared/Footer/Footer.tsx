import Link from "next/link";

const Footer = () => {
  return (
    <footer className="container d-flex flex-wrap gap-3 gap-md-6 justify-content-center justify-content-sm-between align-items-center pb-4 pb-md-8 text-center mb-16 mb-lg-0">
      <span className="fs-eight fw-medium n5-color order-sm-1">
        Copyright © 2024{" "}
        <Link href="/" className="fs-eight fw-medium n5-color">
          Gates Company
        </Link>
        . All Rights Reserved.
      </span>
    </footer>
  );
};

export default Footer;
