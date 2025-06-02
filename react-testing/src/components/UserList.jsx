import React from "react";

export default function UserList({ users }) {
  if (users.length === 0) {
    return (
      <>
        <p>We have not Users</p>
      </>
    );
  }
  return (
    <ul>
      {users.map((user) => (
        <li key={user.id}>
          <a href={`/users/${user.id}`}>{user.name}</a>
        </li>
      ))}
    </ul>
  );
}
