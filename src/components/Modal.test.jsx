import { describe, expect, test, jest } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import Modal from "./Modal";

describe("eric modal test", () => {
  const data = [];
  const count = [];
  count["attending"] = 1;
  count["attendingList"] = "test1";
  count["maybe"] = 2;
  count["maybeList"] = "test2,test3";
  count["not_attending"] = 0;
  count["totalList"] = "test1,test2,test3";
  data["count"] = count;
  test("check Icon open list of attendees", () => {
    render(<Modal type="going" data={count} />);

    const checkIcon = screen.getByTitle("checkIcon");
    expect(screen.getByTitle("checkIcon")).not.toBeNull();
    fireEvent.click(checkIcon);
    expect(screen.getByText("Attending List")).not.toBeNull();
    expect(screen.getByText("test1")).not.toBeNull();
  });

  test("x Icon opens list of not going", () => {
    render(<Modal type="not going" data={count} />);
    const xIcon = screen.getByTitle("xIcon");

    expect(xIcon).not.toBeNull();
    fireEvent.click(xIcon);
    expect(screen.getByText("Not Attending List")).not.toBeNull();
  });

  test("maybe Icon opens list of not going", () => {
    render(<Modal type="maybe" data={count} />);
    const maybeIcon = screen.getByTitle("maybeIcon");
    expect(maybeIcon).not.toBeNull();
    fireEvent.click(maybeIcon);
    expect(screen.getByText("Maybe List")).not.toBeNull();
    expect(screen.getByText("test2")).not.toBeNull();
    expect(screen.getByText("test3")).not.toBeNull();
  });
});
