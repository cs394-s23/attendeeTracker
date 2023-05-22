import { describe, expect, test, jest } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import Create from "./components/Create";
import { Link, BrowserRouter, Route, Routes } from "react-router-dom";
import { saveToken } from "./utilities/googleFormApi";
import { it, vi } from "vitest";
// import { jest } from "@jest/globals";

describe("create page tests", () => {
  test("can't post new event when not signed in", () => {
    render(
      <BrowserRouter>
        <Create />
      </BrowserRouter>
    );
    expect(screen.queryByText("Forms ID")).toBeNull();
  });

  vi.mock("./utilities/googleFormApi");

  it("post new event when signed in", () => {
    saveToken.mockReturnValue(true);

    render(
      <BrowserRouter>
        <Create />
      </BrowserRouter>
    );
    expect();
    expect(screen.getByText("Forms ID")).toBeDefined();
  });
});
