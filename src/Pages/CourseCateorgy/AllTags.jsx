import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AllTags = () => {
    const [categories, setCategories] = useState([]); // To store fetched categories
    const [isLoading, setIsLoading] = useState(true); // Loading state
    const [searchTerm, setSearchTerm] = useState(''); // Search state

    // Fetch all categories from the server
    const fetchCategories = async () => {
        try {
            setIsLoading(true); // Start loading
            const response = await axios.get('http://localhost:8000/api/get-course-category');
            setCategories(response.data.data); // Store the fetched categories
            setIsLoading(false); // Stop loading
        } catch (error) {
            console.error(error);
            toast.error("Failed to fetch categories");
            setIsLoading(false);
        }
    };

    // Handle delete action
    const handleDelete = async (categoryName) => {
        Swal.fire({
            title: 'Are you sure?',
            text: `You won't be able to revert this!`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await axios.delete(`http://localhost:8000/api/delete-course-category/${categoryName}`);
                    Swal.fire('Deleted!', 'Your course category has been deleted.', 'success');
                    fetchCategories(); // Refetch categories after deletion
                } catch (error) {
                    console.error(error);
                    toast.error(error.response?.data?.message || "Failed to fetch categories")
                }
            }
        });
    };

    // Search handler
    const filteredCategories = categories.filter(category =>
        category.courseCategoryName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Fetch categories when the component loads
    useEffect(() => {
        fetchCategories();
    }, []);

    return (
        <>
            <ToastContainer />
            <div className="bread">
                <div className="head">
                    <h4>All Course Categories</h4>
                </div>
                <div className="links">
                    <Link to="/add-tag" className="add-new">Add New <i className="fa-solid fa-plus"></i></Link>
                </div>
            </div>

            <div className="filteration">
                <div className="search">
                    <label htmlFor="search">Search </label> &nbsp;
                    <input
                        type="text"
                        name="search"
                        id="search"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)} // Handle search input change
                    />
                </div>
            </div>

            <section className="d-table">
                <table className="table table-bordered table-striped table-hover">
                    <thead>
                        <tr>
                            <th scope="col">Sr.No.</th>
                            <th scope="col">Name</th>
                            <th scope="col">Edit</th>
                            <th scope="col">Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {isLoading ? (
                            <tr>
                                <td colSpan="4" className="text-center">Loading...</td>
                            </tr>
                        ) : filteredCategories.length > 0 ? (
                            filteredCategories.map((category, index) => (
                                <tr key={category._id}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{category.courseCategoryName}</td>
                                    <td>
                                        <Link to={`/edit-tag/${category.courseCategoryName}`} className="bt edit">
                                            Edit <i className="fa-solid fa-pen-to-square"></i>
                                        </Link>
                                    </td>
                                    <td>
                                        <button
                                            onClick={() => handleDelete(category.courseCategoryName)}
                                            className="bt delete"
                                        >
                                            Delete <i className="fa-solid fa-trash"></i>
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" className="text-center">No categories found</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </section>
        </>
    );
};

export default AllTags;
