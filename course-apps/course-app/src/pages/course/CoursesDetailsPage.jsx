import { useRouteLoaderData } from "react-router";

export default function CoursesDetailsPage() {
  const course = useRouteLoaderData("course-details");
  return (
    <>
      <div className="course-details">
        <h1 className="course-title">{course.title}</h1>
        <div className="course-description">
          <img src={`http://localhost:5000/images/${course.image}`} />
          <div>
            <div>{course.description}</div>
            <div className="icons">
              <span>
                <i className="fa-regular fa-user"> {course.users}</i>
              </span>
              <span>
                <i className="fa-regular fa-thumbs-up"> {course.likes}</i>
              </span>
              <span>
                <i className="fa-regular fa-comment"> {course.comments}</i>
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export async function courseDetailLoader({ params }) {
  const { courseid } = params;
  const response = await fetch(`http://localhost:5000/courses/${courseid}`);

  if (!response.ok) {
    throw new Response("Kurs bulunamadı!", { status: 404 });
  }

  return response.json();
}
