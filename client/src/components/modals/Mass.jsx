import React, { useContext, useState } from "react";
import { Alert, Button, Form, Modal } from "react-bootstrap";
import TurndownService from "turndown";
import {
  sendAnimation,
  sendMassMessage,
  sendMessage,
  sendPhoto,
} from "../../network/api.telegram";
import SendMessage from "../SendMessage";
import MyContext from "../../context/context";
import { io } from "socket.io-client";

// socket.emit('getSendedMessageCount', )
const socket = io("http://localhost:4444");

const Mass = ({ handleClose, token, bot }) => {
  socket.on("message-sent", (socket) => {
    console.log(socket);
  });

  const turndownService = new TurndownService();
  const { setLoading } = useContext(MyContext);

  const replaceParagraphsWithBreaks = {
    filter: ["p"],
    replacement: function (content) {
      return "\n" + content;
    },
  };
  turndownService.addRule("replace_tag_p_to_br", replaceParagraphsWithBreaks);

  const [value, setValue] = useState("");
  const [photo, setPhoto] = useState("");
  const [testTelegramId, setTestTelegramId] = useState("");
  const [disableWebPagePreview, setDisableWebPagePreview] = useState(true);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    async function fetchSendMassMessage() {
      try {
        const data = await sendMassMessage({
          disableWebPagePreview,
          value: turndownService.turndown(value),
          photo,
          telegramBotLogin: bot.username,
        });

        setSuccess(data.message);
      } catch (error) {
        setError(error.message);
        console.error(error);
      }
    }

    if (bot.username) {
      fetchSendMassMessage();
    }

    setLoading(false);
  };

  const testSubmit = async (e) => {
    const chatId = testTelegramId;
    setLoading(true);

    async function fetchSendMessage() {
      try {
        await sendMessage(token, {
          chatId,
          text: turndownService.turndown(value),
          disableWebPagePreview,
        });
      } catch (error) {
        setError(error.message);
        console.error(error);
      }
    }
    if (!photo && value) {
      fetchSendMessage();
    }

    async function fetchSendPhoto() {
      try {
        await sendPhoto(token, {
          chatId,
          photo,
          caption: turndownService.turndown(value),
        });
      } catch (error) {
        setError(error.message);
        console.error(error);
      }
    }

    async function fetchSendAnimation() {
      try {
        await sendAnimation(token, {
          chatId,
          animation: photo,
          caption: turndownService.turndown(value),
        });
      } catch (error) {
        setError(error.message);
        console.error(error);
      }
    }

    if (photo) {
      const re = /(?:\.([^.]+))?$/;
      const extension = re.exec(photo)[1];
      console.log(extension);

      if (extension === "gif") {
        setLoading(false);
        return fetchSendAnimation();
      }
      fetchSendPhoto();
    }

    setLoading(false);
  };
  return (
    <Modal
      size="xl"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      show={true}
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
