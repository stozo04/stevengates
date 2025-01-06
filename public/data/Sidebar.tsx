import {
  PiBriefcase,
  PiBriefcaseFill,
  PiCodeBlock,
  PiCodeBlockFill,
  PiEnvelope,
  PiEnvelopeFill,
  PiNewspaperClipping,
  PiNewspaperClippingFill,
  PiNotebook,
  PiNotebookFill,
  PiShoppingBag,
  PiShoppingBagFill,
  PiUser,
  PiUserFill,
} from "react-icons/pi";

export const sidebarsData = [
  {
    id: 1,
    name: "About",
    url: "/",
    icon: <PiUser />,
  },
  {
    id: 2,
    name: "Portfolio",
    url: "/portfolio",
    icon: <PiCodeBlock />,
    numbers: 2,
  },
  {
    id: 3,
    name: "Resume",
    url: "/resume",
    icon: <PiNotebook />,
  },
  {
    id: 4,
    name: "Dashboard",
    url: "/products",
    icon: <PiShoppingBag />,
  },
  {
    id: 5,
    name: "Blog",
    url: "/blog",
    icon: <PiNewspaperClipping />,
  },
  {
    id: 6,
    name: "Contact",
    url: "/contact",
    icon: <PiEnvelope />,
  },
];
export const bottomNavData = [
  {
    id: 1,
    name: "About",
    url: "/",
    icon: <PiUserFill />,
  },
  {
    id: 2,
    name: "Portfolio",
    url: "/portfolio",
    icon: <PiCodeBlockFill />,
    numbers: 2,
  },
  {
    id: 3,
    name: "Resume",
    url: "/resume",
    icon: <PiNotebookFill />,
  },
  {
    id: 4,
    name: "Dashboard",
    url: "/products",
    icon: <PiShoppingBagFill />,
  },
  {
    id: 5,
    name: "Blog",
    url: "/blog",
    icon: <PiNewspaperClippingFill />,
  },
  {
    id: 6,
    name: "Contact",
    url: "/contact",
    icon: <PiEnvelopeFill />,
  },
];
