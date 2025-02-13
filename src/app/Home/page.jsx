"use client"
import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import Preview from '../Component/Preview/index';
import './style.scss'

const MyForm = () => {
  const { control, handleSubmit, formState: { errors } } = useForm();

  const [files, setFiles] = useState([]);

  const onDrop = (acceptedFiles) => {
    setFiles(acceptedFiles.map(file => Object.assign(file, {
      preview: URL.createObjectURL(file)
    })));
  }

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
        dropText={
          "Drag and Drop"
        }
        onDropFiles={onDrop}
        width={100}
        height={100}
        // acceptedFileTypes={['image/jpeg', 'image/*']}
        Style={{
          uploaderbox: "container"
        }}
        files={files}/>
    </form>
  );
};

export default MyForm;
