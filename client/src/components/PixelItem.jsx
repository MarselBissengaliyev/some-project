import React, { useContext, useState } from "react";
import { deletePixel } from "../network/pixel";
import PixelModal from "./modals/PixelModal";
import MyContext from "../context/context";

const PixelItem = ({ token, fb_pixel_id, _id, setPixels }) => {
  const [show, setShow] = useState(false);
  const [mode, setMode] = useState("");
  const { setLoading, setError } = useContext(MyContext);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  /*
   ** Handle Delete a PixelItem function
   */
  const handleDelete = async (e) => {
    e.preventDefault();
    setLoading(true);
    async function fetchDeletePixel() {
      try {
        await deletePixel(_id);

        setPixels((pixels) =>
          pixels.filter((pixel) => {
            return pixel._id !== _id;
          })
        );
      } catch (error) {
        setError(error.message);
        console.error(error);
      }
    }
    
    if (_id) {
      fetchDeletePixel();
    }

    setLoading(false);
  };

  return (
    <div className="col">
      <div className="card">
        <div className="card-body">
          <div className="row">
            <div className="col pixel-item">
              <h5>{fb_pixel_id}</h5>
              <p>{token}</p>
            </div>
            <div className="pixel-btns">
              <button
                onClick={() => {
                  handleShow(true);
                  setMode("edit");
                }}
                className="btn btn-info"
                type="button"
              >
                Обновить
              </button>
              <button
                onClick={handleDelete}
                className="btn btn-danger"
                type="button"
              >
                Удалить
              </button>
            </div>
          </div>
        </div>
      </div>
      <PixelModal
        setPixels={setPixels}
        id={_id}
        mode={mode}
        handleClose={handleClose}
        show={show}
      />
    </div>
  );
};

export default PixelItem;
