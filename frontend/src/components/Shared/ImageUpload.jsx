import { useRef, useState } from "react";
import axiosInstance from "../api/axiosInstance"; // your JWT-friendly axios

export default function ImageUpload({ currentUrl, onUpload }) {
    const fileInputRef = useRef();
    const [preview, setPreview] = useState(currentUrl);
    const [loading, setLoading] = useState(false);

    const handleUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append("file", file);

        setLoading(true);
        try {
            const res = await axiosInstance.post("/uploads/upload-image/", formData);
            const newUrl = res.data.img_url;
            setPreview(newUrl);
            onUpload(newUrl); // pass back to parent modal
        } catch (err) {
            console.error("Image upload failed:", err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="relative w-32 h-32 mx-auto cursor-pointer" onClick={() => fileInputRef.current.click()}>
            {loading ? (
                <div className="flex items-center justify-center h-full">Uploading...</div>
            ) : preview ? (
                <img src={preview} alt="Preview" className="object-cover rounded shadow" />
            ) : (
                <div className="border-dashed border-2 border-gray-400 flex items-center justify-center h-full text-sm text-gray-400">
                    Add Image
                </div>
            )}
            <input type="file" ref={fileInputRef} style={{ display: "none" }} onChange={handleUpload} accept="image/*" />
        </div>
    );
}
