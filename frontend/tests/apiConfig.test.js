import { describe, expect, it } from "vitest";

import { getApiBaseUrl } from "../src/utils/apiConfig.js";

describe("getApiBaseUrl", () => {
  it("returns localhost API for non-prod", () => {
    expect(getApiBaseUrl(false)).toBe("http://localhost:3000/api/");
  });

  it("returns production API for prod", () => {
    expect(getApiBaseUrl(true)).toBe("https://mkadifference.com/api/");
  });
});
