import { render, screen, fireEvent } from "@testing-library/react";
import NavBar from "./NavBar";

test("renders NavBar correctly", () => {
  const localStorageMock = {
    getItem: jest.fn(),
    removeItem: jest.fn(),
  };
  global.localStorage = localStorageMock;

  render(<NavBar />);

  const logoElement = screen.getByAltText("logo");
  expect(logoElement).toBeInTheDocument();

  const homeLink = screen.getByText("Home");
  expect(homeLink).toBeInTheDocument();
  expect(homeLink.getAttribute("href")).toBe(
    localStorageMock.getItem() ? "/home" : ""
  );

  const addEventLink = screen.getByText("Add Event");
  expect(addEventLink).toBeInTheDocument();
  expect(addEventLink.getAttribute("href")).toBe(
    localStorageMock.getItem() ? "/create" : ""
  );

  const signOutLink = screen.getByText("Sign Out");
  expect(signOutLink).toBeInTheDocument();
  expect(signOutLink.getAttribute("href")).toBe(
    localStorageMock.getItem() ? "/" : ""
  );

  if (localStorageMock.getItem()) {
    fireEvent.click(signOutLink);
    expect(localStorageMock.removeItem).toHaveBeenCalled();
  }
});
