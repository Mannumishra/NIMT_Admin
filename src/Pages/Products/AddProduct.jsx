import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import JoditEditor from 'jodit-react';

const AddProduct = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [courseOptions, setCourseOptions] = useState([]);

    const getApiData = async () => {
        try {
            const res = await axios.get("http://localhost:8000/api/get-all-filter-course");
            if (res.status === 200) {
                setCourseOptions(res.data.data);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getApiData();
    }, []);

    const [formData, setFormData] = useState({
        courseName: '',
        introduction: '',
        objectives: '',
        briefContents: '',
        courseProject: '',
        certificate: '',
        audience: '',
        trainingMethodology: '',
        image: null
    });

    

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleImageChange = (e) => {
        setFormData({
            ...formData,
            image: e.target.files[0]
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        const formDataToSend = new FormData();
        for (const key in formData) {
            formDataToSend.append(key, formData[key]);
        }

        try {
            const response = await axios.post('http://localhost:8000/api/create-course-details', formDataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            toast.success('Course details added successfully!');
        } catch (error) {
            toast.error('Error adding course details');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <ToastContainer />
            <div className="bread">
                <div className="head">
                    <h4>Add Course Details</h4>
                </div>
                <div className="links">
                    <Link to="/all-courses" className="add-new">Back <i className="fa-regular fa-circle-left"></i></Link>
                </div>
            </div>

            <div className="d-form">
                <form className="row g-3" onSubmit={handleSubmit}>
                    {/* Course Name */}
                    <div className="col-md-6">
                        <label htmlFor="courseName" className="form-label">Course Name</label>
                        <select
                            name="courseName"
                            value={formData.courseName}
                            onChange={handleChange}
                            className="form-control"
                            id="courseName"
                            required
                        >
                            <option value="" disabled>Select a Course</option>
                            {courseOptions.map((course, index) => (
                                <option key={index} value={course._id}>{course.courseName}</option>
                            ))}
                        </select>
                    </div>

                    {/* Introduction */}
                    <div className="col-12">
                        <label htmlFor="introduction" className="form-label">Introduction</label>
                        <JoditEditor
                            value={formData.introduction}
                            // config={editorConfig}
                            onBlur={(newContent) => setFormData({ ...formData, introduction: newContent })} // Capture content on blur
                        />
                    </div>

                    {/* Objectives */}
                    <div className="col-12">
                        <label htmlFor="objectives" className="form-label">Objectives</label>
                        <JoditEditor
                            value={formData.objectives}
                            // config={editorConfig}
                            onBlur={(newContent) => setFormData({ ...formData, objectives: newContent })}
                        />
                    </div>

                    {/* Brief Contents */}
                    <div className="col-12">
                        <label htmlFor="briefContents" className="form-label">Brief Contents</label>
                        <JoditEditor
                            value={formData.briefContents}
                            // config={editorConfig}
                            onBlur={(newContent) => setFormData({ ...formData, briefContents: newContent })}
                        />
                    </div>

                    {/* Course Project */}
                    <div className="col-12">
                        <label htmlFor="courseProject" className="form-label">Course Project</label>
                        <JoditEditor
                            value={formData.courseProject}
                            // config={editorConfig}
                            onBlur={(newContent) => setFormData({ ...formData, courseProject: newContent })}
                        />
                    </div>

                    {/* Certificate */}
                    <div className="col-12">
                        <label htmlFor="certificate" className="form-label">Certificate</label>
                        <JoditEditor
                            value={formData.certificate}
                            // config={editorConfig}
                            onBlur={(newContent) => setFormData({ ...formData, certificate: newContent })}
                        />
                    </div>

                    {/* Audience */}
                    <div className="col-md-12">
                        <label htmlFor="audience" className="form-label">Audience</label>
                        <textarea
                            name="audience"
                            value={formData.audience}
                            onChange={handleChange}
                            className="form-control"
                            id="audience"
                            rows="4" // Set the number of rows to control height
                            required
                        />
                    </div>

                    {/* Training Methodology */}
                    <div className="col-12">
                        <label htmlFor="trainingMethodology" className="form-label">Training Methodology</label>
                        <textarea
                            name="trainingMethodology"
                            value={formData.trainingMethodology}
                            onChange={handleChange}
                            className="form-control"
                            id="trainingMethodology"
                            rows="4" // Set the number of rows to control height
                            required
                        />
                    </div>

                    {/* Image Upload */}
                    <div className="mb-4">
                        <label className="form-label">Course Image</label>
                        <input
                            type="file"
                            name="image"
                            onChange={handleImageChange}
                            className="form-control border p-2 mt-1 rounded shadow-sm"
                            required
                        />
                    </div>

                    <div className="col-12 text-center">
                        <button
                            type="submit"
                            className={`${isLoading ? 'not-allowed' : 'allowed'}`}
                            disabled={isLoading}
                        >
                            {isLoading ? "Please Wait..." : "Add Course Details"}
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default AddProduct;
