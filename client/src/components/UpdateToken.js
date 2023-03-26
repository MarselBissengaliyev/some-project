import React, { useContext } from "react";
import { Alert, Button, Card, Col, Form } from "react-bootstrap";
import MyContext from "../context/context";
import { updateGeneralDataToken } from "../network/generalData";

const UpdateToken = () => {
  const {
    setError,
    token,
    setTokenValue,
    tokenUpdated,
    setTokenUpdated,
    setToken,
    setLoading
  } = useContext(MyContext);

  /*
   ** Update bot token in database
   */
  const handleSubmitUpdateToken = async (e) => {
    e.preventDefault();
    setLoading(true);

    function fetchUpdateToken() {
      try {
        const { data } = updateGeneralDataToken();

        setToken(data.bot_token);
        setTokenValue(data.bot_token);
        setTokenUpdated(true);
      } catch (error) {
        setError(error.message);
        console.log(error);
      }
    } 

    fetchUpdateToken();
    setLoading(false);
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
