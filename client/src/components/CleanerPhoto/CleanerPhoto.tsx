import axios from "axios";
import React, { useState } from 'react';
import { Avatar, message, Upload } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';

import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';
import { useSelector } from "react-redux";


const { VITE_URL } = import.meta.env;

console.log(VITE_URL);

const getBase64 = (img: RcFile, callback: (url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result as string));
  reader.readAsDataURL(img);
};


const CleanerPhoto = () => {
  const [ loading, setLoading ] = useState(false);
  const [ imageUrl, setImageUrl ] = useState<string>();
  const [ file, setFile ] = useState();

  const cleanerId = useSelector((state) => state.authSlice.cleaner.id);
  const cleanerImg = useSelector((state) => state.authSlice.cleaner.img);


  const beforeUpload = (file: RcFile) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
  };

  const sendFile = async (file) => {
    const formData = new FormData();
    formData.append("image", file.originFileObj);
    console.log('FILE', file.originFileObj);
    console.log(formData);
    try {
      const res = await axios.post(
        `${VITE_URL}cleaner/updatePhoto/${cleanerId}`,
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        },
      );
      const result = await res.json();
      return result;
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange: UploadProps['onChange'] = (info: UploadChangeParam<UploadFile>) => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj as RcFile, (url) => {
        setLoading(false);
        setImageUrl(url);
        sendFile(info.file);
      });
    }
  };

  // const submit = async (e) => {
  //   e.preventDefault();
  //   const formData = new FormData();
  //   formData.append("avatar", file);
  //   const val = Object.fromEntries(formData.entries());
  //   console.log(val);
  //   console.log(axios);
  //   try {
  //     const res = await axios.post(
  //       `${VITE_URL}cleaner/updatePhoto`,
  //       formData,
  //       {
  //         withCredentials: true,
  //         headers: { "Content-Type": "multipart/form-data" },
  //       },
  //     );
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined/> : <PlusOutlined/>}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  return (
    <>
      {/*<form onSubmit={submit} enctype="multipart/form-data">*/}
      {/*  <input*/}
      {/*    filename={file}*/}
      {/*    onChange={(e) => setFile(e.target.files[0])}*/}
      {/*    type="file"*/}
      {/*    accept="image/*"*/}
      {/*  ></input>*/}
      {/*  <button type="submit">Submit</button>*/}
      {/*</form>*/}

      {cleanerImg ?
        <Avatar size={150} src={`http://localhost:3500/uploads/${cleanerImg}`}/>
        :

        <Upload
          name="avatar"
          listType="picture-circle"
          className="avatar-uploader"
          showUploadList={false}
          action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
          beforeUpload={beforeUpload}
          onChange={handleChange}
        >
          {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }}/> : uploadButton}
        </Upload>
      }


    </>
  );
};

export default CleanerPhoto;

