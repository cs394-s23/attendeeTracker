import { describe, expect, test } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import App from "./App";
import { useDbData } from "./utilities/firebase";

describe("onsite home page test", () => {
  test("Home should list events", () => {
    render(<App />);
    expect(screen.getByText("Events")).toBeDefined();
  });

  vi.mock("./utilities/firebase");

  it("firebase data", async () => {
    const mockData = {
      details: "mock",
      host: "mock",
      key: "mock",
      name: "mock",
      time: "5-20-23-15-30",
      count: {
        attending: 3,
        no_response: 76,
        not_attending: 5,
      },
    };
    useDbData.mockReturnValue([mockData, null]);

    render(<App />);
    expect(screen.getByText("mock")).toBeDefined();
  });
});
