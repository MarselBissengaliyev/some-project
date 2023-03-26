import React, { useContext, useEffect, useState } from "react";
import { Alert, Button, Form, Modal } from "react-bootstrap";
import TurndownService from "turndown";
import {
  getStartMessage,
  updateStartMessage,
} from "../../network/startMessage";
import SendMessage from "../SendMessage";
import MyContext from "../../context/context";

const Start = ({ handleClose }) => {
  const turndownService = new TurndownService();
  const { setLoading, loading } = useContext(MyContext);

  const replaceParagraphsWithBreaks = {
    filter: ["p"],
    replacement: function (content) {
      return "\n" + content;
    },
  };
  turndownService.addRule("replace_tag_p_to_br", replaceParagraphsWithBreaks);

  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const [disableWebPagePreview, setDisableWebPagePreview] = useState();
  const [photo, setPhoto] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    setLoading(true);

    async function fetchUpdateStartMessage() {
      try {
        const data = await updateStartMessage({
          message: turndownService.turndown(message),
          photo,
          disableWebPagePreview: disableWebPagePreview,
        });

        setError("");
        setStatus("Успешно измененно стартовое сообщение");
        setDisableWebPagePreview(data.disable_web_page_preview);

        setTimeout(() => {
          handleClose()
        }, 3000)
      } catch (error) {
        setError(error.message);
        console.error(error);
      }
    }


    if (message || photo) {
      fetchUpdateStartMessage();
    }

    setLoading(false);
  };

  useEffect(() => {
    setLoading(true);
    async function fetchGetStartMessage() {
      try {
        const data = await getStartMessage();

        setPhoto(data.photo);
        setDisableWebPagePreview(data.disable_web_page_preview);
      } catch (error) {
        setError(error.message);
        console.error(error);
      }
    }

    fetchGetStartMessage();

    setLoading(false);
  }, [setLoading]);

  return (
    <Modal
      size="xl"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      show={true}
      onHide={handleClose}
    >
      <Modal.Header closeButton>
        <Modal.Title>Стартовое сообщение</Modal.Title>
      </Modal.Header>
      {!loading && (
        <>
          <Modal.Body>
            <SendMessage
              setPhoto={setPhoto}
              defaultImg={photo}
              setValue={setMessage}
            />
          </Modal.Body>
          <Modal.Footer>
            <Form.Check
              className="start-checkbox"
              onClick={(e) => {
                console.log(!disableWebPagePreview);
                setDisableWebPagePreview(!disableWebPagePreview);
              }}
              defaultChecked={disableWebPagePreview}
              type="checkbox"
              label="Отключить предпросмотр ссылок"
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
        </>
      )}
    </Modal>
  );
};

export default Start;
