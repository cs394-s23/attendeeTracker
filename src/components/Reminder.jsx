import React, { useRef } from "react";
import emailjs from "@emailjs/browser";

// Setup emailjs (replace these with your account details)
const serviceID = "Service ID";
const templateID = "template ID";
const publicKey = "public Key";

// for testing
// const templateParams = {
//   to_name: "friend",
//   from_name: "Attendee Tracker",
//   message: "",
//   to_email: "attendeetracker.testing",
//   bcc_list:
//     "joshualevitas2022@u.northwestern.edu, ericma2024@u.northwestern.edu, joshualevitasschool@gmail.com",
// };

export const sendEmail = (formURL, bccList, name) => {
  const templateParams = {
    to_name: "friend",
    from_name: "Attendee Tracker",
    message:
      "Please edit your response to the following form " +
      formURL +
      " to confirm your attendence for the " +
      name,
    to_email: "attendeetracker.testing",
    bcc_list: bccList,
  };
  return new Promise(function (resolve, reject) {
    emailjs.send(serviceID, templateID, templateParams, publicKey).then(
      (result) => {
        console.log(result.text);
        resolve(true);
      },
      (error) => {
        console.log(error.text);
        resolve(false);
      }
    );
  });
};

export const Reminder = () => {
  return (
    <div>
      <button onClick={() => sendEmail()}>send reminder</button>
    </div>
  );
};

// export default Reminder;
