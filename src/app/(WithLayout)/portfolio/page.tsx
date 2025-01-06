"use client";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import { Fragment } from "react";
import clsx from "clsx";
import { PiPaperPlaneTilt } from "react-icons/pi";
import { featureds } from "../../../../public/data/AllData";
import FeaturedCard from "@/components/Pages/About/Featured/FeaturedCard";
import Footer from "@/components/Shared/Footer/Footer";
import Link from "next/link";
import FadeDown from "@/components/motionEffect/FadeDown";

const Portfolio = () => {
  return (
    <div>
      <section className="pt-120 pb-120 mt-10 mt-lg-0">
        <FadeDown>
          <div className="pb-60 br-bottom-n3">
            <div className="page-heading">
              <h3 className="page-title n5-color fs-onefw-semibold n5-color mb-2 mb-md-3 text-center">
                A collection of my best projects
              </h3>
              <p className="fs-seven n5-color mb-4 mb-md-8 text-center">
                With many years in web development, I acquired extensive
                experience working on projects across multiple industries and
                technologies. Let me show you my best creations.
              </p>
              <Link
                href="/contact"
                className="w-max p-btn bg1-color fw-medium n11-color px-3 px-md-6 py-2 py-md-4 rounded-pill d-flex align-items-center gap-2 mx-auto"
              >
                <PiPaperPlaneTilt /> COMING SOON
              </Link>
            </div>
          </div>
        </FadeDown>
        {/* <div className="container mt-8 mt-md-15">
          <FadeDown>
            <TabGroup>
              <TabList className="d-flex flex-wrap gap-4 gap-sm-5 gap-md-7 align-items-center justify-content-center">
                <Tab as={Fragment}>
                  {({ hover, selected }) => (
                    <button
                      className={clsx(
                        hover && "p1-color",
                        selected && "tab-active",
                        "fs-seven  fw-medium n3-color"
                      )}
                    >
                      All
                    </button>
                  )}
                </Tab>
                <Tab as={Fragment}>
                  {({ hover, selected }) => (
                    <button
                      className={clsx(
                        hover && "p1-color",
                        selected && "tab-active",
                        "fs-seven  fw-medium n3-color"
                      )}
                    >
                      Web App
                    </button>
                  )}
                </Tab>
                <Tab as={Fragment}>
                  {({ hover, selected }) => (
                    <button
                      className={clsx(
                        hover && "p1-color",
                        selected && "tab-active",
                        "fs-seven  fw-medium n3-color"
                      )}
                    >
                      Mobile App
                    </button>
                  )}
                </Tab>
                <Tab as={Fragment}>
                  {({ hover, selected }) => (
                    <button
                      className={clsx(
                        hover && "p1-color",
                        selected && "tab-active",
                        "fs-seven  fw-medium n3-color"
                      )}
                    >
                      Frontend
                    </button>
                  )}
                </Tab>
                <Tab as={Fragment}>
                  {({ hover, selected }) => (
                    <button
                      className={clsx(
                        hover && "p1-color",
                        selected && "tab-active",
                        "fs-seven  fw-medium n3-color"
                      )}
                    >
                      Backend
                    </button>
                  )}
                </Tab>
              </TabList>
              <TabPanels className="mt-5 mt-md-10">
                <TabPanel>
                  <div className="row g-5 g-md-10 mt-8 mt-md-15">
                    {featureds.map(({ id, img, tag1, tag2, tag3, title }) => (
                      <FeaturedCard
                        key={id}
                        img={img}
                        tag1={tag1}
                        tag2={tag2}
                        tag3={tag3}
                        title={title}
                      />
                    ))}
                  </div>
                </TabPanel>
                <TabPanel>
                  <div className="row g-5 g-md-10 mt-8 mt-md-15">
                    {featureds
                      .slice(2, 6)
                      .map(({ id, img, tag1, tag2, tag3, title }) => (
                        <FeaturedCard
                          key={id}
                          img={img}
                          tag1={tag1}
                          tag2={tag2}
                          tag3={tag3}
                          title={title}
                        />
                      ))}
                  </div>
                </TabPanel>
                <TabPanel>
                  <div className="row g-5 g-md-10 mt-8 mt-md-15">
                    {featureds
                      .slice(1, 5)
                      .map(({ id, img, tag1, tag2, tag3, title }) => (
                        <FeaturedCard
                          key={id}
                          img={img}
                          tag1={tag1}
                          tag2={tag2}
                          tag3={tag3}
                          title={title}
                        />
                      ))}
                  </div>
                </TabPanel>
                <TabPanel>
                  <div className="row g-5 g-md-10 mt-8 mt-md-15">
                    {featureds
                      .slice(3, 7)
                      .map(({ id, img, tag1, tag2, tag3, title }) => (
                        <FeaturedCard
                          key={id}
                          img={img}
                          tag1={tag1}
                          tag2={tag2}
                          tag3={tag3}
                          title={title}
                        />
                      ))}
                  </div>
                </TabPanel>
                <TabPanel>
                  <div className="row g-5 g-md-10 mt-8 mt-md-15">
                    {featureds
                      .slice(3, 6)
                      .map(({ id, img, tag1, tag2, tag3, title }) => (
                        <FeaturedCard
                          key={id}
                          img={img}
                          tag1={tag1}
                          tag2={tag2}
                          tag3={tag3}
                          title={title}
                        />
                      ))}
                  </div>
                </TabPanel>
              </TabPanels>
            </TabGroup>
          </FadeDown>
        </div> */}
      </section>
      <Footer />
    </div>
  );
};

export default Portfolio;
