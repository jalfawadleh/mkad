import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";

import { UserContext } from "../src/store.js";

vi.mock("../src/components/common/Map.jsx", () => ({
  default: ({ children }) => <div data-testid='map-shell'>{children}</div>,
}));

vi.mock("../src/screens/ScreenLogin.jsx", () => ({
  default: () => <div data-testid='screen-login'>Login Screen</div>,
}));

import RoutePrivate from "../src/components/routes/RoutePrivate.jsx";

const renderRoute = (user, initialPath = "/protected") =>
  render(
    <UserContext.Provider value={{ user }}>
      <MemoryRouter initialEntries={[initialPath]}>
        <Routes>
          <Route element={<RoutePrivate />}>
            <Route path='/protected' element={<div>Protected Content</div>} />
          </Route>
        </Routes>
      </MemoryRouter>
    </UserContext.Provider>,
  );

describe("RoutePrivate", () => {
  it("renders protected content inside map shell when token exists", () => {
    renderRoute({ token: "abc" });

    expect(screen.getByTestId("map-shell")).toBeInTheDocument();
    expect(screen.getByText("Protected Content")).toBeInTheDocument();
  });

  it("renders login screen when token is missing", () => {
    renderRoute({});

    expect(screen.getByTestId("screen-login")).toBeInTheDocument();
  });
});
