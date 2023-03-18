import React, { useEffect, useState } from "react";
import { createPixel, deletePixel, getPixel } from "../network/pixel";

const Pixels = () => {
  const [pixelId, setPixelId] = useState("");
  const [token, setToken] = useState("");
  const [isCreated, setCreated] = useState(false);

  useEffect(() => {
    getPixel()
      .then((data) => {
        setPixelId(data.fb_pixel_id);
        setToken(data.token);
        setCreated(true);
      })
      .catch((error) => {
        console.log(error);
        console.error("Suka");
        setCreated(false);
      });
  }, []);

  const handleDelete = async (e) => {
    e.preventDefault();
    await deletePixel()
      .then(() => {
        isCreated(false);
        token("");
        pixelId("");
      })
      .catch((err) => {
        console.error(err);
        setCreated(false);
      });
  };

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
    <>
      <hr />
      <h2 className="text-center">Вкладка Пиксели</h2>
      <div className="container">
        <div className="row mb-3">
          <div className="col">
            <div className="card">
              <div className="card-body">
                <div className="row">
                  {isCreated && (
                    <div className="row">
                      <div className="col">
                        <h5>Пиксель ID:</h5>
                        <p>{pixelId}</p>
                      </div>
                      <div className="col">
                        <h5>TOKEN:</h5>
                        <p>{token}</p>
                      </div>
                      <div>
                        <button
                          onClick={handleDelete}
                          className="btn btn-danger"
                          type="button"
                        >
                          Удалить
                        </button>
                      </div>
                    </div>
                  )}
                  {!isCreated && (
                    <>
                      <div className="col">
                        <label>Пиксель ID</label>
                        <input
                          type="text"
                          onChange={(e) => setPixelId(e.target.value)}
                        />
                      </div>
                      <div className="col">
                        <label>TOKEN</label>
                        <input
                          type="text"
                          onChange={(e) => setToken(e.target.value)}
                        />
                      </div>
                      <div className="mt-3">
                        <button
                          className="btn btn-primary"
                          onClick={handleCreate}
                          type="button"
                        >
                          Создать
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Pixels;
