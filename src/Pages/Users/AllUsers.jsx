import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AllUsers = () => {
    const [data, setData] = useState([]);

    const getAllQuery = async () => {
        try {
            const res = await axios.get("https://ins.api.digiindiasolutions.com/api/get-queryes");
            console.log(res)
            if (res.status === 200) {
                const newData = res.data.data;
                setData(newData.reverse());
            }
        } catch (error) {
            console.log(error);
        }
    };

    const updateStatus = async (id, newStatus) => {
        try {
            const res = await axios.put(`https://ins.api.digiindiasolutions.com/api/update-status/${id}`, { status: newStatus });
            if (res.status === 200) {
                alert('Status updated successfully');
                getAllQuery(); // Refresh the data after updating the status
            }
        } catch (error) {
            console.error('Error updating status:', error);
        }
    };

    useEffect(() => {
        getAllQuery();
    }, []);

    // Helper function to format date in dd-mm-yyyy
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); // months are 0-based
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
    };

    return (
        <>
            <div className="bread">
                <div className="head">
                    <h4>All Users</h4>
                </div>
                <div className="links">
                    {/* Additional links or actions can be placed here */}
                </div>
            </div>

            <section className="d-table">
                <div className="table-responsive mt-4">
                    <table className="table table-bordered table-striped table-hover">
                        <thead>
                            <tr>
                                <th scope="col">Sr.No.</th>
                                <th scope="col">Name</th>
                                <th scope="col">Email</th>
                                <th scope="col">Phone No</th>
                                <th scope="col">Course Category</th>
                                <th scope="col">Course Name</th>
                                <th scope="col">Date</th>
                                <th scope="col">Status</th>
                                {/* Add more columns as needed */}
                            </tr>
                        </thead>
                        <tbody>
                            {
                                data.map((item, index) => (
                                    <tr key={index}>
                                        <th scope="row">{index + 1}</th>
                                        <td>{item.name}</td>
                                        <td>{item.email}</td>
                                        <td>{item.phone}</td>
                                        <td>{item.branch}</td>
                                        <td>{item.course}</td>
                                        <td>{formatDate(item.createdAt)}</td>
                                        <td>
                                            <button
                                                className={`btn ${item.status === 'Complete' ? 'btn-success' : 'btn-danger'}`}
                                                onClick={() => item.status === 'Pending' && updateStatus(item._id, 'Complete')}
                                                disabled={item.status === 'Complete'} // Disable if status is "Complete"
                                            >
                                                {item.status}
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </section>
        </>
    );
};

export default AllUsers;
