import React, { useEffect, useState } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import Mass from "../components/modals/Mass";
import { getMe } from "../network/api.telegram";
import { getGeneralData } from "../network/generalData";
import { getTelegramData } from "../network/telegramData";

const Bots = ({ setBot, bot }) => {
  const [token, setToken] = useState("");
  const [message, setMessage] = useState("");
  const [avatar, setAvatar] = useState("");
  const [showMass, setShowMass] = useState(false);

  const handleCloseMass = () => setShowMass(false);
  const handleShowMass = () => setShowMass(true);

  useEffect(() => {
    if (bot.username) {
      getTelegramData(bot.username).then((data) => {
        setBot((bot) => ({
          ...bot,
          allUsersCount: data.allUsersCount,
          activeUsersCount: data.activeUsersCount,
          activeUsersId: data.activeUsersId,
          desositedUsers: data.desositedUsers,
          activeUsersWithClickId: data.activeUsersWithClickId,
        }));
      });
    }
    getGeneralData().then((data) => {
      setToken(data.bot_token);
      setMessage(data.bot_start_message);
      setAvatar(data.bot_avatar);
    });
  }, []);

  useEffect(() => {
    if (token) {
      getMe(token).then((data) => {
        const result = data.result;
        setBot({
          first_name: result.first_name,
          username: result.username,
        });
      });
    }
  }, [setBot, token]);

  const showActuallBotName = () => {
    if (token) {
      getMe(token).then((data) => {
        const result = data.result;
        setBot({
          first_name: result.first_name,
          username: result.username,
        });
      });
    }
  };
  return (
    <Container>
      <Row className="mb-3">
        <Col>
          <Card>
            <Card.Body className="bots">
              <div className="left">
                <img
                  className="bot-avatar"
                  src="https://i.pinimg.com/736x/fc/06/38/fc0638e5a8ec0de49396f39f01f43e02.jpg"
                  alt=""
                />
                <Button
                  onClick={showActuallBotName}
                  variant="outline-primary"
                  className="mt-3"
                >
                  Обновить
                </Button>
              </div>
              <div className="right">
                <h2>
                  {bot.first_name} | {bot.username}
                </h2>
                <h6>
                  Количество активных:{" "}
                  <b>{bot.activeUsersCount ? bot.activeUsersCount : ""}</b>
                </h6>
                <h6>
                  Количество всего:{" "}
                  <b>{bot.allUsersCount ? bot.allUsersCount : ""}</b>
                </h6>
              </div>
              <div className="btns">
                <Button onClick={handleShowMass} variant="primary">
                  Массовая рассылка
                </Button>
                <Button variant="primary">Сообщение старта</Button>
                <Mass
                  handleClose={handleCloseMass}
                  show={showMass}
                  token={token}
                  bot={bot}
                />
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
    // <div>
    //   <h2 className="text-center">Вкладка Боты</h2>
    //   <div className="container">
    //     <div className="row mb-3">
    //       <div className="col">
    //         <div className="card">
    //           <div className="card-body">
    //             <h5 className="card-title">{bot.username}</h5>
    //             <p className="card-text">Логин бота</p>
    //           </div>
    //         </div>
    //       </div>
    //       <div className="col">
    //         <div className="card">
    //           <div className="card-body">
    //             <h5 className="card-title">{bot.first_name}</h5>
    //             <p className="card-text">Название бота</p>
    //           </div>
    //         </div>
    //       </div>
    //       <div className="col">
    //         <div className="card">
    //           <div className="card-body">
    //             <h5 className="card-title">{bot.activeUsersCount}</h5>
    //             <p className="card-text">Количество Активных юзеров</p>
    //           </div>
    //         </div>
    //       </div>
    //       <div className="col">
    //         <div className="card">
    //           <div className="card-body">
    //             <h5 className="card-title">{bot.allUsersCount}</h5>
    //             <p className="card-text">
    //               Количество юзеров всего, которое когда либо нажимали кнопку
    //               старт
    //             </p>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //     <div className="row mb-3">
    //       <div className="col">
    //         <UpdateMessage message={message} setMessage={setMessage} />
    //       </div>
    //       <div className="col">
    //         <UpdateToken token={token} setToken={setToken} />
    //       </div>
    //     </div>
    //     <div className="row mb-3">
    //       <div className="col">
    //         <SendMessage token={token} activeUsersId={bot.activeUsersId} />
    //       </div>
    //     </div>
    //     <div className="row mb-3">
    //       <div className="col">
    //         <div className="card">
    //           <div className="card-body">
    //             <button
    //               onClick={showActuallBotName}
    //               className="btn btn-primary"
    //             >
    //               Показать актуальное имя бота
    //             </button>
    //             <h5 className="mt-3">{bot.first_name}</h5>
    //           </div>
    //         </div>
    //       </div>
    //       <div className="col">
    //         <UploadAvatar setAvatar={setAvatar} avatar={avatar} />
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
};

export default Bots;
