"use client"
import React, { useState, useCallback } from 'react';
import { useForm, Controller } from 'react-hook-form';
import './styleTwo.scss'
import SideBySide from '../Component/SideBySide/SideBYSide';

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
        setReject(rejectedFiles)

        setTimeout(() => {
            setFiles(prevFiles => [...prevFiles, ...updatedFiles]);
            setLoading(false)
        }, 1000);
        console.log(acceptedFiles)
        // console.log(setFiles)
    }, [])



    const onSubmit = (data) => {
        console.log(data);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <SideBySide
                name="file"
                type={'file'}
                control={control}
                maxSize={1 * 1024 * 1024}
                // maxFiles={2}
                // dropActiveText={"Drop here"}
                // dropText={"Drag and Drop"}
                onDropFiles={onDrop}
                width={200}
                height={200}
                icon={<i className="fi fi-br-plus"></i>}
                loading={loading}
                reject={reject}
                files={files}
                Style={{
                    container: "main_box",
                    uploaderbox: "container",
                    loader: "loaders",
                    reject_file: "reject",
                    error_list: 'error_list',
                    error_message: 'error_message',
                    accepted_list: "acccepted_list",
                    image_accepted: "image_accepted"
                }}
            />

        </form>
    );
};

export default MyForm;
