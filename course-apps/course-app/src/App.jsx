import { createBrowserRouter, RouterProvider } from "react-router";
import HomePage from "./pages/Home";
import AboutPage from "./pages/About";
import CoursesPage, {
  courseDeleteAction,
  coursesLoader,
} from "./pages/course/CoursesPage";
import MainLayout from "./layouts/MainLayout";
import HelpLayout from "./layouts/HelpLayout";
import Contact from "./pages/help/Contact";
import FaqPage from "./pages/help/FaqPage";
import CoursesDetailsPage, {
  courseDetailLoader,
} from "./pages/course/CoursesDetailsPage";
import CourseLayout from "./layouts/CourseLayout";
import CourseCreatePage from "./pages/course/CourseCreatePage";
import CourseEditPage from "./pages/course/CourseEditpage";
import { courseAction } from "./pages/course/CourseForm";
import NotFoundPage from "./pages/error/NotFoundPage";
import ErrorPage from "./pages/error/ErrorPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "home",
        element: <HomePage />,
      },
      {
        path: "about",
        element: <AboutPage />,
      },
      {
        path: "courses",
        element: <CourseLayout />,
        errorElement: <ErrorPage />,
        children: [
          {
            index: true,
            element: <CoursesPage />,
            loader: coursesLoader,
          },
          {
            id: "course-details",
            path: ":courseid",
            loader: courseDetailLoader,
            children: [
              {
                index: true,
                element: <CoursesDetailsPage />,
              },
              {
                path: "edit",
                element: <CourseEditPage />,
                action: courseAction,
              },
              {
                path: "delete",
                action: courseDeleteAction,
              },
            ],
          },
          {
            path: "create",
            element: <CourseCreatePage />,
            action: courseAction,
          },
        ],
      },
      {
        path: "help",
        element: <HelpLayout />,
        children: [
          { path: "contact", element: <Contact /> },
          { path: "faq", element: <FaqPage /> },
        ],
      },
      {
        path: "*",
        element: <NotFoundPage />,
      },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
