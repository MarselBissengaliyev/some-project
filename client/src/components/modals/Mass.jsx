import React, { useState } from "react";
import { Alert, Button, Form, Modal } from "react-bootstrap";
import TurndownService from "turndown";
import {
  sendMassMessage,
  sendMessage,
  sendPhoto,
} from "../../network/api.telegram";
import SendMessage from "../SendMessage";

const Mass = ({ show, handleClose, token, bot }) => {
  const turndownService = new TurndownService();

  const replaceParagraphsWithBreaks = {
    filter: ['p'],
    replacement: function(content) {
      return '\n' + content;
    }
  };
  turndownService.addRule('replace_tag_p_to_br', replaceParagraphsWithBreaks);

  const [value, setValue] = useState("");
  const [photo, setPhoto] = useState("");
  const [testTelegramId, setTestTelegramId] = useState("");
  const [disableWebPagePreview, setDisableWebPagePreview] = useState(true);
  const [success, setSuccess] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSending(true);

    if (bot.activeUsersId.length > 0) {
      await sendMassMessage({
        disableWebPagePreview,
        value: turndownService.turndown(value),
        photo,
        telegramBotLogin: bot.username
      })
        .then((data) => {
          setSuccess(data.message);
        })
        .catch((err) => {
          setError(err.message);
          console.log(err);
        });
    }

    setIsSending(false);
  };

  const testSubmit = async (e) => {
    const chatId = testTelegramId;

    if (!photo && value) {
      await sendMessage(token, {
        chatId,
        text: turndownService.turndown(value),
        disableWebPagePreview,
      });
    }

    if (photo) {
      await sendPhoto(token, {
        chatId,
        photo,
        caption: turndownService.turndown(value),
      });
    }
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
        <Modal.Title>Массовая рассылка</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <SendMessage value={value} setValue={setValue} setPhoto={setPhoto} />
        {!!success && (
          <Alert variant="success" className="mt-3">
            {success}
          </Alert>
        )}
        {error && (
          <Alert variant="danger" className="mt-3">
            {error}
          </Alert>
        )}
      </Modal.Body>
      <Modal.Footer>
        <div className="mass-footer">
          <div className="left-mass">
            <Button
              className="send"
              variant="success"
              disabled={isSending}
              onClick={(e) => {
                handleSubmit(e);
              }}
            >
              Отправить
            </Button>
            <Form.Check
              onChange={(e) => {
                setDisableWebPagePreview(!e.target.checked);
              }}
              defaultChecked={!disableWebPagePreview}
              type="checkbox"
              label="Предпросмотр ссылок"
            />
          </div>
          <div className="right-mass">
            <Form.Control
              onChange={(e) => setTestTelegramId(e.target.value)}
              type="text"
              placeholder="telegram_id"
            />
            <Button
              variant="primary"
              onClick={(e) => {
                handleClose(true);
                testSubmit(e);
              }}
            >
              Тестовое сообщение
            </Button>
          </div>
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default Mass;
