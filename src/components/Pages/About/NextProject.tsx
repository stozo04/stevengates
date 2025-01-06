import FadeDown from "@/components/motionEffect/FadeDown";
import Link from "next/link";
import React from "react";
import { PiArrowRight } from "react-icons/pi";

const NextProject = () => {
  return (
    <section className="next-project pt-120 pb-120">
      <FadeDown>
        <div className="container d-flex gap-3 gap-md-6 flex-wrap justify-content-between align-items-center">
          <div className="next-project-content">
            <h3 className="display-four n11-color fw-semibold mb-2 mb-md-4">
              Let’s Work together on your next Project
            </h3>
            <p className="fs-seven n11-color">
              I am available for freelance projects. Hire me and get your
              project done.
            </p>
          </div>
          <Link
            href="/contact"
            className="p-btn bg1-color fw-medium n11-color px-3 px-md-6 py-2 py-md-4 rounded-pill d-flex align-items-center gap-2 h-100"
          >
            <PiArrowRight />
            Let’s get in touch
          </Link>
        </div>
      </FadeDown>
    </section>
  );
};

export default NextProject;
