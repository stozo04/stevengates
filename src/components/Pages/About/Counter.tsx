"use client";
import CountUp from "react-countup";

const Counter = () => {
  return (
    <div className="banner-counter d-flex flex-wrap flex-xl-nowrap align-items-center gap-3 gap-md-6 mt-10 mt-md-17">
      <div className="d-flex align-items-center gap-2 gap-xl-4">
        <h2 className="display-two fw-semibold p1-color">
          <CountUp start={0} end={10} duration={3} enableScrollSpy scrollSpyOnce>
            {({ countUpRef }) => <span ref={countUpRef} />}
          </CountUp>
        </h2>
        <div className="line"></div>
        <span className="n5-color">Years of Experience</span>
      </div>
      {/* <div className="d-flex align-items-center gap-2 gap-xl-4">
        <h2 className="display-two fw-semibold p1-color">
          <CountUp
            start={0}
            end={10}
            duration={3}
            enableScrollSpy
            scrollSpyOnce
          >
            {({ countUpRef }) => <span ref={countUpRef} />}
          </CountUp>
        </h2>
        <div className="line"></div>
        <span className="n5-color">Projects Completed</span>
      </div> */}
      {/* <div className="d-flex align-items-center gap-2 gap-xl-4">
        <h2 className="display-two fw-semibold p1-color d-flex gap-1">
          <CountUp start={0} end={6} duration={3} enableScrollSpy scrollSpyOnce>
            {({ countUpRef }) => <span ref={countUpRef} />}
          </CountUp>
          k
        </h2>
        <div className="line"></div>
        <span className="n5-color">Clients Worldwide</span>
      </div> */}
    </div>
  );
};

export default Counter;
