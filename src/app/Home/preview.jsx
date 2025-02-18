"use client"
import React, { useState, useCallback } from 'react';
import { useForm, Controller } from 'react-hook-form';
import Preview from '../Component/Preview/index';
import './style.scss'

const MyForm = () => {
  const { control, handleSubmit, formState: { errors } } = useForm();

  const [files, setFiles] = useState([]);
  const [reject, setReject] = useState([])
  const [loading, setLoading] = useState(false)

  let uniqueIdCounter = 0;
  const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
    setLoading(true)
    const updatedFiles = acceptedFiles.map(file => Object.assign(file, {
      preview: URL.createObjectURL(file),
      id: uniqueIdCounter++
    }));

    setTimeout(() => {
      setFiles(prevFiles => [...prevFiles, ...updatedFiles]);
      setLoading(false)
      setReject(rejectedFiles)
    }, 2000);
    console.log(acceptedFiles)
  }, [])


  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Preview
        name="file"
        type={'file'}
        control={control}
        maxSize={1 * 1024 * 1024}
        maxFiles={2}
        dropActiveText={"Drop here"}
        dropText={"Drag and Drop"}
        onDropFiles={onDrop}
        width={200}
        height={200}
        icon={"❤️"}
        acceptedFileTypes={{ 'image/*': ['.png', '.avif'] }}
        loading={loading}
        reject={reject}
        files={files}
        // message={"more than 1mb"}
        Style={{
          uploaderbox: "containers",
          loader: "loader",
          reject_file: "reject",
          error_list: 'error_list',
          error_message: 'error_message',
          image_accepted: "image_accepted"
        }}
      />

    </form>
  );
};

export default MyForm;
