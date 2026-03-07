import { beforeEach, describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import { UserContext } from "../src/store.js";

const mockPut = vi.fn();
const mockDelete = vi.fn();
const mockToastError = vi.fn();
const mockToast = vi.fn();

vi.mock("axios", () => ({
  default: {
    put: (...args) => mockPut(...args),
    delete: (...args) => mockDelete(...args),
  },
}));

vi.mock("react-toastify", () => ({
  toast: Object.assign((...args) => mockToast(...args), {
    error: (...args) => mockToastError(...args),
  }),
}));

import Account from "../src/components/Account.jsx";

const renderAccount = () => {
  const setUser = vi.fn();
  render(
    <UserContext.Provider value={{ user: { _id: "u1", token: "t1" }, setUser }}>
      <MemoryRouter>
        <Account />
      </MemoryRouter>
    </UserContext.Provider>,
  );
  return { setUser };
};

describe("Account", () => {
  beforeEach(() => {
    mockPut.mockReset();
    mockDelete.mockReset();
    mockToast.mockReset();
    mockToastError.mockReset();
  });

  it("blocks update when passwords do not match", () => {
    renderAccount();

    fireEvent.change(screen.getByLabelText("Password"), {
      target: { value: "password123" },
    });
    fireEvent.change(screen.getByLabelText("Confirm Password"), {
      target: { value: "different123" },
    });
    fireEvent.change(screen.getByLabelText("Current Password"), {
      target: { value: "currentpass" },
    });

    fireEvent.click(screen.getByText("Update"));

    expect(mockPut).not.toHaveBeenCalled();
    expect(mockToastError).toHaveBeenCalledWith("Passwords do not match");
  });

  it("sends update payload when inputs are valid", async () => {
    mockPut.mockResolvedValue({ data: true });
    renderAccount();

    fireEvent.change(screen.getByLabelText("Username"), {
      target: { value: "newusername" },
    });
    fireEvent.change(screen.getByLabelText("Password"), {
      target: { value: "password123" },
    });
    fireEvent.change(screen.getByLabelText("Confirm Password"), {
      target: { value: "password123" },
    });
    fireEvent.change(screen.getByLabelText("Current Password"), {
      target: { value: "currentpass" },
    });

    fireEvent.click(screen.getByText("Update"));

    await waitFor(() => {
      expect(mockPut).toHaveBeenCalledWith(
        "/users/",
        expect.objectContaining({
          _id: "u1",
          username: "newusername",
          password: "password123",
          confirmPassword: "password123",
          currentPassword: "currentpass",
        }),
      );
    });
  });
});
