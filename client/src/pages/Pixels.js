import React, { useEffect, useState } from "react";
import {
  createPixel,
  deletePixel,
  getPixel,
  getPixels,
} from "../network/pixel";
import PixelItem from "../components/PixelItem";
import { Button } from "react-bootstrap";
import PixelModal from "../components/modals/PixelModal";

const Pixels = () => {
  const [pixelId, setPixelId] = useState("");
  const [token, setToken] = useState("");
  const [isCreated, setCreated] = useState(false);
  const [pixels, setPixels] = useState([]);

  const [show, setShow] = useState(false);
  const [mode, setMode] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    getPixels().then((data) => {
      console.log(data);
      setPixels(data);
    });
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    await createPixel({ pixelId, token })
      .then(() => setCreated(true))
      .catch((err) => {
        console.error(err);
        setCreated(false);
      });
  };

  return (
    <div className="container">
      <div className="pixels-wrapper">
        {pixels &&
          pixels.map((p) => (
            <PixelItem setPixels={setPixels} key={p._id} {...p} />
          ))}
        <Button
          onClick={() => {
            setMode("create");
            setShow(true)
          }}
          className="create-pixel"
          variant="success"
        >
          Создать
        </Button>
        <PixelModal
          setPixels={setPixels}
          mode={mode}
          handleClose={handleClose}
          show={show}
        />
      </div>
    </div>
  );
};

export default Pixels;
