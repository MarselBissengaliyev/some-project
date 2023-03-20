import React, { useState } from "react";
import { Alert, Button, Form, Modal } from "react-bootstrap";
import { updateGeneralDataMessage } from "../../network/generalData";
import SendMessage from "../SendMessage";

const Start = ({ show, handleClose, message, setMessage }) => {
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const [disableWebPagePreview, setDisableWebPagePreview] = useState(true);
  const [photo, setPhoto] = useState("");

  const handleSubmit = async (e) => {
    await updateGeneralDataMessage({ message, photo, disableWebPagePreview })
      .then((data) => {
        setError("");
        setStatus("Успешно измененно стартовое сообщение");
      })
      .catch((err) => {
        setStatus("");
        setError(err.message);
        console.log(err);
      });
  };
  return (
    <Modal
      size="xl"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      show={show}
      onHide={handleClose}
    >
      <Modal.Header closeButton>
        <Modal.Title>Стартовое сообщение</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <SendMessage value={message} setValue={setMessage} />
      </Modal.Body>
      <Modal.Footer>
        <Form.Check
          className="start-checkbox"
          onChange={(e) => {
            setDisableWebPagePreview(!e.target.checked);
            console.log(disableWebPagePreview);
          }}
          defaultChecked={disableWebPagePreview}
          type="checkbox"
          label="Предпросмотр ссылок"
        />
        <Button
          variant="primary"
          onClick={(e) => {
            handleSubmit(e);
          }}
        >
          Отправить
        </Button>
        {status && (
          <Alert variant="success" className="mt-3">
            {status}
          </Alert>
        )}
        {error && (
          <Alert variant="danger" className="mt-3">
            {error}
          </Alert>
        )}
      </Modal.Footer>
    </Modal>
  );
};

export default Start;
