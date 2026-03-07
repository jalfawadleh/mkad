import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";

import ScreenResetPassword from "../src/screens/ScreenResetPassword.jsx";

describe("ScreenResetPassword", () => {
  it("renders invalid message when token is missing", () => {
    render(
      <MemoryRouter initialEntries={["/resetpassword"]}>
        <Routes>
          <Route path='/resetpassword' element={<ScreenResetPassword />} />
        </Routes>
      </MemoryRouter>,
    );

    expect(screen.getByText(/invalid or missing token/i)).toBeInTheDocument();
  });

  it("renders token-received text when token param exists", () => {
    render(
      <MemoryRouter initialEntries={["/resetpassword/abc123"]}>
        <Routes>
          <Route path='/resetpassword/:c' element={<ScreenResetPassword />} />
        </Routes>
      </MemoryRouter>,
    );

    expect(screen.getByText(/reset token was received/i)).toBeInTheDocument();
  });
});
