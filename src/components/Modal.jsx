import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Modal from "react-bootstrap/Modal";
import {
  faCircleCheck,
  faCircleXmark,
  faCircleQuestion,
} from "@fortawesome/free-solid-svg-icons";

const AttendanceModal = (props) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  if (props.type == "going")
    return (
      <>
        <FontAwesomeIcon
          icon={faCircleCheck}
          className="attendance-icon fa-4x"
          style={{ color: "green" }}
          title="checkIcon"
          onClick={handleShow}
        />

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Attending List</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <ul>
              {props.data.attendingList?.split(",").map((person, index) => (
                <li key={index}>{person.trim()}</li>
              ))}
            </ul>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  else if (props.type == "not going") {
    return (
      <>
        <FontAwesomeIcon
          icon={faCircleXmark}
          className="attendance-icon fa-4x"
          style={{ color: "#FF5733" }}
          title="xIcon"
          onClick={handleShow}
        />

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Not Attending List</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <ul>
              {props.data.not_attendingList?.split(",").map((person, index) => (
                <li key={index}>{person.trim()}</li>
              ))}
            </ul>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  } else
    return (
      <>
        <FontAwesomeIcon
          icon={faCircleQuestion}
          className="attendance-icon fa-4x"
          style={{ color: "#FFB733" }}
          title="maybeIcon"
          onClick={handleShow}
        />
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Maybe List</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <ul>
              {props.data.maybeList?.split(",").map((person, index) => (
                <li key={index}>{person.trim()}</li>
              ))}
            </ul>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
};

export default AttendanceModal;
