import { Link, redirect, useLoaderData, useSubmit } from "react-router";

export default function CoursesPage() {
  const courses = useLoaderData();
  const submit = useSubmit();

  function handleDelete(id) {
    const confirm = window.confirm(id + "'li kurs siliniyor. Emin misin?");
    if (confirm) {
      submit(null, {
        method: "DELETE",
        action: `/courses/${id}/delete`,
      });
    }
  }
  return (
    <>
      <div id="courses">
        <h1 className="course-list">Courses</h1>
        <Link to={"create"} className="new-course-link">
          New Course
        </Link>
        {courses.map((item) => (
          <div key={item.id} className="card">
            <img
              src={`http://localhost:5000/images/${item.image}`}
              alt={item.title}
            />
            <div className="card-content">
              <h4>{item.title}</h4>
              <p>{item.description}</p>
              <Link to={"/courses/" + item.id} className="detail-link">
                Detay
              </Link>
              <Link to={item.id + "/edit"} className="edit-link">
                Edit
              </Link>
              <button
                onClick={() => handleDelete(item.id)}
                className="delete-button"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export async function coursesLoader() {
  const response = await fetch("http://localhost:5000/courses");

  if (!response.ok) {
    throw new Response("Kurs listesi yüklenemedi!", { status: 500 });
  }

  return response.json();
}

export async function courseDeleteAction({ params, request }) {
  const { courseid } = params;
  const response = await fetch(`http://localhost:5000/courses/${courseid}`, {
    method: request.method,
  });

  if (response.ok) {
    return redirect("/courses");
  }
}
