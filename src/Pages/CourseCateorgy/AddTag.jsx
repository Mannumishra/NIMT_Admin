import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddTag = () => {
    const [courseCategoryName, setCourseCategoryName] = useState(''); // State for form input
    const [isLoading, setIsLoading] = useState(false); // Loading state for submit button
    const navigate = useNavigate(); // To navigate back after successful addition

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault(); 
        if (!courseCategoryName) {
            toast.error("Course Category Name is required");
            return;
        }
        try {
            setIsLoading(true);
            const response = await axios.post('https://ins.api.digiindiasolutions.com/api/create-course-category', { courseCategoryName });
            if (response.status===200) {
                toast.success(response.data.message);
                setTimeout(() => {
                    navigate('/all-tags');
                }, 2000); 
            }
        } catch (error) {
            console.error(error);
            if (error.response && error.response.data && error.response.data.message) {
                toast.error(error.response.data.message);
            } else {
                toast.error("An error occurred. Please try again.");
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <ToastContainer /> {/* Toast notifications */}
            <div className="bread">
                <div className="head">
                    <h4>Add Course Category</h4>
                </div>
                <div className="links">
                    <Link to="/all-tags" className="add-new">Back <i className="fa-regular fa-circle-left"></i></Link>
                </div>
            </div>

            <div className="d-form">
                <form className="row g-3" onSubmit={handleSubmit}> {/* Form submission handler */}
                    <div className="col-md-9">
                        <label htmlFor="title" className="form-label">Course Category Name</label>
                        <input 
                            type="text"  
                            name="courseCategoryName" 
                            value={courseCategoryName} 
                            onChange={(e) => setCourseCategoryName(e.target.value)} // Handle input change
                            className="form-control" 
                            id="title" 
                        />
                    </div>
                    <div className="col-md-3 mt-5 text-center">
                        <button 
                            type="submit" 
                            disabled={isLoading} 
                            className={`btn btn-primary ${isLoading ? 'not-allowed':'allowed'}`}
                        >
                            {isLoading ? "Please Wait..." : "Add Category"}
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default AddTag;
