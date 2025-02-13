'use client'
import React from 'react';    
import { Controller } from "react-hook-form";
import { useDropzone } from 'react-dropzone';
import Image from 'next/image';

const Preview = ({
    name,
    control,
    onDropFiles,
    maxSize,
    acceptedFileTypes,
    dropText,
    dropActiveText,
    Style,maxFiles,
    width, height,type,files,
}) => {
    const { getRootProps, getInputProps, isDragActive, fileRejections } = useDropzone({
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
                    <div className={`${Style.Container}`}>
                        <div {...getRootProps()} className={`${Style.uploaderbox}`}>
                            <input {...getInputProps()}type={type}/>
                            {
                                isDragActive
                                    ? <p>{dropActiveText}</p>
                                    : <p>{dropText}</p>
                            }
                        </div>

                        <div>
                            <h4>Files:</h4>
                            <ul className={`${Style.accepted_img}`}>
                                {files.map(file => (
                                    <li key={file.path}>
                                        <Image
                                            src={file.preview}
                                            alt={file.name}
                                            width={width}
                                            height={height}
                                            onLoad={() => {
                                                URL.revokeObjectURL(file.preview);
                                            }}
                                            className="cas"
                                        />
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div style={{ color: 'red' }}>
                            <h4>Rejected Files:</h4>
                            <ul>
                                {fileRejections.map(({ file, errors }) => (
                                    <li key={file.path}>
                                        <Image
                                            src={file.preview }
                                            alt={file.name}
                                            width={width}
                                            height={height}
                                            onLoad={() => {
                                                URL.revokeObjectURL(file.preview);
                                            }}
                                            className="cas"
                                        />
                                        <ul>
                                            {errors.map(e => (
                                                <li key={e.code}>{e.message}</li>
                                            ))}
                                        </ul>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                );
            }}
        />
    );
}

export default Preview;
