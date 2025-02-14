'use client'
import React from 'react';
import { Controller } from "react-hook-form";
import { useDropzone } from 'react-dropzone';
import Image from 'next/image';

const SideBySide = ({
    name,
    control,
    onDropFiles,
    maxSize,
    acceptedFileTypes,
    dropText,
    dropActiveText,
    dropHeading,
    loading,
    Style, maxFiles,
    width, height, type, files,
    icon,
    Cancel,
    reject
}) => {
    const { getRootProps, getInputProps, isDragAccept } = useDropzone({
        onDrop: onDropFiles,
        maxSize,
        maxFiles,
        accept: acceptedFileTypes,
    });

    return (
        <Controller
            control={control}
            name={name}
            render={({ field, fieldState: { error } }) => {
                return (
                    <div className={`${Style.container}`} >
                        {/* Uploaded Images */}
                        <ul className={`${Style.accepted_list}`}>
                            {files.map(file => (
                                <li key={file.path} className='side_by_side' style={{ marginBottom: '10px' }}>
                                    <Image
                                        src={file.preview}
                                        alt={file.name}
                                        onLoad={() => { URL.revokeObjectURL(file.preview) }}
                                        width={width}
                                        height={height}
                                        className={`${Style.image_accepted}`}
                                    />
                                </li>
                            ))}
                        </ul>
                        {/* Drag and Drop Area */}
                        <div {...getRootProps()} className={`${Style.uploaderbox}`} >
                            <input {...getInputProps()} type={type} />
                            {loading ? (
                                <div className='loading'>
                                    <span className={`${Style.loader}`}></span>
                                    <p className={`${Style.upload}`}></p>
                                    <p className={`${Style.cancelBtn}`}>{Cancel}</p>
                                </div>
                            ) : isDragAccept ? (
                                <div className={`${Style.drop}`} >
                                    <span>{icon}</span>
                                    <p>{dropActiveText}</p>
                                </div>
                            ) : (
                                <div className={`${Style.drop_title}`}>
                                    <span>{icon}</span>
                                    <p className={`${Style.drop_sub}`}>{dropHeading}</p>
                                    <p className={`${Style.drop_sub_em}`}>{dropText}</p>
                                </div>
                            )}
                        </div>

                    </div>
                );
            }}
        />
    );
}

export default SideBySide;
