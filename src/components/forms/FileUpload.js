import React from 'react';
import { message, Upload } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import Resizer from 'react-image-file-resizer';
import axios from 'axios';
import { useSelector } from 'react-redux';

const FileUpload = ({ fileList, setFileList }) => {
  const { user } = useSelector((state) => ({ ...state }));

  const uploadToCloudinary = ({ file }) => {
    const fileConfig = {
      uid: file.uid,
      name: file.name,
      status: 'uploading',
    };
    setFileList([...fileList, fileConfig]);
    if (file) {
      Resizer.imageFileResizer(
        file,
        720,
        720,
        'JPEG',
        100,
        0,
        (uri) => {
          axios
            .post(
              `${process.env.REACT_APP_API}/upload-images`,
              { image: uri },
              { headers: { authtoken: user.token } }
            )
            .then((res) => {
              const files = fileList.filter((el) => el.uid !== file.uid);
              const newFile = {
                uid: file.uid,
                name: file.name,
                status: 'done',
                thumbUrl: res.data.url,
                public_id: res.data.public_id,
              };
              setFileList([...files, newFile]);
            })
            .catch((err) => {
              const files = fileList.filter((el) => el.uid !== file.uid);
              const newFile = {
                uid: file.uid,
                name: file.name,
                status: 'error',
              };
              setFileList([...files, newFile]);
            });
        },
        'base64'
      );
    }
  };

  const removeHandler = (file) => {
    let deleteElement = {};
    const updated = fileList.filter((el) => {
      if (el.uid === file.uid) {
        deleteElement = el;
        return false;
      }
      return true;
    });
    setFileList(updated);
    if (file.public_id) {
      axios
        .post(
          `${process.env.REACT_APP_API}/remove-images`,
          {
            public_id: file.public_id,
          },
          { headers: { authtoken: user.token } }
        )
        .catch((err) => {
          message.error('Detetion failed');
          setFileList(...fileList, deleteElement);
        });
    }
  };

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  return (
    <>
      <label>Upload images</label>
      <div style={{ border: '1px dashed #eee', padding: '1rem' }}>
        <Upload
          customRequest={uploadToCloudinary}
          fileList={fileList}
          onRemove={removeHandler}
          listType="picture-card"
        >
          {uploadButton}
        </Upload>
      </div>
    </>
  );
};

export default FileUpload;
