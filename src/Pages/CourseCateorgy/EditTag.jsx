import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EditTag = () => {
    const { name } = useParams();
    const navigate = useNavigate();
    const [courseCategoryName, setCourseCategoryName] = useState('');
    const [btnLoading, setBtnLoading] = useState(false);

    const fetchCourseCategory = async () => {
        try {
            console.log("Fetching category for:", name); // Debugging log
            const response = await axios.get(`https://ins.api.digiindiasolutions.com/api/get-single-course-category/${name}`);
            setCourseCategoryName(response.data.data.courseCategoryName); 
        } catch (error) {
            console.error(error);
            toast.error("Failed to fetch course category");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setBtnLoading(true);
        try {
            await axios.put(`https://ins.api.digiindiasolutions.com/api/update-course-category/${name}`, {
                courseCategoryName,
            });
            toast.success("Course category updated successfully");
            navigate('/all-tags');
        } catch (error) {
            console.error(error);
            toast.error("Failed to update course category");
        } finally {
            setBtnLoading(false);
        }
    };

    useEffect(() => {
        fetchCourseCategory();
    }, [name]);

    return (
        <>
            <ToastContainer />
            <div className="bread">
                <div className="head">
                    <h4>Edit Course Category</h4>
                </div>
                <div className="links">
                    <Link to="/all-tags" className="add-new">Back <i className="fa-regular fa-circle-left"></i></Link>
                </div>
            </div>

            <div className="d-form">
                <form className="row g-3" onSubmit={handleSubmit}>
                    <div className="col-md-9">
                        <label htmlFor="title" className="form-label">Course Category Name</label>
                        <input
                            type="text"
                            name='courseCategoryName'
                            className="form-control"
                            id="title"
                            value={courseCategoryName}
                            onChange={(e) => setCourseCategoryName(e.target.value)}
                        />
                    </div>
                    <div className="col-md-3 text-center mt-5">
                        <button
                            type="submit"
                            className={`${btnLoading ? 'not-allowed' : 'allowed'}`}
                            disabled={btnLoading}
                        >
                            {btnLoading ? "Please Wait..." : "Update Course Category"}
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default EditTag;
