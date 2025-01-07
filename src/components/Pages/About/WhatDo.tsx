import Link from "next/link";
import FadeDown from "@/components/motionEffect/FadeDown";

const WhatDo = () => {
  return (
    <section className="pt-120 pb-120">
      <div className="container">
        <FadeDown>
          <div className="d-flex gap-3 flex-wrap flex-xxl-nowrap justify-content-between align-items-end">
            <div className="section-heading">
              <div className="d-flex align-items-center gap-2">
                <div className="title-line"></div>
                <h2 className="display-four n5-color fw-semibold">What I Do</h2>
              </div>
              <p className="fs-seven n4-color mt-2 mt-md-4">
                I have more than 10 years experience building software for
                clients all over the world. Below is a quick overview of my main
                technical skill sets and technologies I use. Want to find out
                more about my experience? Check out my 
                <Link href="/resume" className="p1-color">
                  online resume
                </Link>{" "}
                and
                <Link href="/portfolio" className="p1-color">
                  project portfolio
                </Link>
                .
              </p>
            </div>
  
          </div>
        </FadeDown>
      </div>
    </section>
  );
};

export default WhatDo;
