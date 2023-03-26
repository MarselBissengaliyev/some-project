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
  const [dataLoaded, setDataLoaded] = useState(false);
  const [photo, setPhoto] = useState("");
  const [message, setMessage] = useState("");
  const [isDisabled, setDisabled] = useState(false);

  const handleSubmit = async (e) => {
    setDisabled(true);
    console.log(message);
    if (message || photo) {
      await updateStartMessage({
        message: turndownService.turndown(message),
        photo,
        disableWebPagePreview: disableWebPagePreview,
      })
        .then((data) => {
          setError("");
          setStatus("Успешно измененно стартовое сообщение");
          setDisableWebPagePreview(data.disable_web_page_preview);
        })
        .catch((err) => {
          setStatus("");
          setError(err.message);
        })
        .finally(() => {
          setTimeout(() => {
            setDisabled(false);
          }, 5000);
        });
    }
  };

  useEffect(() => {
    setLoading(true);
    getStartMessage()
      .then((data) => {
        setPhoto(data.photo);
        setDisableWebPagePreview(data.disable_web_page_preview);
      })
      .finally(() => {
        setTimeout(() => {
          setLoading(false);
        }, 500);
      });
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
              onChange={(e) => {
                setDisableWebPagePreview(e.target.checked);
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
              disabled={isDisabled}
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
