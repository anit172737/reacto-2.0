import { Home, Grid, Layers, ChevronDown } from "react-feather";

const Menu = [
  {
    url: "/dashboard",
    icon: <Home size={20} />,
    navName: "Dashboard",
    dropdown: false,
  },
  //   {
  //     url: "/intro",
  //     icon: <Grid size={20} />,
  //     navName: "Introduction",
  //     dropdown: false,
  //   },
  //   {
  //     url: "/es6",
  //     icon: <Grid size={20} />,
  //     navName: "ES6",
  //     dropdown: false,
  //   },
  //   {
  //     url: "/jsx",
  //     icon: <Grid size={20} />,
  //     navName: "JSX",
  //     dropdown: false,
  //   },

  //   {
  //     icon: <Grid size={20} />,
  //     navName: "Components",
  //     dropdown: false,
  //     dropIcon: <ChevronDown size={22} />,
  //     children: [
  //       {
  //         url: "/function-component",
  //         icon: <Layers size={18} />,
  //         navName: "Function",
  //       },
  //       {
  //         url: "class-component",
  //         icon: <Layers size={18} />,
  //         navName: "Class",
  //       },
  //     ],
  //   },
  {
    icon: <Grid size={20} />,
    navName: "Interview",
    dropdown: false,
    dropIcon: <ChevronDown size={22} />,
    children: [
      {
        url: "interview-html-table",
        icon: <Layers size={18} />,
        navName: "HTML",
      },
      {
        url: "interview-css-table",
        icon: <Layers size={18} />,
        navName: "CSS",
      },
      {
        url: "/interview-javascript-table",
        icon: <Layers size={18} />,
        navName: "Javascript",
      },
      {
        url: "interview-react-table",
        icon: <Layers size={18} />,
        navName: "React",
      },
      {
        url: "interview-typescript-table",
        icon: <Layers size={18} />,
        navName: "Typescript",
      },
      {
        url: "interview-nextjs-table",
        icon: <Layers size={18} />,
        navName: "NextJs",
      },
    ],
  },
];

export default Menu;
