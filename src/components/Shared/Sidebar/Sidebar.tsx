"use client";
import Image from "next/image";
import Link from "next/link";
import me from "@/../public/images/me.jpg";
import { useTheme } from "next-themes";
import { usePathname } from "next/navigation";
import {
  PiFacebookLogo,
  PiLinkedinLogo,
  PiX,
} from "react-icons/pi";
import ThemeButton from "@/components/DarkMode/ThemeButton/ThemeButton";
import { sidebarsData } from "../../../../public/data/Sidebar";
import { useEffect, useState } from "react";

const Sidebar = () => {
  const { resolvedTheme } = useTheme();
  const path = usePathname();

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className={`side-menu`}>
      <div
        // onClick={() => setSidebarOpen(!sidebarOpen)}
        className={`sidebar-btn close-btn cursor-pointer d-block d-lg-none`}
      >
        <i className="fs-two p1-color">
          <PiX />
        </i>
      </div>

      <div className="d-flex">
        <div className="side-menu-left">
          <div>
            <div className="d-flex flex-column gap-8 justify-content-center align-items-center mt-6">
              <Link href="/" className="side-icon p1-color bgn2-color brn4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="11"
                  height="15"
                  viewBox="0 0 11 15"
                  fill="none"
                >
                  <g clipPath="url(#clip0_3569_434)">
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M5.69145 8.43063L1.72801 5.49387L5.69145 2.54023V0L0 4.21303V6.75919L5.69145 10.9887V8.43063Z"
                      fill="currentColor"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M1.72801 5.49387L5.69145 2.54023V0L0 4.21303V6.75919L1.72801 5.49387Z"
                      fill="currentColor"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M4.86328 6.5702L8.82672 9.5065L4.86328 12.4606V15.0004L10.5552 10.7864V8.24163L4.86328 4.01172V6.5702Z"
                      fill="currentColor"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M4.86328 6.5702L8.82672 9.5065L10.5552 10.7864V8.24163L4.86328 4.01172V6.5702Z"
                      fill="currentColor"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M8.72466 2.00391C9.52091 2.00391 10.1657 2.64912 10.1657 3.44491C10.1657 4.24115 9.52091 4.88591 8.72466 4.88591C7.92841 4.88591 7.2832 4.2407 7.2832 3.44491C7.2832 2.64912 7.92841 2.00391 8.72466 2.00391Z"
                      fill="currentColor"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M1.83013 12.9972C1.03388 12.9972 0.388672 12.352 0.388672 11.5562C0.388672 10.7604 1.03388 10.1152 1.82967 10.1152C2.62546 10.1152 3.27067 10.76 3.27067 11.5562C3.27067 12.3525 2.62592 12.9972 1.82967 12.9972H1.83013Z"
                      fill="currentColor"
                    />
                  </g>
                  <defs>
                    <clipPath>
                      <rect width="10.5561" height="15" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </Link>
              {/* <Link href="#" className="position-relative">
                <div className="side-icon bg1-color">
                  <i className="n11-color">
                    <PiShoppingCart />
                  </i>
                </div>
                <div className="cart-counter">
                  <span className="n11-color">02</span>
                </div>
              </Link> */}
              <div className="d-flex flex-column align-items-center gap-1">
                <span className="toggle_name fs-eleven n5-color">
                  {resolvedTheme === "light" ? "DarkMood" : "LightMood"}
                </span>
                <div className="side-icon bg1-color">
                  <ThemeButton />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="side-menu-right overflow-y-auto">
          <div className="d-flex flex-column gap-6 justify-content-between py-10 px-5 bgn2-color h-100">
            <div className="">
              <div className="sidebar-profile">
                <div className="position-relative">
                  <div className="profile-img1 d-flex justify-content-center overflow-hidden mx-auto">
                    <Image src={me} alt="user" className="" />
                  </div>
                  <span className="thumb">👋</span>
                </div>
                <h4 className="n5-color fw-semibold fs-five mt-2 text-center">
                  Steven Gates
                </h4>
                <span className="n5-color fs-nine d-block text-center">
                  Senior Software Engineer
                </span>
                <div className="d-flex justify-content-center gap-2 align-items-center mt-4">
                  <Link href="https://www.facebook.com/StOzO" className="social-icon">
                    <i className="p1-color">
                      <PiFacebookLogo />
                    </i>
                  </Link>

                  <Link href="https://x.com/sgates2011" className="social-icon">
                    <i className="p1-color">
                      <PiX />
                    </i>
                  </Link>
                  <Link href="https://www.linkedin.com/in/gates-steven" className="social-icon">
                    <i className="p1-color">
                      <PiLinkedinLogo />
                    </i>
                  </Link>
                </div>
              </div>
              <div className="line-divider my-4 my-md-8"></div>
              <div className="menu-list">
                <ul className="d-flex flex-column gap-3">
                  {sidebarsData.map(
                    ({
                      id,
                      name,
                      url,
                      icon,
                      numbers,
                    }: {
                      id: number;
                      name: string;
                      url: string;
                      icon: React.JSX.Element;
                      numbers?: number | undefined;
                    }) => (
                      <li key={id} className="rounded-3">
                        <Link
                          href={url}
                          // onClick={() => setSidebarOpen(!sidebarOpen)}
                          className={`d-flex justify-content-between align-items-center rounded-3 ${
                            path === url && "active"
                          }`}
                        >
                          <div
                            className={`menu-item d-flex align-items-center gap-2 n5-color fs-eight px-3 py-2 `}
                          >
                            {icon}
                            {name}
                          </div>

                          {numbers ? (
                            <span className="n5-color bg2-color fs-ten px-1 pt-1 rounded-2 me-3">
                              {numbers}
                            </span>
                          ) : (
                            ""
                          )}
                        </Link>
                      </li>
                    )
                  )}
                </ul>
              </div>
            </div>
            {/* <Link
              href="/contact"
              className="p-btn bg1-color fw-medium n11-color px-3 px-md-6 py-2 py-md-4 rounded-pill d-flex align-items-center gap-2 mx-auto"
            >
              <i className="ph ph-paper-plane-tilt">
                <PiPaperPlaneTilt />
              </i>
              Hire Me
            </Link> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
