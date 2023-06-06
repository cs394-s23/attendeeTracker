import { render, screen } from "@testing-library/react";
import Dashboard from "./Dashboard";

test("renders all components correctly", () => {
  render(<Dashboard />);

  const navBar = screen.getByTestId("nav-bar");
  expect(navBar).toBeInTheDocument();

  const eventName = screen.getByText(mockData.user1.eventId1.name);
  expect(eventName).toBeInTheDocument();

  const dashInfoCard = screen.getByTestId("dash-info-card");
  expect(dashInfoCard).toBeInTheDocument();

  const dashAttendanceCard = screen.getByTestId("dash-attendance-card");
  expect(dashAttendanceCard).toBeInTheDocument();

  const dashChartCard = screen.getByTestId("dash-chart-card");
  expect(dashChartCard).toBeInTheDocument();

  const dashReminderCard = screen.queryByTestId("dash-reminder-card");
  if (mockData.user1.eventId1.hasOwnProperty("reminder_count")) {
    expect(dashReminderCard).toBeInTheDocument();
  } else {
    expect(dashReminderCard).not.toBeInTheDocument();
  }
});
