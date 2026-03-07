import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";

import { UserContext } from "../src/store.js";
import RouteOrganisation from "../src/components/routes/RouteOrganisation.jsx";

const renderRoute = (user, initialPath = "/manage") =>
  render(
    <UserContext.Provider value={{ user }}>
      <MemoryRouter initialEntries={[initialPath]}>
        <Routes>
          <Route path='/' element={<div>Home</div>} />
          <Route element={<RouteOrganisation />}>
            <Route path='/manage' element={<div>Manage</div>} />
          </Route>
        </Routes>
      </MemoryRouter>
    </UserContext.Provider>,
  );

describe("RouteOrganisation", () => {
  it("renders protected content for organisation users", () => {
    renderRoute({ type: "organisation" });
    expect(screen.getByText("Manage")).toBeInTheDocument();
  });

  it("redirects non-organisation users to home", () => {
    renderRoute({ type: "member" });
    expect(screen.getByText("Home")).toBeInTheDocument();
  });
});
