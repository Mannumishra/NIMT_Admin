import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddCategory = () => {
    const [categories, setCategories] = useState([]);
    const [formData, setFormData] = useState({
        courseCtegory: '',
        courseName: '',
        courseTopic: [''],  // Start with one empty topic
        courseDuration: '',
        courseEnrollment: '',
        image: null,
        showinHomePage: false, // New field for checkbox
    });
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    // Fetch categories from the API
    const fetchCategories = async () => {
        try {
            const response = await axios.get('https://ins.api.digiindiasolutions.com/api/get-course-category');
            setCategories(response.data.data); // Adjust based on your API response
        } catch (error) {
            console.error('Error fetching categories:', error);
            toast.error('Failed to load categories.');
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    // Handle input changes
    const handleChange = (e) => {
        const { name, value, type, files, dataset, checked } = e.target;
        if (type === 'file') {
            setFormData({ ...formData, image: files[0] });
        } else {
            if (name === 'courseTopic') {
                const updatedTopics = [...formData.courseTopic];
                updatedTopics[dataset.index] = value;
                setFormData({ ...formData, courseTopic: updatedTopics });
            } else if (name === 'showinHomePage') {
                setFormData({ ...formData, [name]: checked }); // Set checkbox value
            } else {
                setFormData({ ...formData, [name]: value });
            }
        }
    };

    // Add a new topic input
    const handleAddTopic = () => {
        setFormData({ ...formData, courseTopic: [...formData.courseTopic, ''] });
    };

    // Remove a topic input
    const handleRemoveTopic = (index) => {
        if (formData.courseTopic.length > 1) {
            const updatedTopics = formData.courseTopic.filter((_, i) => i !== index);
            setFormData({ ...formData, courseTopic: updatedTopics });
        }
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        // Create FormData instance
        const formDataToSend = new FormData();

        // Append basic fields
        for (const key in formData) {
            if (key === 'courseTopic') {
                // Append each topic separately
                formData.courseTopic.forEach(topic => {
                    formDataToSend.append('courseTopic[]', topic); // Use a different key to handle multiple topics
                });
            } else {
                formDataToSend.append(key, formData[key]);
            }
        }

        // Send API request
        try {
            await axios.post('https://ins.api.digiindiasolutions.com/api/create-course', formDataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            toast.success('Course added successfully!');
            navigate('/all-category');
        } catch (error) {
            console.error(error);
            toast.error('Error adding course: ' + (error.response?.data?.message || 'An error occurred'));
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <ToastContainer />
            <div className="bread">
                <div className="head">
                    <h4>Add Course</h4>
                </div>
                <div className="links">
                    <Link to="/all-courses" className="add-new">Back <i className="fa-regular fa-circle-left"></i></Link>
                </div>
            </div>

            <div className="d-form">
                <form className="row g-3" onSubmit={handleSubmit}>
                    <div className="col-md-6">
                        <label htmlFor="courseCategoryId" className="form-label">Course Category<sup className='text-danger'>*</sup></label>
                        <select
                            name="courseCtegory"
                            className="form-control"
                            id="courseCategoryId"
                            value={formData.courseCtegory}
                            onChange={handleChange}
                            required
                        >
                            <option value="" disabled>Select a category</option>
                            {categories.map((category) => (
                                <option key={category._id} value={category._id}>
                                    {category.courseCategoryName}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="courseName" className="form-label">Course Name<sup className='text-danger'>*</sup></label>
                        <input
                            type="text"
                            name="courseName"
                            className="form-control"
                            id="courseName"
                            value={formData.courseName}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {formData.courseTopic.map((topic, index) => (
                        <div key={index} className="col-md-3">
                            <label htmlFor={`courseTopic-${index}`} className="form-label">Course Topic {index + 1}<sup className='text-danger'>*</sup></label>
                            <div className="input-group">
                                <input
                                    type="text"
                                    name="courseTopic"
                                    className="form-control"
                                    id={`courseTopic-${index}`}
                                    data-index={index}
                                    value={topic}
                                    onChange={handleChange}
                                    required
                                />
                                {index > 0 && (
                                    <button
                                        type="button"
                                        className="btn btn-danger"
                                        onClick={() => handleRemoveTopic(index)}
                                    >
                                        Remove
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}

                    <div className="col-md-6">
                        <button
                            type="button"
                            className="btn btn-primary mt-4"
                            onClick={handleAddTopic}
                        >
                            Add Another Topic
                        </button>
                    </div>

                    <div className="col-md-6">
                        <label htmlFor="courseDuration" className="form-label">Course Duration (in weeks)<sup className='text-danger'>*</sup></label>
                        <input
                            type="number"
                            name="courseDuration"
                            className="form-control"
                            id="courseDuration"
                            value={formData.courseDuration}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="courseEnrollment" className="form-label">Course Enrollment<sup className='text-danger'>*</sup></label>
                        <input
                            type="number"
                            name="courseEnrollment"
                            className="form-control"
                            id="courseEnrollment"
                            value={formData.courseEnrollment}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="image" className="form-label">Course Image<sup className='text-danger'>*</sup></label>
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
                    <div className="col-md-6">
                        <div className="form-check">
                            <input
                                type="checkbox"
                                name="showinHomePage"
                                className="form-check-input"
                                id="showinHomePage"
                                checked={formData.showinHomePage}
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
                            {isLoading ? "Please Wait..." : "Add Course"}
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default AddCategory;
