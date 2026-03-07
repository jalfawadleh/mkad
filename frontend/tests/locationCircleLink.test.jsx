import { describe, expect, it, vi } from "vitest";
import { fireEvent, render } from "@testing-library/react";

import { MapContext } from "../src/store.js";
import { LocationCircleLink } from "../src/components/common/Icons.jsx";

describe("LocationCircleLink", () => {
  it("uses lat/lng props when location object is absent", () => {
    const setFlyToLocation = vi.fn();
    const { container } = render(
      <MapContext.Provider value={{ setFlyToLocation }}>
        <LocationCircleLink lat={37.1} lng={-122.2} />
      </MapContext.Provider>,
    );

    fireEvent.click(container.querySelector("span[role='button']"));
    expect(setFlyToLocation).toHaveBeenCalledWith({ lat: 37.1, lng: -122.2 });
  });

  it("prefers explicit location object when provided", () => {
    const setFlyToLocation = vi.fn();
    const { container } = render(
      <MapContext.Provider value={{ setFlyToLocation }}>
        <LocationCircleLink location={{ lat: 1, lng: 2 }} lat={37.1} lng={-122.2} />
      </MapContext.Provider>,
    );

    fireEvent.click(container.querySelector("span[role='button']"));
    expect(setFlyToLocation).toHaveBeenCalledWith({ lat: 1, lng: 2 });
  });
});
