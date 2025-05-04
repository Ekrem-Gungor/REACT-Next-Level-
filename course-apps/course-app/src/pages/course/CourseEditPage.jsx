import { useRouteLoaderData } from "react-router";
import CourseForm from "./CourseForm";

export default function CourseEditPage() {
  const course = useRouteLoaderData("course-details");

  return (
    <>
      <h1 className="course-title">Course Edit</h1>
      <CourseForm method="PUT" data={course} />
    </>
  );
}
