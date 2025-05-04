import { Link } from "react-router";

export default function NotFoundPage() {
  return (
    <div id="error">
      <h1>Not Found</h1>
      <p>Kaynak bulunamadı!</p>
      <Link to="/">Home Page</Link>
    </div>
  );
}
