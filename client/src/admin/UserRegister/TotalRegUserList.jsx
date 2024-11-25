import React, { useEffect, useState } from 'react';
import Sidebar from "../layout/Sidebar";
import { getAllUserData } from "../../services/Apis";
import { Link } from 'react-router-dom';
import * as XLSX from 'xlsx';
import { useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';


const TotalRegUserList = () => {
  const [inputs, setInputs] = useState('');
  const [count, setCount] = useState(10);
  const fetchApplications = async () => {
    try {
      const response = await getAllUserData();
      return response.data.data
    } catch (error) {
      toast.error('Error fetching data:', error);
      return []
    }
  };
 const { data = [], isLoading, isError, error } = useQuery({
    queryKey: ["pendingUsers"],
    queryFn: fetchApplications,
    onSuccess: () => {
      toast.success('Data loaded successfully!');
    },
    onError: (err) => {
      toast.error(`Error: ${err.message}`);
    },
  });

  const filteredUsers = Array.isArray(data)
    ? data
      .filter(user =>
        [user.name, user.email, user.application_no, user.username, user.mobile_no, user.region]
          .some(field => field?.toLowerCase().includes(inputs.toLowerCase()))
      )
      .slice(0, count)
    : [];
  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(data); 
    const wb = XLSX.utils.book_new(); 
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1'); 

    XLSX.writeFile(wb, 'TotalUsers.xlsx');
  };


  
  

  const handleChange = (e) => {
    setCount(parseInt(e.target.value, 10));
  };

  return (
    <Sidebar>
      <div className="clear">
        <div className="section_heading">
          <h2 className="title_heading">CORS Registration List</h2>
        </div>
        <div>
          <center>
            <h5>
              <b>Color Denoted to</b>
            </h5>
            <table>
              <thead>
              <tr>
                <th>
                  <div className="bg-light p-1 me-1 border rounded">Pending</div>
                </th>
                <th>
                  <div className="bg-success text-white me-1 p-1 border rounded">Active</div>
                </th>

                <th>
                  <div className="bg-danger text-white p-1 border rounded">Rejected</div>
                </th>
              </tr>
              </thead>
            </table>
          </center>
        </div>
        <div className="d-flex justify-content-end">
          <div
            className="mb-2 bg-secondary text-white py-2 px-2"
            style={{ borderRadius: "5px", cursor: "pointer" }}
            onClick={exportToExcel}
            disabled={data.length === 0}
          >
            Export to Excel
          </div>
        </div>
        <div>
          <div className="box_header">
            <div style={{ padding: "5px 0px" }}>
              <i className="fa-regular fa-rectangle-list mx-3"></i>&nbsp; Total
              Users: <b>{data.length}</b>
            </div>
          </div>
          <div>
            <div className="box_body">
              <form className="d-flex flex-column flex-md-row justify-content-between align-items-center mb-3">
                <div className="col-12 col-md-6 d-flex align-items-center mb-3 mb-md-0">
                  <label className="me-2">Records per page:</label>
                  <select
                    className="form-select"
                    value={count}
                    onChange={handleChange}
                    style={{ width: "auto" }}
                  >
                    <option value="10">10</option>
                    <option value="20">20</option>
                    <option value="50">50</option>
                    <option value="100">100</option>
                  </select>
                </div>
                <div className="col-12 col-md-6 d-flex justify-content-end">
                  <input
                    type="text"
                    value={inputs}
                    onChange={(e) => setInputs(e.target.value)}
                    placeholder="Search here ..."
                    className="form-control"
                    style={{
                      maxWidth: "300px",
                    }}
                  />
                </div>
              </form>
              <div className="table-div-admin">
                <table className="data_table">
                  <thead>
                    <tr>
                      <th style={{ width: "5%" }}>SNo</th>
                      <th>Application No</th>
                      <th>Reg. Date/Time</th>
                      <th className="desc">User Information</th>
                      <th>Account Status</th>
                      <th>Update By</th>
                      <th>Update</th>
                    </tr>
                  </thead>
                  <tbody style={{ fontSize: "14px" }}>
                    {filteredUsers.length > 0 ? (
                      filteredUsers.map((app, index) => {
                        const statusClass =
                          app.is_rejected === "Approved"
                            ? "bg-success text-white"
                            : app.is_rejected === "Pending"
                            ? "bg-light"
                            : app.is_rejected === "Rejected"
                            ? "bg-danger text-white"
                            : "bg-light";
                        return (
                          <tr key={app.sno} className={statusClass}>
                            <td>{index + 1}</td>
                            <td>{app.application_no}</td>
                            <td>{app.date_created}</td>
                            <td className="desc">
                              <div>
                                Name: {app.name} <br />
                                Email: {app.email} <br />
                                Phone: {app.mobile_no} <br />
                                User Type: {app.usertype} <br />
                                Organization: {app.company_name} <br />
                                Region: {app.region} <br />
                              </div>
                            </td>
                            <td>
                              <div>{app.is_rejected}</div>
                              <div>{app.rejected_reason}</div>
                            </td>
                            <td>{app.updatedBy}</td>
                            <td>
                              <button className="btn">
                                <Link
                                  to={`/admin/approved/${app.sno}`}
                                  className="text-decoration-none text-dark"
                                >
                                  <i className="fa-regular fa-pen-to-square text-dark fa-2x"></i>
                                </Link>
                              </button>
                            </td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr>
                        <td colSpan="8" className="text-center">
                          No data available
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Sidebar>
  );
};

export default TotalRegUserList;
