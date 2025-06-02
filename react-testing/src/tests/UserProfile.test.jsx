import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import "@testing-library/jest-dom/vitest";
import UserProfile from "../components/UserProfile";

describe("UserProfile", () => {
  beforeEach(() => {
    global.fetch = vi.fn();
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  it("fecth data end display the user data", async () => {
    global.fetch.mockResolvedValueOnce({
      json: async () => ({
        id: 5,
        name: "Ekrem",
        email: "ekremgungordev@gmail.com",
      }),
    });

    render(<UserProfile userId={5} />);

    expect(screen.getByText(/Loading/i)).toBeInTheDocument();

    await waitFor(() => {
      expect(
        screen.getByRole("heading", { name: /ekrem/i })
      ).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getByText(/ekremgungordev@gmail.com/i)).toBeInTheDocument();
    });
  });
});
