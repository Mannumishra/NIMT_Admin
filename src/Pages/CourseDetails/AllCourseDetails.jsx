import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AllCourseDetails = () => {
    const [courseData, setCourseData] = useState([]);

    const fetchData = async () => {
        try {
            const response = await fetch('https://api.nimteducation.com/api/get-course-details');
            const result = await response.json();
            if (result.success) {
                setCourseData(result.data);
            } else {
                console.error("Failed to fetch course details.");
            }
        } catch (error) {
            console.error("Error fetching course details:", error);
        }
    };
    useEffect(() => {
        fetchData();
    }, []);

    // Function to truncate text to a specified limit
    const truncateText = (text, limit) => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(text, 'text/html');
        const plainText = doc.body.innerText || "";
        return plainText.length > limit ? plainText.substring(0, limit) + '...' : plainText;
    };

    const deleteRecord = async (id) => {
        try {
            const res = await axios.delete("https://api.nimteducation.com/api/delete-course-details/" + id)
            console.log(res)
            if (res.status === 200) {
                toast.success(res.data.message)
            }
            fetchData()
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <ToastContainer />
            <div className="bread">
                <div className="head">
                    <h4>All Course Details</h4>
                </div>
                <div className="links">
                    <Link to="/add-course-details" className="add-new">Add New <i className="fa-solid fa-plus"></i></Link>
                </div>
            </div>

            <div className="filteration">
                <div className="selects">
                    {/* You can implement filtering options here */}
                </div>
                <div className="search">
                    <label htmlFor="search">Search </label>&nbsp;
                    <input type="text" name="search" id="search" />
                </div>
            </div>

            <section className="d-table">
                <table className="table table-bordered table-striped table-hover">
                    <thead>
                        <tr>
                            <th scope="col">Sr.No.</th>
                            <th scope="col">Course Name</th>
                            <th scope="col">Introduction</th>
                            <th scope="col">Objectives</th>
                            <th scope="col">Brief Contents</th>
                            <th scope="col">Course Project</th>
                            <th scope="col">Certificate</th>
                            <th scope="col">Audience</th>
                            <th scope="col">Training Methodology</th>
                            <th scope="col">Image</th>
                            <th scope="col">Edit</th>
                            <th scope="col">Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {courseData.map((item, index) => (
                            <tr key={item._id}>
                                <th scope="row">{index + 1}</th>
                                <td>{item.courseName?.courseName || 'N/A'}</td>
                                <td>{truncateText(item.introduction || '', 50)}</td>
                                <td>{truncateText(item.objectives || '', 50)}</td>
                                <td>{truncateText(item.briefContents || '', 50)}</td>
                                <td>{truncateText(item.courseProject || '', 50)}</td>
                                <td>{truncateText(item.certificate || '', 50)}</td>
                                <td>{truncateText(item.audience || '', 50)}</td>
                                <td>{truncateText(item.trainingMethodology || '', 50)}</td>
                                <td>
                                    <img src={item.image || 'placeholder-image-url'} alt={item.courseName?.courseName || 'Course'} style={{ width: '100px', height: 'auto' }} />
                                </td>
                                <td><Link to={`/edit-course-details/${item._id}`} className="bt edit">Edit <i className="fa-solid fa-pen-to-square"></i></Link></td>
                                <td><Link className="bt delete" onClick={() => deleteRecord(item._id)}>Delete <i className="fa-solid fa-trash"></i></Link></td>
                            </tr>
                        ))}
                    </tbody>

                </table>
            </section>
        </>
    );
}

export default AllCourseDetails;
