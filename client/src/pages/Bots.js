import React, { useEffect, useState } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import Mass from "../components/modals/Mass";
import { getMe } from "../network/api.telegram";
import { getGeneralData } from "../network/generalData";
import { getTelegramData } from "../network/telegramData";
import Start from "../components/modals/Start";

const Bots = ({ setBot, bot }) => {
  const [token, setToken] = useState("");
  const [showMass, setShowMass] = useState(false);
  const [showStart, setShowStart] = useState(false);

  const handleCloseMass = () => setShowMass(false);
  const handleShowMass = () => setShowMass(true);

  const handleCloseStart = () => setShowStart(false);
  const handleShowStart = () => setShowStart(true);

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
          ...bot,
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
                <div className="bot-avatar">
                  <img
                    src="https://i.pinimg.com/736x/fc/06/38/fc0638e5a8ec0de49396f39f01f43e02.jpg"
                    alt=""
                  />
                  <div>Загрузить новую</div>
                </div>
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
                  <b>{bot.activeUsersCount}</b>
                </h6>
                <h6>
                  Количество всего:{" "}
                  <b>{bot.allUsersCount}</b>
                </h6>
              </div>
              <div className="btns">
                <Button onClick={handleShowMass} variant="primary">
                  Массовая рассылка
                </Button>
                <Button onClick={handleShowStart} variant="primary">
                  Сообщение старта
                </Button>
                <Mass
                  handleClose={handleCloseMass}
                  show={showMass}
                  token={token}
                  bot={bot}
                />
                <Start handleClose={handleCloseStart} show={showStart} />
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Bots;