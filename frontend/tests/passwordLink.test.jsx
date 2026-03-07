import { beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";

const mockGet = vi.fn();

vi.mock("axios", () => ({
  default: { get: (...args) => mockGet(...args) },
}));

vi.mock("qrcode.react", () => ({
  QRCodeSVG: ({ value }) => <div data-testid='qr-code'>{value}</div>,
}));

vi.mock("react-toastify", () => ({
  toast: { error: vi.fn() },
}));

import PasswordLink from "../src/components/PasswordLink.jsx";

const renderPasswordLink = (path = "/invites/passwordlink/abc123") =>
  render(
    <MemoryRouter initialEntries={[path]}>
      <Routes>
        <Route path='/invites/passwordlink/:id' element={<PasswordLink />} />
      </Routes>
    </MemoryRouter>,
  );

describe("PasswordLink", () => {
  beforeEach(() => {
    mockGet.mockReset();
  });

  it("requests password token and renders QR data when backend returns link code", async () => {
    mockGet.mockResolvedValue({ data: "token-code" });
    renderPasswordLink();

    await waitFor(() => {
      expect(mockGet).toHaveBeenCalledWith("/invites/passwordlink/abc123");
      expect(screen.getByText("Copy")).toBeInTheDocument();
      expect(screen.getByTestId("qr-code")).toHaveTextContent(
        "https://mkadifference.com/resetpassword/token-code",
      );
    });
  });

  it("shows fallback message when backend returns empty value", async () => {
    mockGet.mockResolvedValue({ data: "" });
    renderPasswordLink();

    await waitFor(() => {
      expect(
        screen.getByText("Something is wrong Please try again later."),
      ).toBeInTheDocument();
    });
  });
});
