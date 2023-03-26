import React, { useContext, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import PixelItem from "../components/PixelItem";
import PixelModal from "../components/modals/PixelModal";
import { getPixels } from "../network/pixel";
import MyContext from "../context/context";

const Pixels = () => {
  const { setLoading, setError } = useContext(MyContext);

  const [pixels, setPixels] = useState([]);

  const [show, setShow] = useState(false);
  const [mode, setMode] = useState("");

  const handleClose = () => setShow(false);

  useEffect(() => {
    setLoading(true);

    async function fetchGetPixels() {
      try {
        const data = await getPixels();
        setPixels(data);
      } catch (error) {
        console.error(error);
        setError(error.message);
      }
    }

    fetchGetPixels();
    setLoading(false);
  }, [setLoading, setError]);

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
            setShow(true);
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
