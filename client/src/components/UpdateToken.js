import React from "react";
import { updateGeneralDataToken } from "../network/generalData";

const UpdateToken = ({ token, setToken }) => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateGeneralDataToken(token);
  };
  return (
    <div className="card">
      <div className="card-body">
        <label>Токен бота</label>
        <input
          type="text"
          value={token}
          onChange={(e) => setToken(e.target.value)}
        />
      </div>
      <div className="card-footer">
        <button
          onClick={handleSubmit}
          className="btn btn-primary mt-3"
          type="submit"
        >
          Обновить
        </button>
      </div>
    </div>
  );
};

export default UpdateToken;
