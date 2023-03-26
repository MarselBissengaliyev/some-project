import React, { useContext, useRef } from "react";
import MyContext from "../context/context";
import { getGeneralData, uploadAvatar } from "../network/generalData";

const Avatar = () => {
  const { avatar, setAvatar } = useContext(MyContext);
  const avatarRef = useRef();
  const { setLoading, setError } = useContext(MyContext);

  const handleClick = () => {
    avatarRef.current.click();
  };

  /*
   ** Upload Avatar function
   */
  const handleUpload = async (e) => {
    setLoading(true);
    const formData = new FormData();
    formData.append("avatar", e.target.files[0]);

    async function fetchUploadAvatar() {
      try {
        await uploadAvatar(formData);

        const data = await getGeneralData();
        setAvatar(data.bot_avatar);
      } catch (error) {
        setError(error.message);
        console.error(error);
      }
    }

    if (formData.get('avatar')) {
      fetchUploadAvatar();
    }

    setLoading(false);
  };
  return (
    <div onClick={handleClick} className="bot-avatar">
      {avatar && (
        <img src={`${process.env.REACT_APP_API_URL}/${avatar}`} alt="" />
      )}
      <div>Загрузить новую</div>
      <input onChange={handleUpload} ref={avatarRef} type="file" />
    </div>
  );
};

export default Avatar;
