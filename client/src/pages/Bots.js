import React, { useContext } from "react";
import {
  Alert,
  Button,
  Card,
  Col,
  Container,
  Form,
  Row,
} from "react-bootstrap";
import Avatar from "../components/Avatar";
import Mass from "../components/modals/Mass";
import Start from "../components/modals/Start";
import MyContext from "../context/context";
import { getMe } from "../network/api.telegram";
import { updateGeneralDataToken } from "../network/generalData";

const Bots = () => {
  const {
    bot,
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
    setTokenValue,
    setError
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

  const handleSubmitUpdateToken = async (e) => {
    e.preventDefault();

    await updateGeneralDataToken(tokenValue).then((data) => {
      setToken(data.bot_token);
      setTokenValue(data.bot_token);
      setTokenUpdated(true);

      getMe(data.bot_token).then((data) => {
        setError('');
        const result = data.result;
        
        setBot((bot) => ({
          ...bot,
          first_name: result.first_name,
          username: result.username,
        }));
      }).catch(err => {
        setBot(() => ({
          first_name: "",
          username: "",
          activeUsersCount: "",
          allUsersCount: "",
          desositedUsers: null,
          activeUsersWithClickId: null,
        }))
        setError(err.message);
      });
    });
  };
  return (
    <Container>
      <Row className="mb-3">
        <Col>
          <Card>
            <Card.Body className="bots">
              <div className="left">
                <Avatar />
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
                  onClick={handleSubmitUpdateToken}
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
