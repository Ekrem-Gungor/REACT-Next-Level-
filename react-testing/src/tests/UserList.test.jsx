import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import UserList from "../components/UserList";
import "@testing-library/jest-dom/vitest";

describe("UserList", () => {
  it("Users olmadığı zaman ekrana We have not Users yazmalı", () => {
    render(<UserList users={[]} />);

    // const result = screen.getByText("We have not Users");
    const result = screen.getByText(/have not Users/i);
    expect(result).toBeInTheDocument();
  });

  it("User Listesinin render edilmesi", () => {
    const users = [
      {
        id: 1,
        name: "ekrem",
      },
      {
        id: 2,
        name: "canberk",
      },
      {
        id: 3,
        name: "senem",
      },
    ];

    render(<UserList users={users} />);
    users.forEach((user) => {
      const link = screen.getByRole("link", { name: user.name });

      expect(link).toBeInTheDocument();

      expect(link).toHaveAttribute("href", `/users/${user.id}`);
    });
  });
});
