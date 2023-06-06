import { describe, expect, test, jest } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import NavBar from "./NavBar";



describe("Alex's homepage test with past", () => {
  const newData = Object.values({"24e3a74a": {
    "count": {
      "attending": 1,
      "attendingList": "eilenelee2024@u.northwestern.edu",
      "maybe": 2,
      "maybeList": "angelalee2024@u.northwestern.edu,ericma2024@u.northwestern.edu",
      "not_attending": 1,
      "not_attendingList": "emilyzhang2024@u.northwestern.edu",
      "totalList": "angelalee2024@u.northwestern.edu,eilenelee2024@u.northwestern.edu,emilyzhang2024@u.northwestern.edu,ericma2024@u.northwestern.edu"
    },
    "details": "Comp sci fun times!",
    "formId": "1sOG4yMVe79UFmygZr8-aQJWXKpuAzzcftexmwtypY8c",
    "host": "AlexTang",
    "key": "24e3a74a",
    "name": "Computer Science Gathering",
    "responderUri": "https://docs.google.com/forms/d/e/1FAIpQLSdhtNf8Ay1y4hRF_yWB_JdYASiGNdgS8ymh-VQJPsL7XMFydg/viewform",
    "time": "5-27-23-15-30"
  },
  "77c4242a": {
    "count": {
      "attending": 0,
      "maybe": 1,
      "maybeList": "ericma2024@u.northwestern.edu",
      "not_attending": 1,
      "not_attendingList": "emilyzhang2024@u.northwestern.edu",
      "totalList": "emilyzhang2024@u.northwestern.edu,ericma2024@u.northwestern.edu"
    },
    "details": "neuro fun time!",
    "formId": "12OWscKCEmqAx195i8fMJ9ftY3HruBcUjU7arlsZPvRg",
    "host": "AlexTang",
    "key": "77c4242a",
    "name": "Neuroscience Gathering",
    "responderUri": "https://docs.google.com/forms/d/e/1FAIpQLSfvmOY1qCU1F_BU_Rrw754rtFjZ0N_nI_zCjD5MnCDWrkNt6w/viewform",
    "time": "6-15-23-15-30"
  }});
  
  test("check past events section show past events", () => {
    render(
        <div>
        <NavBar />
        <h1 id="header"> Events </h1>
        <div className="feed">
          {newData
            .filter(
              (post) =>
                !(
                  (parseInt(post.time.substring(2, 4)) - 1 <=
                    new Date().getDate() &&
                    parseInt(post.time[0]) - 1 <= new Date().getMonth() &&
                    parseInt(post.time.substring(5, 7)) + 2000 ==
                      new Date().getFullYear()) ||
                  (parseInt(post.time[0]) - 1 < new Date().getMonth() &&
                    parseInt(post.time.substring(5, 7)) + 2000 ==
                      new Date().getFullYear()) ||
                  parseInt(post.time.substring(5, 7)) + 2000 <
                    new Date().getFullYear()
                )
            )
            .map((event, index) => (
              <div aria-label={"ongoing"} value={event.details} />
            ))}
        </div>
        <h1 id="header"> Past Events </h1>
        <div className="feed">
          {newData
            .filter(
              (post) =>
                (parseInt(post.time.substring(2, 4)) - 1 <=
                  new Date().getDate() &&
                  parseInt(post.time[0]) - 1 <= new Date().getMonth() &&
                  parseInt(post.time.substring(5, 7)) + 2000 ==
                    new Date().getFullYear()) ||
                (parseInt(post.time[0]) - 1 < new Date().getMonth() &&
                  parseInt(post.time.substring(5, 7)) + 2000 ==
                    new Date().getFullYear()) ||
                parseInt(post.time.substring(5, 7)) + 2000 <
                  new Date().getFullYear()
            )
            .map((event, index) => (
              <div aria-label={"past"} value={event.details} />
            ))}
        </div>
      </div>
    );

    expect(screen.getByText("Past Events")).toBeDefined();
    expect(screen.getByLabelText("ongoing")).toBeDefined();
    expect(screen.getByLabelText("past")).toBeDefined();

    

  });
});


