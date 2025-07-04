import Counter from "@/components/counter";

export default async function Page() {
  const response = await fetch("https://jsonplaceholder.typicode.com/users");
  const data = await response.json();
  return (
    <div>
      <h1>Users</h1>
      <ul>
        {data.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
      <Counter />
    </div>
  );
}
