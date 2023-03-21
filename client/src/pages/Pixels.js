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
  const [pixels, setPixels] = useState([]);

  const [show, setShow] = useState(false);
  const [mode, setMode] = useState("");

  const handleClose = () => setShow(false);

  useEffect(() => {
    getPixels().then((data) => {
      setPixels(data);
    });
  }, []);

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
