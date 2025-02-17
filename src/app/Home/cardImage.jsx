"use client"
import React, { useState, useCallback, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import SideBySide from '../Component/ImageWithCard/imageWthCard'
import './style.scss'
let idCounter = 0;
const MyForm = () => {
  const { control, handleSubmit, formState: { errors } } = useForm();

  const [files, setFiles] = useState([]);
  const [reject, setReject] = useState([])
  const [loading, setLoading] = useState({})

  const onDrop = useCallback((acceptedFiles, rejectedFiles) => {

    const dropFile = acceptedFiles.map(file => {     
      return Object.assign(file, {
        preview: URL.createObjectURL(file),
        id: idCounter++
      });
    });
    setFiles(Files => [...Files, ...dropFile]);
    setReject(rejectedFiles)

    dropFile.forEach((file) => {
      setLoading((load) => ({
        ...load,
        [file.id]: true,
      }));
    });

    dropFile.forEach((file) => {
      setTimeout(() => {
        setLoading((load) => ({
          ...load,
          [file.id]: false,
        }));
      }, 10000);
      console.log(file)
      return;
    });   
    // console.log(acceptedFiles)
  }, [])
  useEffect(() => {    
    return () => files.forEach(file => URL.revokeObjectURL(file.preview));
  }, [files]);

  const handleClick = (file) => {
    if (!file) return; 
    const url = URL.createObjectURL(file);
    const link = document.createElement('a');
    link.href = url;
    link.download = file.name; 
    link.click();
    URL.revokeObjectURL(url);
    console.log(file,"downloaded")
  };

  const handleRemoveFile = (remove) => {
    setFiles(files.filter((file) => file.id !== remove.id));
    URL.revokeObjectURL(remove.preview);
    console.log(remove, 'deleted')
  };

  return (

    <SideBySide
      name="file"
      type={'file'}
      control={control}
      // maxSize={10 * 1024 * 1024}
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
      download={handleClick}
      iconDownload={<i className="fi fi-br-down-to-line"></i>}
      iconRemove={<i className="fi fi-rs-trash"></i>}
      Style={{
        Container:"contain",
        uploaderbox: "container",
        loader: "loaderer",
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
