import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EditGallery = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        image: null,
        showinHomePage: "False", // Store as string
    });
    const [currentImage, setCurrentImage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    // Fetch the gallery item by ID
    useEffect(() => {
        const fetchGalleryItem = async () => {
            try {
                const response = await axios.get(`https://api.nimteducation.com/api/get-single-gallery/${id}`);
                const { image, showinHomePage } = response.data;
                setFormData({ ...formData, showinHomePage }); // Set the string value directly
                setCurrentImage(image); // Set the existing image for display
            } catch (error) {
                console.error("Error fetching gallery item", error);
                toast.error("Failed to load gallery item");
            }
        };
        fetchGalleryItem();
    }, [id]);

    // Handle form data changes
    const handleChange = (e) => {
        const { name, type, checked, files } = e.target;
        if (type === 'checkbox') {
            setFormData({ ...formData, [name]: checked ? "True" : "False" }); // Store as string
        } else if (type === 'file') {
            setFormData({ ...formData, image: files[0] });
        } else {
            setFormData({ ...formData, [name]: e.target.value });
        }
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const updateData = new FormData();
            updateData.append('showinHomePage', formData.showinHomePage);
            if (formData.image) {
                updateData.append('image', formData.image); // Ensure image file is appended
            }

            // Send update request
            await axios.put(`https://api.nimteducation.com/api/update-gallery/${id}`, updateData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            toast.success("Gallery item updated successfully");
            navigate('/all-gallery');
        } catch (error) {
            console.error("Error updating gallery item", error);
            toast.error("Failed to update gallery item");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <ToastContainer />
            <div className="bread">
                <div className="head">
                    <h4>Edit Gallery</h4>
                </div>
                <div className="links">
                    <Link to="/all-gallery" className="add-new">Back <i className="fa-regular fa-circle-left"></i></Link>
                </div>
            </div>

            <div className="d-form">
                <form className="row g-3" onSubmit={handleSubmit}>
                    <div className="col-md-6">
                        <label htmlFor="image" className="form-label">Gallery Image<sup className='text-danger'>*</sup></label>
                        <input
                            type="file"
                            name="image"
                            className="form-control"
                            id="image"
                            onChange={handleChange}
                        />
                        {/* Display the current image */}
                        {currentImage && (
                            <div className="mt-3">
                                <p>Current Image:</p>
                                <img src={currentImage} alt="Gallery" style={{ width: '100px', height: '80px' }} />
                            </div>
                        )}
                    </div>

                    {/* Checkbox for showinHomePage */}
                    <div className="col-md-6 mt-5">
                        <div className="form-check">
                            <input
                                type="checkbox"
                                name="showinHomePage"
                                className="form-check-input"
                                id="showinHomePage"
                                checked={formData.showinHomePage === "True"} // Compare with string "True"
                                onChange={handleChange}
                            />
                            <label className="form-check-label" htmlFor="showinHomePage">
                                Show in Home Page
                            </label>
                        </div>
                    </div>

                    <div className="col-12 text-center">
                        <button
                            type="submit"
                            disabled={isLoading}
                            className={`${isLoading ? 'not-allowed' : 'submit-btn'}`}
                        >
                            {isLoading ? 'Updating...' : 'Update Gallery'}
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default EditGallery;
