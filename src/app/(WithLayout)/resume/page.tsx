import Link from "next/link";
import {
  PiEnvelopeSimple,
  PiFilePdf,
  PiGithubLogo,
  PiGlobe,
  PiGraduationCap,
  PiLinkedinLogo,
  PiMapPin,
  PiTrophy,
  PiXLogo,
} from "react-icons/pi";
import FadeDown from "@/components/motionEffect/FadeDown";
import Footer from "@/components/Shared/Footer/Footer";
import CartModal from "@/components/Shared/Modal/CartModal";
import AwardModal from "@/components/Shared/Modal/AwardModal";
import AwardsSection from "@/components/Pages/Resume/AwardSection";
import { IoOpenOutline } from "react-icons/io5";

const Resume = () => {
  return (
    <div>
      <section className="pt-120 pb-120 mt-10 mt-lg-0">
        <FadeDown>
          <div className="pb-60 br-bottom-n3">
            <div data-aos="zoom-in" className="page-heading">
              <h3 className="page-title fs-onefw-semibold n5-color mb-2 mb-md-3 text-center">
                Online Resume
              </h3>

              <a
                href="/images/Steven_Gates_Resume.pdf"
                className="w-max p-btn bg1-color fw-medium n1-color px-3 px-md-6 py-2 py-md-4 rounded-pill d-flex align-items-center gap-2 mx-auto"
                download
              >
                <PiFilePdf /> Download PDF Version
              </a>
            </div>
          </div>
        </FadeDown>

        <div className="container mt-8 mt-md-15">
          <FadeDown>
            <div className="bgn2-color p-4 p-sm-8 p-md-15 rounded-5 brn4">
              <div className="d-flex flex-wrap justify-content-between align-items-center gap-3 br-bottom-n3 pb-3 pb-md-6">
                <div>
                  <h2 className="display-three p1-color fw-semibold">
                    Steven Gates
                  </h2>
                  <span className="n4-color fs-six fw-medium">
                    Senior Software Engineer
                  </span>
                </div>
                <div className="ps-5 br-left-n3">
                  <ul className="d-flex flex-column gap-3">
                    {/* <li>
                      <Link
                        href="tel:+6494461709"
                        className="d-flex gap-2 align-items-center n4-color"
                      >
                        <PiPhone />
                        0123 4567 890
                      </Link>
                    </li> */}
                    <li>
                      <Link
                        href="mailto:gates.steven@gmail.com"
                        className="d-flex gap-2 align-items-center n4-color"
                      >
                        <PiEnvelopeSimple />
                        gates.steven@gmail.com
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="https://github.com/stozo04"
                        className="d-flex gap-2 align-items-center n4-color"
                      >
                        <PiGlobe />
                        Github
                      </Link>
                    </li>
                    <li className="d-flex gap-2 align-items-center n4-color">
                      <PiMapPin />
                      Dallas, Texas
                    </li>
                  </ul>
                </div>
              </div>

              <div className="d-flex flex-wrap flex-md-nowrap align-items-center gap-5 gap-md-10 pb-4 pb-md-8 br-bottom-n3 pt-60">
                {/* <div className="resume-profile flex-shrink-0">
                  <Image
                    src={profile}
                    alt="profile"
                    className="object-fit-cover"
                    width="127"
                    height="159"
                  />
                </div> */}
                <p className="n42-color fs-seven">
                  Senior Software Engineer with over a decade of experience designing and delivering scalable, cloud-based solutions for large-scale applications.
                  Proven expertise in AWS, Azure, .NET, C#, SQL, and JavaScript, with a strong track record of leading teams to success.
                  Key accomplishments include architecting and managing communityarchives.com, a microservices-driven platform generating $100M+ annually with 50,000+ users,
                  and developing award-winning hydro monitoring systems serving millions across Texas.
                  Adept at mentoring, optimizing workflows, and collaborating with senior leadership to drive innovation.
                  Passionate about crafting efficient, user-focused solutions while leveraging modern technologies to achieve exceptional results in complex software ecosystems.
                </p>
              </div>

              <div className="resume-section row pt-60 pb-60 br-bottom-n3">
                <div className="col-md-8 col-lg-12 col-xl-8 col-xxl-9">
                  <div className="d-flex align-items-center gap-2 mb-5 mb-md-10">
                    <div className="title-line2"></div>
                    <h2 className="fs-three p1-color fw-semibold">
                      Work Experiences
                    </h2>
                  </div>

                  <div className="mb-4 mb-md-6">
                    <div className="d-flex flex-wrap gap-2 gap-sm-3 justify-content-between align-items-center">
                      <span className="n5-color fs-six fw-medium">
                        Senior Software Engineer
                      </span>
                      <span className="n4-color fs-eight">
                        Associa | 2019 - Present
                      </span>
                    </div>
                    <ul className="d-flex flex-column gap-3 ms-6 ms-lg-10">
                      <li className="n42-color fs-seven">
                        Leading a team of 10 to architect, implement and deliver communityarchives.com (an all-in-one digital solution to manage the entire real estate process) from scratch; Launched the service in 2019 and now the service has 50,000+ users and generates a cash flow of $100+ million USD per year.
                      </li>
                      <li className="n42-color fs-seven">
                        Designing the end to end workflow and data infrastructure for the Management portal with Angular, JavaScript, .NET,  C#,  GraphQL,  AWS  (DynamoDB,  RDS,  Aurora,  Lambda,  S3,  EventBridge,  API  Gate- way) for 50,000+ users to check and manage their home buying/selling process (such as paperwork, permits and external contractor work); Integrating Stripe for payment processing and implementing a throttling and data aggregation flow to generate 15+ different types of reports (such as revenue reports and outstanding collections).
                      </li>
                      <li className="n42-color fs-seven">
                        Architecting the Internal and Marketplace web portals to handle institution-specific needs (jurisdictions, licenses) and to showcase products for 100,000+ locations across the US using Angular, .NET, C#, GraphQL, AWS and Elasticsearch.
                      </li>
                      <li className="n42-color fs-seven">
                        Collaborating and communicating with senior leadership to identify and drive product visions and opportunities.
                      </li>
                      <li className="n42-color fs-seven">
                        Mentoring a team of 5 to increase their technical skills in areas such as design patterns, programming best practices, debugging tools and troubleshooting.
                      </li>
                    </ul>
                  </div>
                  <div className="mb-4 mb-md-6">
                    <div className="d-flex flex-wrap gap-1 gap-sm-3 justify-content-between align-items-center">
                      <span className="n5-color fs-six fw-medium">
                        Lead Software Developer
                      </span>
                      <span className="n4-color fs-eight">
                        Halff Associates | 2015 - 2019
                      </span>
                    </div>
                    <ul className="d-flex flex-column gap-3 ms-6 ms-lg-10">
                      <li className="n42-color fs-seven">
                        Architected and implemented an award-winning hydro monitoring and billing platform (C#, .NET, Azure, Google Charts, JavaScript, JQuery, SQL Server) to process hydro bills for the 2.1 million people of Tarrant County in Texas; Integrated with ESRI GIS and Quickbook to collect water usage and manage charges/payments; Won various awards across Texas counties and the 1st award ever for the company of 25k+ people.
                      </li>
                      <li className="n42-color fs-seven">
                        Designed the core server-side components for a groundwater management system used by 10 counties (population of 10 million+ people) across Texas; Developed the data storage infrastructure and RESTful APIs for UI dashboards, files/reports and business operations.
                      </li>
                      <li className="n42-color fs-seven">
                        Proposed, researched and implemented a website with C#, .NET Core, MVC, Web API, Vue.js and SQL Server for 10,000+ field technicians to track personnel movements and certain areas (such as hard to see oil wells) by simply dropping a marker on the map.
                      </li>
                      <li className="n42-color fs-seven">
                        Designed and developed a web application (C#, .NET, MVC, Bootstrap, JavaScript, SQL Server) for the 25k+ employees at Halff Associates to register and manage career-related services such as trainings, seminars and certificates.
                      </li>
                    </ul>
                  </div>
                  <div className="d-flex align-items-center gap-2 mb-5 mb-md-10">
                    <div className="title-line2"></div>
                    <h2 className="fs-three p1-color fw-semibold">Projects</h2>
                  </div>
                  <div className="mb-4 mb-md-6">
                    <div className="d-flex flex-wrap gap-1 gap-sm-3 justify-content-between align-items-center mb-2 mb-md-4">
                      <span className="n5-color fs-six fw-medium">
                        Gatesflix
                      </span>
                    </div>
                    <p className="n42-color fs-seven">
                      Developed a local streaming platform resembling Netflix, hosting 2000+ purchased movies, using C#, .NET, and MVC. Integrated IMDb for movie ratings and utilized Synology NAS with VLC for seamless video encoding and streaming, creating a personalized, high-quality entertainment experience.
                    </p>
                  </div>
                  <div className="mb-4 mb-md-6">
                    <div className="d-flex flex-wrap gap-1 gap-sm-3 justify-content-between align-items-center mb-2 mb-md-4">
                      <span className="n5-color fs-six fw-medium">
                        Mila Gates
                      </span>
                      
                      <span className="n42-color fs-eight">
                      <Link
                        href="https://milagates.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="d-flex gap-2 align-items-center n4-color"
                      >
                        <IoOpenOutline />
                        View
                      </Link>
                      </span>
                    </div>
                    <p className="n42-color fs-seven">
                      Mila Gates website celebrates my daughter milestones and growth through heartfelt blogs and narratives.
                      Designed with warmth and reflection, it connects everyday moments to larger themes of family and love.
                    </p>
                  </div>
                  <div>
                    <div className="d-flex flex-wrap gap-2 gap-sm-3 justify-content-between align-items-center mb-2 mb-md-4">
                      <span className="n5-color fs-six fw-medium">
                        Shiny Stacks
                      </span>
                      <Link
                        href="https://www.shinystacks.com/home"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="d-flex gap-2 align-items-center n4-color"
                      >
                        <IoOpenOutline />
                        View
                      </Link>
                    </div>
                    <p className="n4-color fs-seven">
                      A comprehensive US coin collection website showcasing a diverse range of Silver, Gold, and Copper coins.
                      Designed for collectors to explore and track their collection, it features detailed information, 
                      high-quality visuals, and categorization by material and rarity, offering an engaging platform for
                      enthusiasts to manage and appreciate their numismatic treasures.
                    </p>
                  </div>
                </div>

                {/* <!-- right side  --> */}
                <div className="col-md-4 col-lg-12 col-xl-4 col-xxl-3">
                  <div className="ps-4 ps-xxl-7 br-left-n3 mt-5 mt-md-0">
                    {/* <!-- education  --> */}
                    <div className="mb-8 mb-md-15">
                      <div className="d-flex align-items-center gap-2 mb-3 mb-md-6">
                        <div className="title-line2"></div>
                        <h2 className="fs-three p1-color fw-semibold">
                          Education
                        </h2>
                      </div>
                      <div className="d-flex gap-2 mb-3 mb-md-5">
                        <i className="fs-six p1-color">
                          <PiGraduationCap />
                        </i>
                        <div>
                          <span className="n4-color fs-seven">
                            BBA in Mangement Information System - Texas Tech University
                          </span>
                          <span className="n4-color fs-eleven">
                            2008 - 2011
                          </span>
                        </div>
                      </div>
                    </div>
                    {/* <!-- awards  --> */}
                    <AwardsSection />
                    {/* <!-- skills  --> */}
                    <div className="mb-8 mb-md-15">
                      <div className="d-flex align-items-center gap-2 mb-5 mb-md-10">
                        <div className="title-line2"></div>
                        <h2 className="fs-three p1-color fw-semibold">
                          Skills
                        </h2>
                      </div>

                      <div className="mb-3 mb-md-6">
                        <h5 className="fs-six n5-color fw-medium mb-2 mb-md-4">
                          Technical
                        </h5>
                        <ul className="d-flex flex-column gap-3 ms-6 ms-lg-10">
                          <li className="n4-color fs-seven">AWS</li>
                          <li className="n4-color fs-seven">
                            TypeScript/React/Vue
                          </li>
                          <li className="n4-color fs-seven">Node.js/.NET</li>
                          <li className="n4-color fs-seven">
                            PostgreSQL/MySQL
                          </li>
                          <li className="n4-color fs-seven">
                            Object-oriented design
                          </li>
                          <li className="n4-color fs-seven">
                            Design and implement database structures
                          </li>
                          <li className="n4-color fs-seven">
                            Lead and deliver complex software systems
                          </li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="fs-six n5-color fw-medium mb-2 mb-md-4">
                          Professional
                        </h5>
                        <ul className="d-flex flex-column gap-3 ms-6 ms-lg-10">
                          <li className="n4-color fs-seven">
                            Effective communication
                          </li>
                          <li className="n4-color fs-seven">Team player</li>
                          <li className="n4-color fs-seven">
                            Strong problem solver
                          </li>
                          <li className="n4-color fs-seven">
                            Good time management
                          </li>
                        </ul>
                      </div>
                    </div>
                    {/* <!-- Languages  --> */}
                    <div className="mb-8 mb-md-15">
                      <div className="d-flex align-items-center gap-2 mb-3 mb-md-6">
                        <div className="title-line2"></div>
                        <h2 className="fs-three p1-color fw-semibold">
                          Languages
                        </h2>
                      </div>
                      <ul className="d-flex flex-column gap-3 ms-6 ms-lg-10">
                        <li className="n4-color fs-seven">English(Native)</li>
                        <li className="n4-color fs-seven">
                          Russian (Intermediate)
                        </li>
                      </ul>
                    </div>
                    {/* <!-- Interests  --> */}
                    <div>
                      <div className="d-flex align-items-center gap-2 mb-3 mb-md-6">
                        <div className="title-line2"></div>
                        <h2 className="fs-three p1-color fw-semibold">
                          Interests
                        </h2>
                      </div>
                      <ul className="d-flex flex-column gap-3 ms-6 ms-lg-10">
                        <li className="n4-color fs-seven">Artifical Intelligence</li>
                        <li className="n4-color fs-seven">Brazilian Jiu-Jitsu</li>
                        <li className="n4-color fs-seven">Tesla Fanatic</li>
                        <li className="n4-color fs-seven">Travelling</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="d-flex flex-wrap gap-2 gap-md-3 gap-md-5 align-items-center justify-content-center mt-4 mt-md-8">
                <Link
                  href="https://github.com/stozo04"
                  className="d-flex gap-1 align-items-center resume-icon"
                >
                  <div className="social-icon">
                    <i className="p1-color">
                      <PiGithubLogo />
                    </i>
                  </div>
                  <span className="fs-eight n4-color">@stozo04</span>
                </Link>
                <Link
                  href="https://www.linkedin.com/in/gates-steven/"
                  className="d-flex gap-1 align-items-center resume-icon"
                >
                  <div className="social-icon">
                    <i className="p1-color">
                      <PiLinkedinLogo />
                    </i>
                  </div>
                  <span className="fs-eight n4-color">
                    @gates-steven

                  </span>
                </Link>
                <Link
                  href="https://x.com/sgates2011"
                  className="d-flex gap-1 align-items-center resume-icon"
                >
                  <div className="social-icon">
                    <i className="p1-color">
                      <PiXLogo />
                    </i>
                  </div>
                  <span className="fs-eight n4-color">@sgates2011</span>
                </Link>
              </div>
            </div>
          </FadeDown>
        </div>
      </section>
      <Footer />
      
    </div>
  );
};

export default Resume;
