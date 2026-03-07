import { describe, expect, it } from "vitest";
import { getErrorMessage } from "../src/utils/http.js";

describe("getErrorMessage", () => {
  it("prefers API message when available", () => {
    const error = { response: { data: { message: "Token expired" } } };
    expect(getErrorMessage(error)).toBe("Token expired");
  });

  it("falls back to string API payload", () => {
    const error = { response: { data: "Invalid username or password" } };
    expect(getErrorMessage(error)).toBe("Invalid username or password");
  });

  it("falls back to Error.message, then fallback text", () => {
    expect(getErrorMessage(new Error("Network down"))).toBe("Network down");
    expect(getErrorMessage({}, "Default error")).toBe("Default error");
  });
});
