import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import JoditEditor from 'jodit-react';

const EditCourseDetails = () => {
    const { id } = useParams(); // Get course ID from URL parameters
    const Navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false);
    const [courseOptions, setCourseOptions] = useState([]);
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

    const getApiData = async () => {
        try {
            const res = await axios.get("https://ins.api.digiindiasolutions.com/api/get-all-course");
            if (res.status === 200) {
                setCourseOptions(res.data.data);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const getCourseDetails = async () => {
        try {
            const res = await axios.get(`https://ins.api.digiindiasolutions.com/api/get-single-course-details/${id}`);
            if (res.status === 200) {
                setFormData({
                    courseName: res.data.data.courseName._id, // Set to _id of courseName
                    introduction: res.data.data.introduction,
                    objectives: res.data.data.objectives,
                    briefContents: res.data.data.briefContents,
                    courseProject: res.data.data.courseProject,
                    certificate: res.data.data.certificate,
                    audience: res.data.data.audience,
                    trainingMethodology: res.data.data.trainingMethodology,
                    image: null // Reset image if you don't want to show previous image
                });
            }
        } catch (error) {
            console.log(error);
            toast.error('Error fetching course details');
        }
    };

    useEffect(() => {
        getApiData();
        getCourseDetails();
    }, [id]);

    const editorConfig = {
        readonly: false,
        height: 300,
        toolbar: {
            buttons: [
                'bold',
                'italic',
                'underline',
                'strikethrough',
                'fontsize',
                'paragraph',
                'image',
                'table',
                'link',
                'align',
                'undo',
                'redo'
            ],
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: name === 'courseName' ? value : value // Handle courseName separately
        }));
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
            const response = await axios.put(`https://ins.api.digiindiasolutions.com/api/update-course-details/${id}`, formDataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            toast.success('Course details updated successfully!');
            Navigate("/all-course-details");
        } catch (error) {
            console.log(error);
            toast.error('Error updating course details');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <ToastContainer />
            <div className="bread">
                <div className="head">
                    <h4>Edit Course Details</h4>
                </div>
                <div className="links">
                    <Link to="/all-course-details" className="add-new">Back <i className="fa-regular fa-circle-left"></i></Link>
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

                    {/* Other form fields... */}
                    {/* Introduction */}
                    <div className="col-12">
                        <label htmlFor="introduction" className="form-label">Introduction</label>
                        <JoditEditor
                            value={formData.introduction}
                            onChange={(newContent) => handleChange({ target: { name: 'introduction', value: newContent } })}
                        />
                    </div>

                    {/* Objectives */}
                    <div className="col-12">
                        <label htmlFor="objectives" className="form-label">Objectives</label>
                        <JoditEditor
                            value={formData.objectives}
                            // config={editorConfig}
                            onChange={(newContent) => handleChange({ target: { name: 'objectives', value: newContent } })}
                        />
                    </div>

                    {/* Brief Contents */}
                    <div className="col-12">
                        <label htmlFor="briefContents" className="form-label">Brief Contents</label>
                        <JoditEditor
                            value={formData.briefContents}
                            // config={editorConfig}
                            onChange={(newContent) => handleChange({ target: { name: 'briefContents', value: newContent } })}
                        />
                    </div>

                    {/* Course Project */}
                    <div className="col-12">
                        <label htmlFor="courseProject" className="form-label">Course Project</label>
                        <JoditEditor
                            value={formData.courseProject}
                            // config={editorConfig}
                            onChange={(newContent) => handleChange({ target: { name: 'courseProject', value: newContent } })}
                        />
                    </div>

                    {/* Certificate */}
                    <div className="col-12">
                        <label htmlFor="certificate" className="form-label">Certificate</label>
                        <JoditEditor
                            value={formData.certificate}
                            // config={editorConfig}
                            onChange={(newContent) => handleChange({ target: { name: 'certificate', value: newContent } })}
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
                            rows="4"
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
                            rows="4"
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
                        />
                    </div>

                    <div className="col-12 text-center">
                        <button
                            type="submit"
                            className={`${isLoading ? 'not-allowed' : 'allowed'}`}
                            disabled={isLoading}
                        >
                            {isLoading ? "Please Wait..." : "Update Course Details"}
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default EditCourseDetails;
