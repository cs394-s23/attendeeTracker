import { describe, expect, test, jest } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import Create from "./Create";
import { Link, BrowserRouter, Route, Routes } from "react-router-dom";
import { saveToken } from "../utilities/googleFormApi";
import { it, vi } from "vitest";
import SignIn from "./SignIn";
// import { jest } from "@jest/globals";
import { notSignedIn } from "../utilities/googleFormApi";

describe("create page tests", () => {
  test("can't goto home page when not signed in", () => {
    render(
      <BrowserRouter>
        <SignIn />
      </BrowserRouter>
    );
    expect(screen.queryAllByText("Sign In")).toBeDefined();
  });

  vi.mock("../utilities/googleFormApi");

  test("able to continue to home page when signed in", () => {
    notSignedIn.mockReturnValue(false);
    console.log(notSignedIn());
    render(
      <BrowserRouter>
        <SignIn />
      </BrowserRouter>
    );
    expect(screen.getByText("Continue")).toBeDefined();
  });
});
