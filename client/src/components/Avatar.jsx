import React, { useContext, useRef, useState } from "react";
import { getGeneralData, uploadAvatar } from "../network/generalData";
import MyContext from "../context/context";

const Avatar = () => {
  const { avatar, setAvatar } = useContext(MyContext);
  const avatarRef = useRef();

  const handleClick = () => {
    avatarRef.current.click();
  };

  const handleUpload = async (e) => {
    const formData = new FormData();
    formData.append("avatar", e.target.files[0]);

    await uploadAvatar(formData).then(() => {
      getGeneralData().then((data) => {
        setAvatar(data.bot_avatar);
      });
    });
  };
  return (
    <div onClick={handleClick} className="bot-avatar">
      <img src={`${process.env.REACT_APP_API_URL}/${avatar}`} alt="" />
      <div>Загрузить новую</div>
      <input onChange={handleUpload} ref={avatarRef} type="file" />
    </div>
  );
};

export default Avatar;
