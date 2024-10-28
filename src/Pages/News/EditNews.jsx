import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EditNews = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        newsHeading: '',
        newsDetails: '',
        newsDate: '',
        newsImage: null,
        newsShowInhomePage: "False",
    });
    const [currentImage, setCurrentImage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    // Fetch the news item by ID
    useEffect(() => {
        const fetchNewsItem = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/get-single-news/${id}`);
                const { newsHeading, newsDetails, newsDate, newsImage, newsShowInhomePage } = response.data;
                setFormData({ 
                    newsHeading, 
                    newsDetails, 
                    newsDate, 
                    newsImage: null, // Reset the file input
                    newsShowInhomePage: newsShowInhomePage === "True" ? "True" : "False"
                });
                setCurrentImage(newsImage); // Set the existing image for display
            } catch (error) {
                console.error("Error fetching news item", error);
                toast.error("Failed to load news item");
            }
        };
        fetchNewsItem();
    }, [id]);

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
            if (formData.newsImage) {
                data.append('newsImage', formData.newsImage); // Only append if a new image is selected
            }
            data.append('newsShowInhomePage', formData.newsShowInhomePage);

            // Send data to the backend
            await axios.put(`http://localhost:8000/api/update-news/${id}`, data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            toast.success('News item updated successfully');
            navigate('/all-news'); // Redirect after success
        } catch (error) {
            console.error("Error updating news item", error);
            toast.error('Failed to update news item');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <ToastContainer />
            <div className="bread">
                <div className="head">
                    <h4>Edit News</h4>
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
                        />
                        {/* Display the current image */}
                        {currentImage && (
                            <div className="mt-3">
                                <p>Current Image:</p>
                                <img src={currentImage} alt="Current News" style={{ width: '100px', height: '80px' }} />
                            </div>
                        )}
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
                            {isLoading ? "Please Wait..." : "Update News"}
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default EditNews;
