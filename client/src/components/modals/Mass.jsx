import React, { useState } from "react";
import { Alert, Button, Form, Modal } from "react-bootstrap";
import TurndownService from "turndown";
import { sendMessage, sendPhoto } from "../../network/api.telegram";
import SendMessage from "../SendMessage";

const Mass = ({ show, handleClose, token, bot }) => {
  const turndownService = new TurndownService();
  const [value, setValue] = useState("");
  const [photo, setPhoto] = useState("");
  const [testTelegramId, setTestTelegramId] = useState("");
  const [disableWebPagePreview, setDisableWebPagePreview] = useState(true);
  const [countUsers, setCountUsers] = useState(0);
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    setIsSending(true);

    e.preventDefault();

    // Loop through the array of users and send a message to every 20 users
    new Promise((resolve, reject) => {
      for (let i = 0, sec = 0; i < bot.activeUsersId.length; i += 20, sec++) {
        const group = bot.activeUsersId.slice(i, i + 20); // get the next 20 users from the array
        // send a message to each user in the group with a 1-second interval between each message
        setTimeout(() => {
          group.forEach(async (user, index) => {
            const chatId = user.telegram_id;
  
            if (!photo && value) {
              await sendMessage(token, {
                chatId,
                text: turndownService.turndown(value),
                disableWebPagePreview,
              })
                .then(() => {
                  setCountUsers((prevNum) => prevNum + 1);
                })
                .catch((err) => {
                  console.log("suka");
                  setError(err.description);
                });
            }
  
            if (photo) {
              console.log(photo);
              await sendPhoto(token, {
                chatId,
                photo,
                caption: turndownService.turndown(value),
              })
                .then(() => {
                  setCountUsers((prevNum) => prevNum + 1);
                })
                .catch((err) => {
                  setError(err.description);
                });
            }
  
            console.log(`Sending message to ${user.telegram_id}`);
          });
        }, 1000 * sec);
      }
      resolve()
    })
    .then(() => {
      setIsSending(false)
    })
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
        <SendMessage
          value={value}
          setValue={setValue}
          setPhoto={setPhoto}
        />
        {!!countUsers && (
          <Alert variant="success" className="mt-3">
            {`Количество получивших сообщение: ${countUsers}`}
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
                console.log(disableWebPagePreview);
              }}
              defaultChecked={disableWebPagePreview}
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
