import React, { useContext } from "react";
import { Alert, Button, Card, Col, Form } from "react-bootstrap";
import MyContext from "../context/context";
import { getMe } from "../network/api.telegram";
import { updateGeneralDataToken } from "../network/generalData";

const UpdateToken = () => {
  const {
    setError,
    token,
    setTokenValue,
    tokenUpdated,
    tokenValue,
    setTokenUpdated,
    setToken,
    setBot,
  } = useContext(MyContext);

  /*
   ** Update bot token in database
   */
  const handleSubmitUpdateToken = async (e) => {
    e.preventDefault();

    await updateGeneralDataToken(tokenValue)
      .then((data) => {
        setToken(data.bot_token);
        setTokenValue(data.bot_token);
        setTokenUpdated(true);

        getMe(data.bot_token)
          .then((data) => {
            setError("");
            const result = data.result;

            setBot((bot) => ({
              ...bot,
              first_name: result.first_name,
              username: result.username,
            }));
          })
          .catch((err) => {
            setBot(() => ({
              first_name: "",
              username: "",
              activeUsersCount: "",
              allUsersCount: "",
              desositedUsers: null,
              activeUsersWithClickId: null,
            }));
            setError(err.message);
          });
      })
      .catch((err) => {
        console.log(err);
        setError(err.message);
      });
  };
  return (
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
  );
};

export default UpdateToken;
