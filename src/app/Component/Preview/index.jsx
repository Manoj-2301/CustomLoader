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
    dropHeading,
    loading,
    Style, maxFiles,
    width, height, type, files,
    icon,
    iconType,
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
                // console.log(field)
                return (
                    <div className={`${Style.Container}`}>
                        <div {...getRootProps()} className={`${Style.uploaderbox}`}>
                            <input {...getInputProps()} type={type} />
                            {loading ? (
                                <div className='loading'>
                                    <span className={`${Style.loader}`}></span>
                                    <p className={`${Style.upload}`}>Uploading file...</p>
                                    <p className={`${Style.cancelBtn}`}>
                                        {Cancel}
                                    </p>
                                </div>
                            ) : isDragAccept ? (
                                <div className={`${Style.drop}`}>
                                    <span>{icon}</span>
                                    <p>{dropActiveText}</p>
                                </div>
                            ) : (
                                <div className={`${Style.drop_title}`}>
                                    {iconType && (<span>{iconType}</span>)}
                                    <p className={`${Style.drop_sub}`}>{dropHeading}</p>
                                    <p className={`${Style.drop_sub_em}`}>{dropText}</p>
                                </div>
                            )}
                        </div>
                        <ul className='image_list'>
                            {files.map(file => (
                                <li key={file.id} className='side_by_side'>
                                    <Image
                                        src={file.preview}
                                        alt={file.name}
                                        onLoad={() => { URL.revokeObjectURL(file.preview) }}
                                        width={width}
                                        height={height}
                                        className={`${Style.image_accepted}`}
                                    />
                                    {/* {file.name} <p> Uploaded successfully <i className="fi fi-ss-check-circle"></i></p> */}
                                </li>
                            ))}
                        </ul>

                        <ul className={`${Style.reject_file}`} >
                            {reject.map(({ file, errors }) => (
                                <li key={file.path} className={`${Style.error_list}`}>
                                    {file.name}                                   
                                    <ul className={`${Style.error_message}`}>
                                        {errors.map(e => <li key={e.code} className='error_msg'>Size is More than 1MB<i className="fi fi-sr-circle-x"></i></li>)}
                                    </ul>
                                </li>
                            ))}
                        </ul>
                    </div>
                );
            }}
        />
    );
}

export default Preview;