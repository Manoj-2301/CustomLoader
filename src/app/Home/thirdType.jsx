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
        // const id = Math.floor(Math.random() * 1000) + 1;
        setLoading(true)
        const updatedFiles = acceptedFiles.map(file => Object.assign(file, {
            preview: URL.createObjectURL(file),
            id: Math.floor(Math.random() * 1000) + 1,
        }));
        setReject(rejectedFiles)

        setTimeout(() => {
            setFiles(Files => [...Files, ...updatedFiles]);
            setLoading(false)
        }, 1000);
        console.log(acceptedFiles)
        return;
        // console.log(setFiles)
    }, [])

    const Delete = (remove) => {
        setFiles(files.filter((file) => file.id !== remove.id));
        console.log(remove,"deleted")
    };

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
                wrong={Delete}               
                onDropFiles={onDrop}
                width={200}
                height={200}
                icon={<i className="fi fi-br-plus"></i>}
                loading={loading}
                reject={reject}
                files={files}
                wrongIcon={<i className="fi fi-br-cross-small"></i>}
                Style={{
                    container: "main_box",
                    uploaderbox: "uploaderbox",
                    loader: "loaders",
                    reject_file: "reject",
                    error_list: 'error_list',
                    error_message: 'error_message',
                    accepted_list: "acccepted_list",
                    image_accepted: "image_accepted",
                    side_by_side: "side",
                    wrong: "wrong"
                }}
            />

        </form>
    );
};

export default MyForm;
