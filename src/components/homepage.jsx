import React, { useEffect, useState } from 'react';
import './homepage.css';

export default function HomePage() {
    const [data, setData] = useState([{}, {}, {}, {}]); 
    const [loading, setLoading] = useState(true); 

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch('https://health-management-backend.vercel.app/api/hospital'); // Replace with your API URL
            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }
            const result = await response.json(); // Assuming your API returns JSON
            setData(result); 
            console.log(result);
          } catch (error) {
            alert("Error Message"); // Handle any errors
          } finally {
            setLoading(false);
          }
        };
    
        fetchData(); // Call the async function
      }, []); 

      const handleConfirm = async (id,index) => {
        const result = window.confirm('Are you sure you want to Approve this hospital?');
        if (result) {
            setLoading(true);
            try {
                const response = await fetch('https://health-management-backend.vercel.app/api/hospital/approve', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                    id: id
                  }),
                });
                console.log(response);
                if (response.status == 200) {
                    let newData = data;
                    newData[index].isApproved = true;
                    setData(newData);
                    window.location.reload();
                } else {
                  alert("Oops! Something Went wrong");
                  setLoading(false);
                }
              } catch (error) {
                setLoading(false);
                alert(error);
              }

        }
      };

      

  return (
    <div className="container">
            <center><a href="/">Go To Home</a></center>
    <center><h1>All Hospitals</h1></center>
      <center><div className="card-grid">
        {loading ? <center><img src="https://i.pinimg.com/originals/c7/e1/b7/c7e1b7b5753737039e1bdbda578132b8.gif" alt="" /></center> : data.map((hospital, index) => (
          <div className="card" key={index}>
            <h3>{hospital.hospitalName}</h3>
            <p><strong>Email:</strong> {hospital.emailAddress}</p>
            <p><strong>Ambulance Number:</strong> {hospital.ambulanceHelpline}</p>
            <p><strong>Approval Status:</strong> {hospital.isApproved ? 'Approved' : <div>Not Approved <button onClick={() => handleConfirm(hospital._id, index)} className='approve-button'>Approve Now</button></div>}</p>
            <p><strong>Phone Number: </strong>+91 {hospital.phoneNumber}</p>
            <p><strong>Address: </strong>{hospital.address}</p>
            <a href={'/viewdoctors/' + hospital._id} className='approve-button'>View Doctors</a><br /><br />
            <a href={'/viewappointment/' + hospital._id} className='approve-button'>View Patients</a><br /><br />
            <a href={'/viewinventory/' + hospital._id} className='approve-button'>View inventory</a>
          </div>
        ))}
      </div></center>
    </div>
  );
}
