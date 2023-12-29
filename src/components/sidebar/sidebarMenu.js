import { Home, Grid, Layers, ChevronDown } from "react-feather";

const Menu = [
  {
    url: "/home",
    icon: <Home size={20} />,
    navName: "Home",
    dropdown: false,
  },
  {
    url: "/intro",
    icon: <Grid size={20} />,
    navName: "Introduction",
    dropdown: false,
  },
  {
    url: "/es6",
    icon: <Grid size={20} />,
    navName: "ES6",
    dropdown: false,
  },
  {
    url: "/jsx",
    icon: <Grid size={20} />,
    navName: "JSX",
    dropdown: false,
  },

  {
    icon: <Grid size={20} />,
    navName: "Components",
    dropdown: false,
    dropIcon: <ChevronDown size={22} />,
    children: [
      {
        url: "/function-component",
        icon: <Layers size={18} />,
        navName: "Function",
      },
      {
        url: "class-component",
        icon: <Layers size={18} />,
        navName: "Class",
      },
    ],
  },
  {
    icon: <Grid size={20} />,
    navName: "Interview",
    dropdown: false,
    dropIcon: <ChevronDown size={22} />,
    children: [
      {
        url: "interview-html",
        icon: <Layers size={18} />,
        navName: "HTML",
      },
      {
        url: "interview-css",
        icon: <Layers size={18} />,
        navName: "CSS",
      },
      {
        url: "/interview-javascript",
        icon: <Layers size={18} />,
        navName: "Javascript",
      },
      {
        url: "interview-react",
        icon: <Layers size={18} />,
        navName: "React",
      },
    ],
  },
];

export default Menu;
