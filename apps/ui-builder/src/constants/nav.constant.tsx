import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";

export const HEADER_NAV = [
  {
    title: "Wireframes",
    target: "_top",
    href: "/wireframe",
    icon: () => null,
  },
  {
    title: "Pages",
    target: "_top",
    href: "/page",
    icon: () => null,
  },
  {
    title: "Workflows",
    target: "_top",
    href: "/workflow",
    icon: () => null,
  },
  {
    title: "Storybook",
    target: "_blank",
    href: "https://ui-builder-docs.vercel.app/",
    icon: () => <ArrowTopRightOnSquareIcon className="h-4 w-4" />,
  },
];
