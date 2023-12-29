import React, { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import PrivateRoute from "./privateRoute";
import PrivateLayout from "../layouts/privateLayout";
import AdminRoute from "./adminRoute";
import AdminLayout from "../layouts/adminLayout";

const LazyLogin = lazy(() => import("../pages/public/login"));
const LazySignup = lazy(() => import("../pages/public/signup"));
const LazyNotFound = lazy(() => import("../pages/public/not-found"));
const LazyHome = lazy(() => import("../pages/private/home"));
const LazyIntro = lazy(() => import("../pages/private/intro"));
const LazyJsx = lazy(() => import("../pages/private/jsx"));
const LazyEs6 = lazy(() => import("../pages/private/es6"));
const LazyComponents = lazy(() => import("../pages/private/components"));
const LazyFunction = lazy(() => import("../pages/private/components/function"));
const LazyClass = lazy(() => import("../pages/private/components/class"));
const LazyInterviewReact = lazy(() =>
  import("../pages/private/interviewReact")
);
const LazyInterviewJavascript = lazy(() =>
  import("../pages/private/interviewJavascript")
);
const LazyInterviewCss = lazy(() => import("../pages/private/interviewCss"));
const LazyInterviewHtml = lazy(() => import("../pages/private/interviewHtml"));

const LazyDashboard = lazy(() => import("../pages/admin/dashboard"));
const LazyInterviewJavascriptTable = lazy(() =>
  import("../pages/admin/interview/javascript")
);
const LazyInterviewReactTable = lazy(() =>
  import("../pages/admin/interview/react")
);
const LazyInterviewCssTable = lazy(() =>
  import("../pages/admin/interview/css")
);
const LazyInterviewHtmlTable = lazy(() =>
  import("../pages/admin/interview/html")
);
const LazyInterviewTypescriptTable = lazy(() =>
  import("../pages/admin/interview/typescript")
);
const LazyInterviewNextjsTable = lazy(() =>
  import("../pages/admin/interview/nextjs")
);

export const router = createBrowserRouter([
  {
    path: "/",
    element: <LazyLogin />,
  },
  {
    path: "/signup",
    element: <LazySignup />,
  },
  {
    path: "*",
    element: <LazyNotFound />,
  },
  {
    element: (
      <PrivateRoute>
        <PrivateLayout />
      </PrivateRoute>
    ),
    children: [
      { element: <LazyHome />, path: "/home" },
      { element: <LazyIntro />, path: "/intro" },
      { element: <LazyEs6 />, path: "/es6" },
      { element: <LazyJsx />, path: "/jsx" },
      { element: <LazyComponents />, path: "/components" },
      { element: <LazyFunction />, path: "/function-component" },
      { element: <LazyClass />, path: "/class-component" },
      { element: <LazyInterviewReact />, path: "/interview-react" },
      { element: <LazyInterviewJavascript />, path: "/interview-javascript" },
      { element: <LazyInterviewCss />, path: "/interview-css" },
      { element: <LazyInterviewHtml />, path: "/interview-html" },
    ],
  },

  {
    element: (
      <AdminRoute>
        <AdminLayout />
      </AdminRoute>
    ),
    children: [
      { element: <LazyDashboard />, path: "/dashboard" },
      {
        element: <LazyInterviewJavascriptTable />,
        path: "/interview-javascript-table",
      },
      { element: <LazyInterviewReactTable />, path: "/interview-react-table" },
      { element: <LazyInterviewCssTable />, path: "/interview-css-table" },
      { element: <LazyInterviewHtmlTable />, path: "/interview-html-table" },
      {
        element: <LazyInterviewTypescriptTable />,
        path: "/interview-typescript-table",
      },
      {
        element: <LazyInterviewNextjsTable />,
        path: "/interview-nextjs-table",
      },
    ],
  },
]);
