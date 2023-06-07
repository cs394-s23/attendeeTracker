import { describe, expect, test, } from "vitest";
import { Link, BrowserRouter, } from "react-router-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import Create from "./Create";
import { it, vi } from "vitest";
import { notSignedIn } from "../utilities/googleFormApi";
import userEvent from '@testing-library/user-event'


describe("create page", () => {
    vi.mock("../utilities/googleFormApi");
    notSignedIn.mockReturnValue(false);
  test("can go to url add when signed in", () => {
    render(
      <BrowserRouter>
        <Create />
      </BrowserRouter>
    );
    expect(screen.queryAllByText("Add Event")).toBeDefined();
  });

  test("wrong input gives alert", async () => {
    const user = userEvent.setup()
    render(
      <BrowserRouter>
        <Create/>
      </BrowserRouter>
    );
    const submitButton = screen.getByText("Submit");
    console.log(submitButton)
    expect(submitButton).toBeDefined();
    await user.click(submitButton);
    const alertMock = vi.spyOn(window,'alert').mockImplementation(); 
    expect(alertMock).not.toHaveBeenCalled()
  });
});
