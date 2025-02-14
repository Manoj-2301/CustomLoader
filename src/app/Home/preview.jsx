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


  const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
    setLoading(true)
    const updatedFiles = acceptedFiles.map(file => Object.assign(file, {
      preview: URL.createObjectURL(file)
    }));

    setTimeout(() => {
      setFiles(prevFiles => [...prevFiles, ...updatedFiles]);
      setLoading(false)
      setReject(rejectedFiles)

    }, 1000);
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
        loading={loading}
        reject={reject}
        files={files}
        Style={{
          uploaderbox: "container",
          loader: "loader",
          reject_file: "reject",
          error_list: 'error_list',
          error_message: 'error_message',
        }}
      />

    </form>
  );
};

export default MyForm;
