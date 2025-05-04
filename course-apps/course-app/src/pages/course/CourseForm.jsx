import { redirect, useActionData, useNavigation } from "react-router";
import { Form } from "react-router";
import { isRequiredCheck, isValidImage } from "../../utils/validation";

export default function CourseForm({ method, data }) {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const result = useActionData();

  return (
    <Form method={method}>
      <div>
        <label htmlFor="title">Title : </label>
        {result && result.title && (
          <span style={{ color: "red" }}>{result.title}</span>
        )}
        <input
          type="text"
          name="title"
          id="title"
          defaultValue={data ? data.title : ""}
        />
      </div>
      <div>
        <label htmlFor="image">Image : </label>
        {result && result.image && (
          <span style={{ color: "red" }}>{result.image}</span>
        )}
        <input
          type="text"
          name="image"
          id="image"
          defaultValue={data ? data.image : ""}
        />
      </div>
      <div>
        <label htmlFor="description">Description : </label>
        {result && result.description && (
          <span style={{ color: "red" }}>{result.description}</span>
        )}
        <textarea
          name="description"
          rows={5}
          defaultValue={data ? data.description : ""}
        ></textarea>
      </div>
      {result && result.errors && (
        <ul className="errors">
          {Object.values(result.errors).map((error) => (
            <li key={error}>{error}</li>
          ))}
        </ul>
      )}
      <button disabled={isSubmitting} type="submit">
        {isSubmitting ? "Kayıt Ediliyor..." : "Kaydet"}
      </button>
    </Form>
  );
}

export async function courseAction({ request, params }) {
  const data = await request.formData();
  const method = request.method;

  let url = "http://localhost:5000/courses";

  if (method === "PUT") {
    const courseId = params.courseid;
    url += `/${courseId}`;
  }

  const formData = {
    title: data.get("title"),
    image: data.get("image"),
    description: data.get("description"),
  };

  const errors = {};

  if (!isRequiredCheck(formData.title)) {
    errors.title = "Title alanı zorunludur!";
  }

  if (!isRequiredCheck(formData.description)) {
    errors.description = "Description alanı zorunludur!";
  }

  if (!isValidImage(formData.image)) {
    errors.image =
      "Image alanı zorunludur ve lütfen kabul edilebilir bir görsel uzantısı giriniz!";
  }

  if (Object.keys(errors).length) {
    console.log(errors);
    return errors;
  }

  const response = await fetch(url, {
    method: method,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  });

  if (response.status === 403) {
    return response;
  }

  if (response.ok) {
    return redirect("/courses");
  }
}
