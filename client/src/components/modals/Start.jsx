import React, { useEffect, useState } from "react";
import { Alert, Button, Form, Modal } from "react-bootstrap";
import showdown from "showdown";
import TurndownService from "turndown";
import {
  getStartMessage,
  updateStartMessage,
} from "../../network/startMessage";
import SendMessage from "../SendMessage";

const Start = ({ show, handleClose }) => {
  const turndownService = new TurndownService({
    blankReplacement: true
  });
  const converter = new showdown.Converter();

  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const [disableWebPagePreview, setDisableWebPagePreview] = useState(true);
  const [photo, setPhoto] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    await updateStartMessage({
      message: turndownService.turndown(message),
      photo,
      disableWebPagePreview,
    })
      .then((data) => {
        setError("");
        setStatus("Успешно измененно стартовое сообщение");
      })
      .catch((err) => {
        setStatus("");
        setError(err.message);
      });
  };

  useEffect(() => {
    getStartMessage().then((data) => {
      setMessage(data.message);
      setPhoto(data.photo);
    });
  }, [show]);
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
        <SendMessage
          setPhoto={setPhoto}
          defaultImg={photo}
          value={converter.makeHtml(message)}
          setValue={setMessage}
        />
      </Modal.Body>
      <Modal.Footer>
        <Form.Check
          className="start-checkbox"
          onChange={(e) => {
            setDisableWebPagePreview(!e.target.checked);
          }}
          defaultChecked={!disableWebPagePreview}
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
