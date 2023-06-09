import { describe, expect, test } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import Home from "./components/Home";
import { useDbData } from "./utilities/firebase";

describe("onsite home page test", () => {
  test("Home should list events", () => {
    render(<Home />);
    expect(screen.getByText("Events")).toBeDefined();
  });

  vi.mock("./utilities/firebase.js");

  //   test("firebase data", () => {
  //     const mockData = {
  //       details: "mock",
  //       host: "mock",
  //       key: "mock",
  //       name: "mock",
  //       time: "5-20-23-15-30",
  //       count: {
  //         attending: 3,
  //         no_response: 76,
  //         not_attending: 5,
  //       },
  //     };
  //     const data = [];
  //     data["1111"] = mockData;

  //     useDbData.mockReturnValue([[data], null]);

  //     render(<Home data={useDbData("/")} />);
  //     expect(screen.getByText("mock")).toBeDefined();
  //   });
});
