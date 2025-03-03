import React, { useState } from "react";
import axios from "axios";
import classes from "./Modal.module.css";

const API_KEY = "live_WJ2hod17ALfuQ2nhGyKdY3NOy5jWIpKQlszDM6bu4YmUaDk9asjkld5EbHR0nvlk"; // Move to .env for security

const Modal = ({ isOpen, onClose, onImageUploaded }) => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [successMessage, setSuccessMessage] = useState(""); // New state for success message

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedImage(file);
            setPreviewUrl(URL.createObjectURL(file));
            setSuccessMessage(""); // Reset message when a new image is selected
        }
    };

    const handleUpload = async () => {
        if (!selectedImage) return;

        setUploading(true);
        setSuccessMessage(""); // Clear previous messages
        const formData = new FormData();
        formData.append("file", selectedImage);
        formData.append("sub_id", "your-user-id"); // Optional: Track uploads per user

        try {
            const response = await axios.post(
                "https://api.thedogapi.com/v1/images/upload",
                formData,
                {
                    headers: { 
                        "Content-Type": "multipart/form-data", 
                        "x-api-key": API_KEY 
                    },
                }
            );

            console.log("Upload success:", response.data);
            setSuccessMessage("✅ Image uploaded successfully! 🎉"); // Show success message
            onImageUploaded(); // Notify Gallery to refresh images
        } catch (error) {
            console.error("Upload failed:", error);
            setSuccessMessage("❌ Upload failed. Please try again.");
        } finally {
            setUploading(false);
        }
    };

    const handleRemoveImage = () => {
        setSelectedImage(null);
        setPreviewUrl(null);
        setSuccessMessage(""); // Reset success message
    };

    if (!isOpen) return null;

    return (
        <div className={classes["modal-overlay"]} onClick={onClose}>
            <div className={classes["modal-content"]} onClick={(e) => e.stopPropagation()}>
                <button className={classes["close-modal"]} onClick={onClose}>&times;</button>
                <h2>Upload an Image</h2>

                <input type="file" accept="image/*" onChange={handleImageChange} />

                {previewUrl && (
                    <div className={classes["image-preview"]}>
                        <h3>Preview:</h3>
                        <img src={previewUrl} alt="Preview" />
                        <button className={classes["remove-image"]} onClick={handleRemoveImage}>Remove</button>
                    </div>
                )}

                <button className="upload-btn" onClick={handleUpload} disabled={!selectedImage || uploading}>
                    {uploading ? "Uploading..." : "Upload Image"}
                </button>

                {/* Success or error message - stays even after upload */}
                {successMessage && <p className={classes["upload-message"]}>{successMessage}</p>}
            </div>
        </div>
    );
};

export default Modal;
