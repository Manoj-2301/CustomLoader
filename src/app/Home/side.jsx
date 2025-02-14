"use client"
import React, { useState, useCallback } from 'react';
import { useForm, Controller } from 'react-hook-form';
import SideBySide from '../Component/ImageWithCard/imageWthCard'
import './style.scss'

const MyForm = () => {
  const { control, handleSubmit, formState: { errors } } = useForm();

  const [files, setFiles] = useState([]);
  const [reject, setReject] = useState([])
  const [loading, setLoading] = useState(false)

  const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
    const id = Math.floor(Math.random() * 1000) + 1;
    setLoading(true)
    const updatedFiles = acceptedFiles.map(file => Object.assign(file, {
      preview: URL.createObjectURL(file),
      id: id
    }));
    setFiles(prevFiles => [...prevFiles, ...updatedFiles]);
    setReject(rejectedFiles)

    setTimeout(() => {
      setLoading(false)
    }, 10000);
    console.log(acceptedFiles)
    // console.log(setFiles)
  }, [])

  const handleRemoveFile = (remove) => {
    setFiles( files.filter((file) => file.id !== remove.id));
    // console.log(man)
  };


  // const onSubmit = (data) => {
  //   console.log(data);
  // };

  return (
   
      <SideBySide
        name="file"
        type={'file'}
        control={control}
        maxSize={1 * 1024 * 1024}
        maxFiles={5}
        dropActiveText={"Drop here"}
        dropText={"Drag and Drop"}
        onDropFiles={onDrop}
        width={50}
        height={50}
        icon={"❤️"}
        rejectedIcon={"🥲"}
        onClick={handleRemoveFile}
        loading={loading}
        reject={reject}
        files={files}
        iconDownload={<i className="fi fi-br-down-to-line"></i>}
        iconRemove={<i className="fi fi-rs-trash"></i>}
        Style={{
          uploaderbox: "container",
          loader: "loader",
          reject_file: "reject",
          error_list: 'error_list',
          error_message: 'error_message',
          accepted_list: "accepted_list",
          accept_file: "accept_file",
          image: "image",
          upload: "upload",
          uploading_file: "uploading_file",
          option: "option",
          download: "download",
          iconBorder: "iconBorder",
          remove: "remove",
          sad: "sad",
          rejected_sad: 'rejected_sad'
        }}
      />
      
  );
};

export default MyForm;
