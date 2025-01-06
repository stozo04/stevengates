"use client";
import Image, { StaticImageData } from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper/modules";
import { testimonials } from "../../../../public/data/AllData";
import FadeDown from "@/components/motionEffect/FadeDown";

const Testimonials = () => {
  return (
    <section className="pt-120 pb-120 br-bottom-n3">
      <div className="container">
        <FadeDown>
          <div className="section-heading">
            <div className="d-flex align-items-center gap-2">
              <div className="title-line"></div>
              <h2 className="display-four n5-color fw-semibold">
                Testimonials
              </h2>
            </div>
            <p className="fs-seven n4-color mt-2 mt-md-4">
              See how I&apos;ve helped our clients succeed. IT’s a highly
              Customizable,creative, modern, visually stunning and Bootstrap5
              HTML5 Template.
            </p>
          </div>
        </FadeDown>
        <div className="mt-8 mt-md-15 overflow-x-hidden">
          <Swiper
            spaceBetween={30}
            speed={2500}
            loop={true}
            pagination={{
              el: ".swiper-pagination",
              type: "bullets",
              bulletClass: "swiper-custom-bullet",
              bulletActiveClass: "swiper-custom-bullet-active",
              clickable: true,
            }}
            autoplay={{
              delay: 2500,
            }}
            breakpoints={{
              320: {
                slidesPerView: 1,
              },
              768: {
                slidesPerView: 2,
              },
              1400: {
                slidesPerView: 3,
              },
              1600: {
                slidesPerView: 4,
              },
            }}
            modules={[Pagination, Autoplay]}
          >
            {testimonials.map(
              ({
                id,
                img,
                name,
                des,
                country
              }: {
                id: number;
                img: StaticImageData;
                name: string;
                des: string;
                country: string;
              }) => (
                <SwiperSlide key={id}>
                  <div className="px-3 px-md-6 py-5 py-md-10 bgn2-color box-shadow1 br-left-p1">
                    <div className="d-flex gap-1 mb-2 mb-md-3">
                      <i className="ph-fill ph-star y1-color fs-six"></i>
                      <i className="ph-fill ph-star y1-color fs-six"></i>
                      <i className="ph-fill ph-star y1-color fs-six"></i>
                      <i className="ph-fill ph-star y1-color fs-six"></i>
                      <i className="ph-fill ph-star y1-color fs-six"></i>
                    </div>
                    <p className="n4-color fs-six">{des}</p>
                    <div className="d-flex gap-3 align-items-center mt-4 mt-md-7">
                      <Image
                        src={img}
                        alt="testimonial"
                        className="testimonial_img"
                      />

                      <div>
                        <span className="fs-eight d-block n5-color">
                          {name}
                        </span>
                        <span className="fs-nine d-block n5-color">
                          {country}
                        </span>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              )
            )}
            <div className="relative mt-15">
              <div className="swiper-pagination d-flex allign-items-center justify-content-center gap-2"></div>
            </div>
            <div className="relative mt-15">
              <div className="swiper-pagination d-flex allign-items-center justify-content-center gap-2"></div>
            </div>
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
