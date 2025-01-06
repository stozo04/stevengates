import { AiOutlineDashboard } from "react-icons/ai";
import {
  PiCodeBlock,
  PiCodeBlockFill,
  PiEnvelope,
  PiEnvelopeFill,
  PiNewspaperClipping,
  PiNewspaperClippingFill,
  PiNotebook,
  PiNotebookFill,
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
    name: "Blog",
    url: "/blog",
    icon: <PiNewspaperClipping />,
  },
  {
    id: 5,
    name: "Contact",
    url: "/contact",
    icon: <PiEnvelope />,
  },
  {
    id: 6,
    name: "Dashboard",
    url: "/dashboard",
    icon: <AiOutlineDashboard />,
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
    url: "/dashboard",
    icon: <AiOutlineDashboard />,
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
