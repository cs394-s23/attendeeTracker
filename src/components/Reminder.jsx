import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';

// Setup emailjs (replace these with your account details)
const serviceID = 'service_jx31r0d';
const templateID = 'template_pgii825';
const publicKey = 'V3iGvRLEXLu2d7Qqs';

// for testing
const templateParams = { to_name: "", from_name: "", message: "", to_email: "attendeetracker.testing", bcc_list: "joshualevitas2022@u.northwestern.edu, ericma2024@u.northwestern.edu, joshualevitasschool@gmail.com" };  

const sendEmail = () => {
    emailjs.send(serviceID, templateID, templateParams, publicKey)
        .then((result) => {
            console.log(result.text);
        }, (error) => {
            console.log(error.text);
        });

}

export const Reminder = () => {
    return (
        <div>
            <button onClick={() => sendEmail()}>send reminder</button>
        </div>
    )
}

// export default Reminder;