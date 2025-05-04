import { Link, useRouteError } from "react-router";

export default function ErrorPage() {
  const error = useRouteError();

  let title = "Error!";
  let message = "Bir hata oluştu. Tekrar deneyiniz...";

  switch (error.status) {
    case 404:
      title = "Not Found Error!";
      message = "Aradığınız kaynak bulunamadı..";
      break;
    case 500:
      title = "Server Error!";
      message = error.data;
      break;
  }

  return (
    <div id="error">
      <h1>{title}</h1>
      <p>{message}</p>
      <Link to="/">Home Page</Link>
    </div>
  );
}
