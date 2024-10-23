import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2';

const AllCategory = () => {
    const [courses, setCourses] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    // Fetch courses from the API
    const fetchCourses = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/get-all-course'); // Adjust the API endpoint accordingly
            console.log(response);
            setCourses(response.data.data); // Adjust based on your API response
        } catch (error) {
            console.error('Error fetching courses:', error);
            toast.error('Failed to load courses.');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchCourses();
    }, []);

    // Handle delete course
    const handleDelete = async (id) => {
        const confirmed = await Swal.fire({
            title: 'Are you sure?',
            text: 'You won\'t be able to revert this!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
        });

        if (confirmed.isConfirmed) {
            try {
                await axios.delete(`http://localhost:8000/api/delete-course/${id}`); // Adjust the API endpoint accordingly
                toast.success('Course deleted successfully!');
                fetchCourses(); // Refresh the course list
            } catch (error) {
                console.error('Error deleting course:', error);
                toast.error(error.response?.data?.message || 'Failed to delete course.');
            }
        }
    };

    // Handle checkbox change to update course status
    const handleStatusChange = async (courseId, currentStatus) => {
        const updatedStatus = !currentStatus; // Toggle the status
        try {
            await axios.put(`http://localhost:8000/api/update-course/${courseId}`, { showinHomePage: updatedStatus });
            toast.success('Course status updated successfully!');
            
            // Optionally update the local state to reflect the change immediately
            setCourses(prevCourses =>
                prevCourses.map(course =>
                    course._id === courseId ? { ...course, showinHomePage: updatedStatus } : course
                )
            );
    
            // Alternatively, you can refresh the course list
            // fetchCourses(); 
        } catch (error) {
            console.error('Error updating course status:', error);
            toast.error('Failed to update course status.');
        }
    };
    

    return (
        <>
            <ToastContainer />
            <div className="bread">
                <div className="head">
                    <h4>All Course List</h4>
                </div>
                <div className="links">
                    <Link to="/add-category" className="add-new">Add New <i className="fa-solid fa-plus"></i></Link>
                </div>
            </div>

            <div className="filteration">
                <div className="search">
                    <label htmlFor="search">Search </label> &nbsp;
                    <input type="text" name="search" id="search" />
                </div>
            </div>

            <section className="d-table">
                {isLoading ? (
                    <p>Loading courses...</p>
                ) : (
                    <table className="table table-bordered table-striped table-hover">
                        <thead>
                            <tr>
                                <th scope="col">Sr.No.</th>
                                <th scope="col">Course Category</th>
                                <th scope="col">Course Name</th>
                                <th scope="col">Course Topic</th>
                                <th scope="col">Course Duration</th>
                                <th scope="col">Course Enrollment</th>
                                <th scope="col">Show in Home</th> {/* New header for checkbox */}
                                <th scope="col">Image</th>
                                {/* <th scope="col">Edit</th> */}
                                <th scope="col">Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {courses.length > 0 ? (
                                courses.map((course, index) => (
                                    <tr key={course._id}>
                                        <th scope="row">{index + 1}</th>
                                        <td>{course.courseCtegory.courseCategoryName}</td>
                                        <td>{course.courseName}</td>
                                        <td>{course.courseTopic.join(', ')}</td> {/* Join topics with a comma */}
                                        <td>{course.courseDuration} week</td>
                                        <td>{course.courseEnrollment}</td>
                                        <td>
                                            <input 
                                                type="checkbox" 
                                                checked={course.showinHomePage} // Assuming you have this property in your course data
                                                onChange={() => handleStatusChange(course._id, course.showinHomePage)} 
                                            />
                                        </td>
                                        <td>
                                            <img src={course.image} alt={course.courseName} style={{ width: '100px', height: 'auto' }} />
                                        </td>
                                        {/* <td>
                                            <Link to={`/edit-category/${course.courseName}`} className="bt edit">Edit <i className="fa-solid fa-pen-to-square"></i></Link>
                                        </td> */}
                                        <td>
                                            <button className="bt delete" onClick={() => handleDelete(course._id)}>Delete <i className="fa-solid fa-trash"></i></button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="10" className="text-center">No courses found.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                )}
            </section>
        </>
    );
}

export default AllCategory;
