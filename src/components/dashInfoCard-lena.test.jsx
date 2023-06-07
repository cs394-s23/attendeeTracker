import { describe, test } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { it, vi, beforeEach } from "vitest";
import DashInfoCard from "./dashInfoCard";
import * as googleFormApi from "../utilities/googleFormApi";


const mockData_ = {
  details: "Lena's mock event",
  formId: "mock form ID",
  host: "mock host",
  key: "mock key",
  name: "mock name",
  time: "5-20-23-15-30",
  responderUri: "mock uri",
  count: {
    attending: 1,
    attendingList: "mock1@u.northwestern.edu",
    not_attending: 2,
    not_attendingList: "mock2@u.northwestern.edu",
    totalList: "mock1@u.northwestern.edu, mock2@u.northwestern.edu",
  }
}


describe("details", () => {
  test("event dashboard has event name", () => {
    render(<DashInfoCard data={mockData_} />);
    screen.getByText(/Lena's mock event/)
  });

  test("event dashboard has event time", () => {

    render(<DashInfoCard data={mockData_} />);
    screen.getByText(/15:30/)
  });

  test("event dashboard does not have wrong event time", () => {

    render(<DashInfoCard data={mockData_} />);
    expect(screen.queryByText(/14:30/)).toBeNull();
  });

});

describe("refresh", () => {
  test("event dashboard has the option to refresh the form responses", () => {
    render(<DashInfoCard data={mockData_} />);
    screen.getByText(/Refresh Data/)
  });

  test("Clicking refresh data updates the data", () => {

    // Mock the trySampleRequest function
    const mockTrySampleRequest = vi.spyOn(googleFormApi, "trySampleRequest");

    render(<DashInfoCard data={mockData_} />);

    const refreshDataButton = screen.getByText("Refresh Data");
    expect(refreshDataButton).toBeDefined();
    fireEvent.click(refreshDataButton);

    expect(mockTrySampleRequest).toHaveBeenCalled();
    // Restore the mock function after the test case
    mockTrySampleRequest.mockRestore();
  });

  test("Verify only called when refresh button is clicked", () => {

    // Mock the trySampleRequest function
    const mockTrySampleRequest = vi.spyOn(googleFormApi, "trySampleRequest");

    render(<DashInfoCard data={mockData_} />);

    const refreshDataButton = screen.getByText("Refresh Data");
    expect(refreshDataButton).toBeDefined();
    // fireEvent.click(refreshDataButton);

    expect(mockTrySampleRequest).not.toHaveBeenCalled();
    // Restore the mock function after the test case
    mockTrySampleRequest.mockRestore();
  });

});



