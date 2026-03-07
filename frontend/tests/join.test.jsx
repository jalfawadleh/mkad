import { beforeEach, describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";

const mockNavigate = vi.fn();
const mockPost = vi.fn();

vi.mock("axios", () => ({
  default: { post: (...args) => mockPost(...args) },
}));

vi.mock("react-toastify", () => ({
  toast: vi.fn(),
}));

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

import Join from "../src/components/Join.jsx";

const renderJoin = () =>
  render(
    <MemoryRouter initialEntries={["/join/invite-token"]}>
      <Routes>
        <Route path='/join/:c' element={<Join />} />
      </Routes>
    </MemoryRouter>,
  );

describe("Join component", () => {
  beforeEach(() => {
    mockNavigate.mockReset();
    mockPost.mockReset();
  });

  it("uses password inputs for password fields", () => {
    renderJoin();

    const passwordInput = screen.getByLabelText("Password Min 8 char");
    const confirmPasswordInput = screen.getByLabelText("Retype Password");

    expect(passwordInput).toHaveAttribute("type", "password");
    expect(confirmPasswordInput).toHaveAttribute("type", "password");
  });

  it("submits registration and navigates to home on success", async () => {
    mockPost.mockResolvedValue({ data: true });
    renderJoin();

    fireEvent.change(screen.getByLabelText("Username Min 8 char"), {
      target: { value: "validuser" },
    });
    fireEvent.change(screen.getByLabelText("Password Min 8 char"), {
      target: { value: "password123" },
    });
    fireEvent.change(screen.getByLabelText("Retype Password"), {
      target: { value: "password123" },
    });
    fireEvent.change(screen.getByLabelText("Name Min 4 char"), {
      target: { value: "Valid Name" },
    });
    fireEvent.click(screen.getByLabelText("accept terms and conditions"));

    fireEvent.click(screen.getByRole("button", { name: "Join" }));

    await waitFor(() => {
      expect(mockPost).toHaveBeenCalledWith(
        "/users/",
        expect.objectContaining({
          username: "validuser",
          password: "password123",
          confirmPassword: "password123",
          code: "invite-token",
        }),
      );
      expect(mockNavigate).toHaveBeenCalledWith("/");
    });
  });
});
