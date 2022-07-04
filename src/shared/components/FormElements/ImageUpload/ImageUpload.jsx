import React, { useEffect, useState } from 'react'
import { useRef } from 'react'
import Button from '../Button/Button'
import './ImageUpload.css'
const ImageUpload = (props) => {
    // console.log(props.center);
    const [file,setFile] = useState();
    const [isValid,setIsValid] = useState(false);
    const [previewImage, setPreviewImage] = useState(''); 

    const imagePickerRef = useRef();
    const pickImageHandler = ()=> {
        imagePickerRef.current.click();
    }

    useEffect(() => {
        if(!file){
            return;
        }
        const fileReader = new FileReader();
        fileReader.onload = ()=> {
            setPreviewImage(fileReader.result);
        }
        fileReader.readAsDataURL(file);
    }, [file])

    const pickedImageHandler = (e)=> {
        console.log(imagePickerRef.current);
        let fileIsValid;
        let pickedFile;
        if(e.target.files && e.target.files.length === 1){
            pickedFile = e.target.files[0];
            setFile(pickedFile);
            setIsValid(true);
            fileIsValid = true;
        } else {
            setIsValid(false)
            fileIsValid = false;
        }
        props.onInput(props.id, pickedFile, fileIsValid);
    }
  return (
    <div className='form-control'>
        <input type='file' style={{display:"none"}} accept='.jpg,.png,.jpeg' id={props.id} ref={imagePickerRef} onChange={pickedImageHandler}/>
        <div className={`image-upload ${props.center && 'center'}`}>
            <div className='image-upload__preview'>
                {previewImage && <img src= {previewImage} alt='preview'/>}
                {!previewImage && <p>Please select an image</p>}
            </div>
            <Button type='button' onClick={pickImageHandler}>Upload Image</Button>
        </div>
        {!isValid && <p>{props.error}</p>}
    </div>
  )
}

export default ImageUpload