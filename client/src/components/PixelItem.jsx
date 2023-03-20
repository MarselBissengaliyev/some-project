import React, { useState } from "react";
import { deletePixel } from "../network/pixel";
import PixelModal from "./modals/PixelModal";

const PixelItem = ({ token, fb_pixel_id, _id, setPixels }) => {
  const [show, setShow] = useState(false);
  const [mode, setMode] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  console.log(_id);
  const handleDelete = async (e) => {
    e.preventDefault();
    await deletePixel(_id).then((data) => {
      setPixels((pixels) =>
        pixels.filter((pixel) => {
          return pixel._id !== _id;
        })
      );
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    console.log("updated");
  };

  return (
    <div className="col">
      <div className="card">
        <div className="card-body">
          <div className="row">
            <div className="col pixel-item">
              <h5>{token}</h5>
              <p>{fb_pixel_id}</p>
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