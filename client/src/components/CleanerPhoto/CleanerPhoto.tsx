import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Avatar, message, Upload, Button, Row } from 'antd';
import { UserOutlined, PlusOutlined } from '@ant-design/icons';
import { UploadOutlined } from '@ant-design/icons';

import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';
import { useSelector } from 'react-redux';

const { VITE_URL } = import.meta.env;
import './CleanerPhoto.css';

// console.log(VITE_URL);

const CleanerPhoto = () => {
  const [imageUrl, setimageUrl] = useState('');

  const cleanerId = useSelector((state) => state.authSlice.cleaner.id);

  useEffect(() => {
    const getUserImage = async () => {
      try {
        const response = await fetch(`${VITE_URL}cleaner/info`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
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
    // console.log(e.target);
    const file = e.target.files[0];
    // Perform actions with the selected file
    // console.log('Selected file:', file);
    const formData = new FormData();
    formData.append('image', file);
    try {
      const response = await axios.post(
        `${VITE_URL}cleaner/updatePhoto/${cleanerId}`,
        formData,
        {
          withCredentials: true,
          headers: { 'Content-Type': 'multipart/form-data' },
        }
      );
      setimageUrl(response.data.name);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {/* <Row> */}
      {imageUrl ? (
        <Avatar size={150} src={`http://localhost:3500/uploads/${imageUrl}`} />
      ) : (
        <Avatar size={150} icon={<UserOutlined />} />
      )}
      <div
        style={{
          // paddingLeft: '45px',
          // paddingLeft: '45px',
          marginTop: '15px',
          paddingLeft: '25px',
          overflow: 'hidden',
          width: 150,
        }}
      >
        <input
          type="file"
          name="upload-photo"
          id="upload-photo"
          accept="image/*"
          onChange={handleFileChange}
          // value="wfwef"
        />
      </div>
      {/* </Row> */}
    </>
  );
};

export default CleanerPhoto;
