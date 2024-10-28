import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2';

const AllNews = () => {
    const [galleryItems, setGalleryItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/get-news');
                setGalleryItems(response.data);
                setIsLoading(false);
            } catch (error) {
                console.error(error);
                toast.error('Failed to fetch news items');
                setIsLoading(false);
            }
        };

        fetchNews();
    }, []);

    const handleDelete = async (id) => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: 'You won\'t be able to revert this!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        });

        if (result.isConfirmed) {
            try {
                await axios.delete(`http://localhost:8000/api/delete-news/${id}`);
                setGalleryItems((prevItems) => prevItems.filter((item) => item._id !== id));
                Swal.fire('Deleted!', 'Your news item has been deleted.', 'success');
            } catch (error) {
                console.error(error);
                toast.error('Failed to delete news item');
            }
        }
    };

    return (
        <>
            <ToastContainer />
            <div className="bread">
                <div className="head">
                    <h4>All News List</h4>
                </div>
                <div className="links">
                    <Link to="/add-news" className="add-new">Add New <i className="fa-solid fa-plus"></i></Link>
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
                                <th scope="col">Heading</th>
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
                                        <img src={item.newsImage} alt={item.newsHeading} style={{ width: '100px', height: 'auto' }} />
                                    </td>
                                    <td>{item.newsHeading}</td>
                                    <td>{item.newsShowInhomePage}</td>
                                    <td>
                                        <Link to={`/edit-news/${item._id}`} className="btn btn-warning">Edit</Link>
                                    </td>
                                    <td>
                                        <button onClick={() => handleDelete(item._id)} className="btn btn-danger">Delete</button>
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

export default AllNews;
