import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Avatar, message, Upload } from 'antd';
import { UserOutlined, PlusOutlined } from '@ant-design/icons';

import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';
import { useSelector } from 'react-redux';

const { VITE_URL } = import.meta.env;

// console.log(VITE_URL);


const CleanerPhoto = () => {
  const [ imageUrl, setimageUrl ] = useState('');

  const cleanerId = useSelector((state) => state.authSlice.cleaner.id);

  useEffect(() => {
    const getUserImage = async () => {
      try {
        const response = await fetch(`${VITE_URL}cleaner/info`,
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
          });
        const result = await response.json();
        setimageUrl(result.img);
      } catch (error) {
        console.log(error);
      }

    };

    getUserImage();
  }, []);

  // console.log('CLEANER IMG', cleanerImg);
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    // Perform actions with the selected file
    console.log('Selected file:', file);
    const formData = new FormData();
    formData.append('image', file);
    try {
      const response = await axios.post(
        `${VITE_URL}cleaner/updatePhoto/${cleanerId}`,
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        },
      );
      setimageUrl(response.data.name);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {imageUrl ?
        <Avatar size={150} src={`http://localhost:3500/uploads/${imageUrl}`}/>
        :
        <Avatar size={150} icon={<UserOutlined/>}/>
      }
      <input
        type="file"
        id="upload-photo"
        accept="image/*"
        onChange={handleFileChange}
      />
    </>
  );
};

export default CleanerPhoto;
