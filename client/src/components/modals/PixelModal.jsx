import React, { useContext, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { createPixel, updatePixel } from "../../network/pixel";
import MyContext from "../../context/context";

const PixelModal = ({ show, handleClose, mode, id, setPixels }) => {
  const [token, setToken] = useState("");
  const [pixelId, setPixelId] = useState("");
  const { setLoading, setError } = useContext(MyContext);

  const handleUpdate = async (e) => {
    setLoading(true);
    async function fetchUpdatePixel() {
      try {
        await updatePixel({ id, token, pixelId });
        setPixels((pixels) =>
          pixels.map((pixel) => {
            if (pixel._id === id) {
              return {
                ...pixel,
                token: token,
                fb_pixel_id: pixelId,
              };
            }
            return pixel;
          })
        );
        handleClose();
      } catch (error) {
        setError(error.message);
        console.error(error);
      }
    }

    if (id && token && pixelId) {
      fetchUpdatePixel();
    }

    setLoading(false);
  };

  const handleCreate = async (e) => {
    setLoading(true);
    async function fetchCreatePixel() {
      try {
        const data = await createPixel({ pixelId, token });
        setPixels((pixels) => {
          return [...pixels, data];
        });
        handleClose();
      } catch (error) {
        setError(error.message);
        console.error(error);
      }
    }
    
    if (pixelId && token) {
      fetchCreatePixel();
    }

    setLoading(false);
  };
  return (
    <Modal show={show} onHide={handleClose} animation={false}>
      <Modal.Header closeButton>
        <Modal.Title>{mode === "edit" ? "Изменить" : "Создать"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>PIXEL ID</Form.Label>
            <Form.Control
              onChange={(e) => setPixelId(e.target.value)}
              type="text"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>TOKEN</Form.Label>
            <Form.Control
              onChange={(e) => setToken(e.target.value)}
              type="text"
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Закрыть
        </Button>
        <Button
          variant="primary"
          onClick={mode === "edit" ? handleUpdate : handleCreate}
        >
          {mode === "edit" ? "Изменить" : "Создать"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default PixelModal;
