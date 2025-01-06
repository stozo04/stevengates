import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { PiArrowUpRightBold } from "react-icons/pi";

const ProductCard = ({
  img,
  title,
  des,
  price,
}: {
  img: StaticImageData;
  title: string;
  des: string;
  price: string;
}) => {
  return (
    <div className="col-sm-6 col-xxl-4">
      <div className="product-card">
        <Link href="/products_details" className="thumb d-block">
          <div className="post-thumb">
            <div className="post-thumb-inner">
              <Image src={img} alt="..." className="product-img w-100 p-2" />
            </div>
          </div>
          <div className="post-thumb">
            <div className="post-thumb-inner">
              <Image src={img} alt="..." className="product-img w-100 p-2" />
            </div>
          </div>
        </Link>
        <div className="px-2">
          <Link
            href="/products_details"
            className="project-title fs-six fw-semibold n5-color mt-3 mt-md-5 mb-2 d-block"
          >
            {title}
          </Link>
          <p className="fs-six n3-color">{des}</p>

          <span className="n5-color fs-seven fw-medium mt-2 mt-md-3">
            Price: ${price} USD
          </span>
          <div className="d-flex gap-3 gap-md-4 align-items-center mt-3 mt-md-5">
            <button
              type="button"
              className="p-btn bg1-color px-3 py-2 rounded n11-color"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
            >
              Add to Cart
            </button>
            <Link
              href="/products_details"
              className="project-link d-flex align-items-center justify-content-center flex-shrink-0"
            >
              <i className="n5-color">
                <PiArrowUpRightBold />
              </i>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
