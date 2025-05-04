import CourseForm from "./CourseForm";

export default function CourseCreatePage() {
  return (
    <>
      <h1 className="course-title">Course Create</h1>
      <CourseForm method="POST" />
    </>
  );
}
