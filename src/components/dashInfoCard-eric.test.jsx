import { describe, expect, test } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import DashInfoCard from "./dashInfoCard";
import { addReminder } from "../utilities/googleFormApi.js";
import { sendEmail } from "./Reminder";

vi.mock("./Reminder");
vi.mock("../utilities/googleFormApi.js");

describe("eric test 2", () => {
  test("add reminder button should add question to google form and send out emails", () => {
    sendEmail.mockResolvedValue(true);
    addReminder.mockResolvedValue(true);

    const data = [];
    data["details"] = "test details";
    data["formId"] = "testId";
    data["host"] = "testHost";
    data["key"] = "testKey";
    data["name"] = "testName";
    data["time"] = "6-23-23-15-30";
    data["responderUri"] = "testURI";
    data["count"] = [];
    data["count"]["totalList"] = "test1,test2";
    render(<DashInfoCard data={data} />);

    const addReminderButton = screen.getByText("Send Reminder");
    expect(addReminderButton).toBeDefined();
    fireEvent.click(addReminderButton);

    expect(sendEmail).toHaveBeenCalledTimes(1);
    expect(addReminder).toHaveBeenCalledTimes(1);
  });

  test("google forms that have already added reminder question won't add another question when pressing send reminder", () => {
    sendEmail.mockResolvedValue(true);
    addReminder.mockResolvedValue(true);

    const data = [];
    data["details"] = "test details";
    data["formId"] = "testId";
    data["host"] = "testHost";
    data["key"] = "testKey";
    data["name"] = "testName";
    data["time"] = "6-23-23-15-30";
    data["responderUri"] = "testURI";
    data["count"] = [];
    data["count"]["totalList"] = "test1,test2";

    //already sent reminder once before
    data["reminder_count"] = [];

    render(<DashInfoCard data={data} />);

    const addReminderButton = screen.getByText("Send Reminder");
    expect(addReminderButton).toBeDefined();
    fireEvent.click(addReminderButton);

    expect(sendEmail).toHaveBeenCalledTimes(1);
    expect(addReminder).toHaveBeenCalledTimes(0);
  });
});
