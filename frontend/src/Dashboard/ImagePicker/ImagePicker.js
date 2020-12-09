import React, {useState} from 'react';
import styles from './ImagePicker.module.css';

const ImagePicker = ({submitImage, removeImage, currentImage}) => {
    const [isSubmittingFile, setIsSubmittingFile] = useState(false);


    const handleUploadImageInputChange = async ({target: {files}}) => {
        // check if user chose a file
        if (files.length) {
            // TODO: add a loading state connected to this?
            setIsSubmittingFile(true);

            // use the first file; ignore the rest
            await submitImage(URL.createObjectURL(files[0]));

            setIsSubmittingFile(false);
        }
    }

    const handleUploadImageClick = () => {
        document.getElementById('selectedFile').click();
    }

    const handleRemoveImageClick = () => {
        removeImage(null);
    }

    const isRemoveImageButtonDisabled = currentImage === null ? true : false;

    return (
        <div>
            {currentImage ? (
                <div className={styles.imageWrapper}>
                    <img src={currentImage} alt=""/>
                </div>
            ) : null}
            <div>
                <input 
                    type="file"
                    accept=".png, .jpg, .jpeg, .gif"
                    id="selectedFile"
                    hidden
                    multiple={false}
                    onChange={handleUploadImageInputChange}
                />
                <button
                    onClick={handleUploadImageClick}
                >
                    Upload Image
                </button>
            </div>
            <div>
                <button
                    onClick={handleRemoveImageClick}
                    disabled={isRemoveImageButtonDisabled}
                >
                    Remove Image
                </button>
            </div>
        </div>
    );
};

export default ImagePicker;