describe("Alex's homepage test without past", () => {
  const newData = Object.values({
  "77c4242a": {
    "count": {
      "attending": 0,
      "maybe": 1,
      "maybeList": "ericma2024@u.northwestern.edu",
      "not_attending": 1,
      "not_attendingList": "emilyzhang2024@u.northwestern.edu",
      "totalList": "emilyzhang2024@u.northwestern.edu,ericma2024@u.northwestern.edu"
    },
    "details": "neuro fun time!",
    "formId": "12OWscKCEmqAx195i8fMJ9ftY3HruBcUjU7arlsZPvRg",
    "host": "AlexTang",
    "key": "77c4242a",
    "name": "Neuroscience Gathering",
    "responderUri": "https://docs.google.com/forms/d/e/1FAIpQLSfvmOY1qCU1F_BU_Rrw754rtFjZ0N_nI_zCjD5MnCDWrkNt6w/viewform",
    "time": "6-15-23-15-30"
  }});
  
  test("check past events section does not have any events if the time is not past", () => {
    render(
        <div>
        <NavBar />
        <h1 id="header"> Events </h1>
        <div className="feed">
          {newData
            .filter(
              (post) =>
                !(
                  (parseInt(post.time.substring(2, 4)) - 1 <=
                    new Date().getDate() &&
                    parseInt(post.time[0]) - 1 <= new Date().getMonth() &&
                    parseInt(post.time.substring(5, 7)) + 2000 ==
                      new Date().getFullYear()) ||
                  (parseInt(post.time[0]) - 1 < new Date().getMonth() &&
                    parseInt(post.time.substring(5, 7)) + 2000 ==
                      new Date().getFullYear()) ||
                  parseInt(post.time.substring(5, 7)) + 2000 <
                    new Date().getFullYear()
                )
            )
            .map((event, index) => (
              <div aria-label={"ongoing"} value={event.details} />
            ))}
        </div>
        <h1 id="header"> Past Events </h1>
        <div className="feed">
          {newData
            .filter(
              (post) =>
                (parseInt(post.time.substring(2, 4)) - 1 <=
                  new Date().getDate() &&
                  parseInt(post.time[0]) - 1 <= new Date().getMonth() &&
                  parseInt(post.time.substring(5, 7)) + 2000 ==
                    new Date().getFullYear()) ||
                (parseInt(post.time[0]) - 1 < new Date().getMonth() &&
                  parseInt(post.time.substring(5, 7)) + 2000 ==
                    new Date().getFullYear()) ||
                parseInt(post.time.substring(5, 7)) + 2000 <
                  new Date().getFullYear()
            )
            .map((event, index) => (
              <div aria-label={"past"} value={event.details} />
            ))}
        </div>
      </div>
    );

    expect(screen.getByText("Past Events")).toBeDefined();
    expect(screen.getByLabelText("ongoing")).toBeDefined();
    expect(screen.queryByLabelText("past")).toBeNull();

    

  });
});


describe("Alex's homepage test with a form without responses", () => {
  const newData = Object.values({"24e3a74a": {
    "count": {
      "attending": 0,
      "maybe": 0,
      "not_attending": 0,
      "totalList": ""
    },
    "details": "Comp sci fun times!",
    "formId": "1sOG4yMVe79UFmygZr8-aQJWXKpuAzzcftexmwtypY8c",
    "host": "AlexTang",
    "key": "24e3a74a",
    "name": "Computer Science Gathering",
    "responderUri": "https://docs.google.com/forms/d/e/1FAIpQLSdhtNf8Ay1y4hRF_yWB_JdYASiGNdgS8ymh-VQJPsL7XMFydg/viewform",
    "time": "5-27-23-15-30"
  },
  "77c4242a": {
    "count": {
      "attending": 0,
      "maybe": 1,
      "maybeList": "ericma2024@u.northwestern.edu",
      "not_attending": 1,
      "not_attendingList": "emilyzhang2024@u.northwestern.edu",
      "totalList": "emilyzhang2024@u.northwestern.edu,ericma2024@u.northwestern.edu"
    },
    "details": "neuro fun time!",
    "formId": "12OWscKCEmqAx195i8fMJ9ftY3HruBcUjU7arlsZPvRg",
    "host": "AlexTang",
    "key": "77c4242a",
    "name": "Neuroscience Gathering",
    "responderUri": "https://docs.google.com/forms/d/e/1FAIpQLSfvmOY1qCU1F_BU_Rrw754rtFjZ0N_nI_zCjD5MnCDWrkNt6w/viewform",
    "time": "6-15-23-15-30"
  }});
  
  test("check events without responses still show up", () => {
    render(
        <div>
        <NavBar />
        <h1 id="header"> Events </h1>
        <div className="feed">
          {newData
            .filter(
              (post) =>
                !(
                  (parseInt(post.time.substring(2, 4)) - 1 <=
                    new Date().getDate() &&
                    parseInt(post.time[0]) - 1 <= new Date().getMonth() &&
                    parseInt(post.time.substring(5, 7)) + 2000 ==
                      new Date().getFullYear()) ||
                  (parseInt(post.time[0]) - 1 < new Date().getMonth() &&
                    parseInt(post.time.substring(5, 7)) + 2000 ==
                      new Date().getFullYear()) ||
                  parseInt(post.time.substring(5, 7)) + 2000 <
                    new Date().getFullYear()
                )
            )
            .map((event, index) => (
              <div aria-label={[event.count.attending, event.count.not_attending, event.count.maybe]} />
            ))}
        </div>
        <h1 id="header"> Past Events </h1>
        <div className="feed">
          {newData
            .filter(
              (post) =>
                (parseInt(post.time.substring(2, 4)) - 1 <=
                  new Date().getDate() &&
                  parseInt(post.time[0]) - 1 <= new Date().getMonth() &&
                  parseInt(post.time.substring(5, 7)) + 2000 ==
                    new Date().getFullYear()) ||
                (parseInt(post.time[0]) - 1 < new Date().getMonth() &&
                  parseInt(post.time.substring(5, 7)) + 2000 ==
                    new Date().getFullYear()) ||
                parseInt(post.time.substring(5, 7)) + 2000 <
                  new Date().getFullYear()
            )
            .map((event, index) => (
              <div aria-label={[event.count.attending, event.count.not_attending, event.count.maybe]} />
            ))}
        </div>
      </div>
    );

    expect(screen.getByLabelText("0,0,0")).toBeDefined();

    

  });
});