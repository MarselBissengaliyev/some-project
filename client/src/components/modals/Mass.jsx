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

  const sendMessageToPiceOfUsers = (piecesUsersId) => {
    piecesUsersId.forEach(async (piece) => {
      const chatId = piece.telegram_id;
      if (!photo && value) {
        await sendMessage(token, {
          chatId,
          text: turndownService.turndown(value),
          disableWebPagePreview,
        }).then(() => {
          setCountUsers((prevNum) => prevNum + 1);
          console.log(countUsers);
        });
      }
      if (photo) {
        await sendPhoto(token, {
          chatId,
          photo,
          caption: turndownService.turndown(value),
        }).then(() => {
          setCountUsers((prevNum) => prevNum + 1);
        });
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    bot.activeUsersId.forEach(async (activeUserId, index) => {
      const piecesUsersId = bot.activeUsersId.slice(index, index + 1);
      if (index === 0) {
        sendMessageToPiceOfUsers(piecesUsersId);
      } else {
        setTimeout(() => {
          sendMessageToPiceOfUsers(piecesUsersId);
        }, 10000);
      }
    });
    console.log(countUsers);
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
          photo={photo}
          setPhoto={setPhoto}
          token={token}
          activeUsersId={bot.activeUsersId}
        />
        {!!countUsers && (
          <Alert variant="success" className="mt-3">
            {`Количество получивших сообщение: ${countUsers}`}
          </Alert>
        )}
      </Modal.Body>
      <Modal.Footer>
        <div className="mass-footer">
          <div className="left-mass">
            <Button
              className="send"
              variant="success"
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
