import React, { useContext, useEffect, useState } from "react";
import {
  Alert,
  Button,
  Card,
  Col,
  Container,
  Form,
  Row,
} from "react-bootstrap";
import Mass from "../components/modals/Mass";
import Start from "../components/modals/Start";
import { getMe } from "../network/api.telegram";
import { getGeneralData, updateGeneralDataToken } from "../network/generalData";
import { getTelegramData } from "../network/telegramData";
import MyContext from "../context/context";

const Bots = () => {
  const {
    bot,
    setLoading,
    setBot,
    token,
    showMass,
    showStart,
    tokenUpdated,
    setToken,
    setShowMass,
    setShowStart,
    setTokenUpdated,
    tokenValue,
    setTokenValue
  } = useContext(MyContext);

  const handleCloseMass = () => setShowMass(false);
  const handleShowMass = () => setShowMass(true);

  const handleCloseStart = () => setShowStart(false);
  const handleShowStart = () => setShowStart(true);

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

  const hamdleSubmitUpdateToken = async () => {
    await updateGeneralDataToken(tokenValue).then((data) => {
      setToken(data.bot_token);
      setTokenValue(data.bot_token);
      setTokenUpdated(true);
    });
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
                  <b>
                    {bot.activeUsersCount
                      ? bot.activeUsersCount
                      : "Загрузка..."}
                  </b>
                </h6>
                <h6>
                  Количество всего:{" "}
                  <b>{bot.allUsersCount ? bot.allUsersCount : "Загрузка..."}</b>
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
      <Row className="mb-3">
        <Col>
          <Card>
            <Card.Body>
              <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>BOT TOKEN</Form.Label>
                  <Form.Control
                    type="text"
                    defaultValue={token}
                    onChange={(e) => setTokenValue(e.target.value)}
                  />
                  {tokenUpdated && (
                    <Alert className="mt-3" variant="success">
                      Токен успешно обновлен
                    </Alert>
                  )}
                </Form.Group>
                <Button
                  onClick={hamdleSubmitUpdateToken}
                  variant="primary"
                  type="submit"
                >
                  Submit
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Bots;
