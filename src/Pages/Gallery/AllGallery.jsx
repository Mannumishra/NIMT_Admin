import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2';

const AllGallery = () => {
    const [galleryItems, setGalleryItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    // Fetch gallery items
    useEffect(() => {
        const fetchGalleryItems = async () => {
            try {
                const response = await axios.get('https://api.nimteducation.com/api/get-gallery'); // Adjust the endpoint as needed
                console.log(response)
                setGalleryItems(response.data.data);
                setIsLoading(false);
            } catch (error) {
                console.error("Error fetching gallery data", error);
                toast.error("Failed to load gallery data");
                setIsLoading(false);
            }
        };
        fetchGalleryItems();
    }, []);

    // Delete gallery item
    const handleDelete = async (id) => {
        const confirmDelete = await Swal.fire({
            title: 'Are you sure?',
            text: "This will permanently delete the image.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
        });

        if (confirmDelete.isConfirmed) {
            try {
                // Delete from the database and Cloudinary
                await axios.delete(`https://api.nimteducation.com/api/delete-gallery/${id}`);
                toast.success("Gallery item deleted successfully");
                setGalleryItems(galleryItems.filter(item => item._id !== id));
            } catch (error) {
                console.error("Error deleting gallery item", error);
                toast.error("Failed to delete gallery item");
            }
        }
    };

    return (
        <>
            <ToastContainer />
            <div className="bread">
                <div className="head">
                    <h4>All Gallery List</h4>
                </div>
                <div className="links">
                    <Link to="/add-gallery" className="add-new">Add New <i className="fa-solid fa-plus"></i></Link>
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
                    <p>Loading gallery items...</p>
                ) : (
                    <table className="table table-bordered table-striped table-hover">
                        <thead>
                            <tr>
                                <th scope="col">Sr.No.</th>
                                <th scope="col">Image</th>
                                <th scope="col">Show in Home</th>
                                <th scope="col">Edit</th>
                                <th scope="col">Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {galleryItems.map((item, index) => (
                                <tr key={item._id}>
                                    <td>{index + 1}</td>
                                    <td>
                                        <img src={item.image} alt="Gallery" style={{ width: '100px', height: '80px' }} />
                                    </td>
                                    <td>{item.showinHomePage ? "Yes" : "No"}</td>
                                    <td>
                                        <Link to={`/edit-gallery/${item._id}`} className="bt edit">Edit <i className="fa-solid fa-pen-to-square"></i></Link>
                                    </td>
                                    <td>
                                        <button
                                            onClick={() => handleDelete(item._id)}
                                            className="bt delete"
                                        >
                                            Delete <i className="fa-solid fa-trash"></i>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </section>
        </>
    );
}

export default AllGallery;
