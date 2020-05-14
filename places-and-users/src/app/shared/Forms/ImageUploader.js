import React, { useRef, useState, useEffect } from "react";
import "./ImageUploader.css";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import Form from "react-bootstrap/Form";

const ImageUploader = (props) => {
  const filePickerRef = useRef();
  const [imageFile, setImageFile] = useState();
  const [previewUrl, setPreviewUrl] = useState();
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    if (!imageFile) {
      return;
    }

    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreviewUrl(fileReader.result);
    };
    fileReader.readAsDataURL(imageFile);
  }, [imageFile]);

  const pickedImageHandler = (event) => {
    // console.log(event.target);
    let pickedFile;
    let fileisValid = isValid;
    if (event.target.files && event.target.files.length === 1) {
      pickedFile = event.target.files[0];
      setImageFile(pickedFile);
      setIsValid(true);
      fileisValid = true;
    } else {
      setIsValid(false);
      fileisValid = false;
    }

    props.onInput(props.id, pickedFile, fileisValid);
  };

  const pickImageHandler = () => {
    filePickerRef.current.click();
  };

  return (
    <div className="d-flex justify-content-center m-2">
      <Card>
        <Card.Body>
          <label>Upload Pic?</label>
          <input
            ref={filePickerRef}
            style={{ display: "none" }}
            id={props.id}
            type="file"
            accept=".jpg,.png,.jpeg"
            onChange={pickedImageHandler}
          />

          <div className="preview">{previewUrl && <img className='h-100 w-100' alt="preview" src={previewUrl}/>}</div>
        </Card.Body>
        <Button
          className="m-2"
          variant="info"
          type="button"
          onClick={pickImageHandler}
        >
          Image Upload
        </Button>
        {!isValid && <p>{props.errorText}</p>}
      </Card>
    </div>
  );
};

export default ImageUploader;
