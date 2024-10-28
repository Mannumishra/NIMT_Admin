import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddNews = () => {
    const [formData, setFormData] = useState({
        newsHeading: '',
        newsDetails: '',
        newsDate: '',
        newsImage: null,
        newsShowInhomePage: "False",
    });
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    // Handle input changes for text fields, file, and checkbox
    const handleChange = (e) => {
        const { name, value, type, checked, files } = e.target;
        if (type === 'file') {
            setFormData((prevData) => ({
                ...prevData,
                newsImage: files[0],
            }));
        } else if (type === 'checkbox') {
            setFormData((prevData) => ({
                ...prevData,
                [name]: checked ? "True" : "False",
            }));
        } else {
            setFormData((prevData) => ({
                ...prevData,
                [name]: value,
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            // Prepare form data for upload
            const data = new FormData();
            data.append('newsHeading', formData.newsHeading);
            data.append('newsDetails', formData.newsDetails);
            data.append('newsDate', formData.newsDate);
            data.append('newsImage', formData.newsImage);
            data.append('newsShowInhomePage', formData.newsShowInhomePage);

            // Send data to the backend
            const response = await axios.post('https://api.nimteducation.com/api/create-news', data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (response.status === 201) {
                toast.success('News item added successfully');
                setIsLoading(false);
                navigate('/all-news'); // Redirect after success
            }
        } catch (error) {
            console.error(error);
            toast.error('Failed to add news item');
            setIsLoading(false);
        }
    };

    return (
        <>
            <ToastContainer />
            <div className="bread">
                <div className="head">
                    <h4>Add News</h4>
                </div>
                <div className="links">
                    <Link to="/all-news" className="add-new">Back <i className="fa-regular fa-circle-left"></i></Link>
                </div>
            </div>

            <div className="d-form">
                <form className="row g-3" onSubmit={handleSubmit}>
                    <div className="col-md-6">
                        <label htmlFor="newsHeading" className="form-label">News Heading<sup className='text-danger'>*</sup></label>
                        <input
                            type="text"
                            name="newsHeading"
                            className="form-control"
                            id="newsHeading"
                            value={formData.newsHeading}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="col-md-6">
                        <label htmlFor="newsDate" className="form-label">News Date<sup className='text-danger'>*</sup></label>
                        <input
                            type="date"
                            name="newsDate"
                            className="form-control"
                            id="newsDate"
                            value={formData.newsDate}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="col-md-12">
                        <label htmlFor="newsDetails" className="form-label">News Details<sup className='text-danger'>*</sup></label>
                        <textarea
                            name="newsDetails"
                            className="form-control"
                            id="newsDetails"
                            rows="4"
                            value={formData.newsDetails}
                            onChange={handleChange}
                            required
                        ></textarea>
                    </div>

                    <div className="col-md-6">
                        <label htmlFor="newsImage" className="form-label">News Image<sup className='text-danger'>*</sup></label>
                        <input
                            type="file"
                            name="newsImage"
                            className="form-control"
                            id="newsImage"
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {/* Checkbox for showing on homepage */}
                    <div className="col-md-6 mt-4">
                        <div className="form-check">
                            <input
                                type="checkbox"
                                name="newsShowInhomePage"
                                className="form-check-input"
                                id="newsShowInhomePage"
                                checked={formData.newsShowInhomePage === "True"}
                                onChange={handleChange}
                            />
                            <label className="form-check-label" htmlFor="newsShowInhomePage">
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
                            {isLoading ? "Please Wait..." : "Add News"}
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default AddNews;
