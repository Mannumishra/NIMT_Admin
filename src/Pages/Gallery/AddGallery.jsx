import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddGallery = () => {
    const [formData, setFormData] = useState({
        image: null,
        showinHomePage: "False", // Default value as string
    });
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    // Handle input changes for file and checkbox
    const handleChange = (e) => {
        const { name, type, checked, files } = e.target;
        if (type === 'file') {
            setFormData((prevData) => ({
                ...prevData,
                [name]: files[0], // Store the file object
            }));
        } else if (type === 'checkbox') {
            // Correctly handle the checkbox state
            setFormData((prevData) => ({
                ...prevData,
                [name]: checked ? "True" : "False", // Store as string "True" or "False"
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            // Prepare form data for upload
            const data = new FormData();
            data.append('image', formData.image);
            data.append('showinHomePage', formData.showinHomePage);

            // Send data to the backend
            const response = await axios.post('http://localhost:8000/api/create-gallery', data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (response.status === 201) {
                toast.success('Gallery image added successfully');
                setIsLoading(false);
                navigate('/all-gallery'); // Redirect after success
            }
        } catch (error) {
            console.error(error);
            toast.error('Failed to add gallery image');
            setIsLoading(false);
        }
    };

    return (
        <>
            <ToastContainer />
            <div className="bread">
                <div className="head">
                    <h4>Add Gallery</h4>
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
                            required
                        />
                    </div>

                    {/* Checkbox for showinHomePage */}
                    <div className="col-md-6 mt-5">
                        <div className="form-check">
                            <input
                                type="checkbox"
                                name="showinHomePage"
                                className="form-check-input"
                                id="showinHomePage"
                                checked={formData.showinHomePage === "True"} // Check if string is "True"
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
                            className={`${isLoading ? 'not-allowed' : 'allowed'}`}
                        >
                            {isLoading ? "Please Wait..." : "Add Gallery"}
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default AddGallery;
