import { useState, useRef } from "react";
import { deleteImage, uploadImage } from "../network/img";

const UploadAvatar = ({ avatar, setAvatar }) => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleChange = async (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleClick = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("avatar", selectedFile);

    await uploadImage(formData)
      .then((res) => setAvatar(res))
      .catch((err) => console.error(err));
  };

  const handleDelete = async (e) => {
    await deleteImage()
      .then(() => setAvatar(""))
      .catch((err) => console.error(err));
  };

  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">Аватар бота</h5>
        {!avatar && (
          <input
            onChange={handleChange}
            type="file"
            accept="image/*,.png,.jpg,.jpeg"
            size={512000}
          />
        )}
        {avatar && (
          <button onClick={handleDelete} className="btn btn-danger">
            Удалить
          </button>
        )}
      </div>
      <div className="card-footer">
        {selectedFile && !avatar && (
          <>
            <button onClick={handleClick} className="btn btn-primary mt-3">
              Отправить
            </button>
          </>
        )}
        {avatar && (
          <>
            <a
              href={`${process.env.REACT_APP_API_URL}/${avatar}`}
              target="_blank"
              rel="noreferrer"
            >
              <img
                src={`${process.env.REACT_APP_API_URL}/${avatar}`}
                alt="avatar"
              />
            </a>
          </>
        )}
      </div>
    </div>
  );
};

export default UploadAvatar;
