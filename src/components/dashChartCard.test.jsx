import { describe, test } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { it, vi, beforeEach } from "vitest";
import DashChartCard from "./dashInfoCard";
import * as googleFormApi from "../utilities/googleFormApi";


const mockData_ = {
  details: "Josh's event",
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


describe("graph", () => {
  test("event dashboard has event name", () => {
    render(<DashInfoCard data={mockData_} />);
    screen.getByText(/Josh's event/)
  });

  test("event dashboard shows graph of responses", () => {
    
    render(<DashInfoCard data={mockData_} />);
    expect(screen.getByTestId("graph")).toBeDefined();

  });




})
