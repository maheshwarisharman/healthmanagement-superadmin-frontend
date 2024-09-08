import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom';
import exportToExcel from './exporttoexcel';


export default function ViewAppointment() {
    const { id } = useParams();
    console.log(id);

    const [data, setData] = useState([{}, {}, {}, {}]); 
    const [loading, setLoading] = useState(true); 

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch('https://health-management-backend.vercel.app/api/patient'); // Replace with your API URL
            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }
            const result = await response.json();   
            let newArr = [];
            for (let index = 0; index < result.length; index++) {
                if(result[index].hospitalId == id) {
                    newArr.push(result[index]);
                }
            }
            setData(newArr); 
            console.log(result);
          } catch (error) {
            alert("Error Message"); // Handle any errors
          } finally {
            setLoading(false);
          }
        };
    
        fetchData(); // Call the async function
      }, []); 


  return (
<div className="container">
<center><a href="/">Go To Home</a></center>
    <center>
      <h1>All patients</h1>
      <button className='dl-btn' onClick={() => exportToExcel(data, 'patient_report.xlsx')}>Export Data</button>
    </center>
      <center><div className="card-grid">
        {loading ? <center><img src="https://i.pinimg.com/originals/c7/e1/b7/c7e1b7b5753737039e1bdbda578132b8.gif" alt="" /></center> : data.map((patient, index) => (
          <div className="card" key={index}>
            <h3>{patient.name}</h3>
            <p><strong>Address:</strong> {patient.address}</p>
            <p><strong>age:</strong> {patient.age}</p>
            <p><strong>Date Of Birth: </strong>{patient.dob}</p>
            <p><strong>Address: </strong>{patient.address}</p>
            <p><strong>gender: </strong>{patient.gender}</p>
            <p><strong>Patient Type: </strong>{patient.patientType}</p>
            <p><strong>Phone Number: </strong>+91 {patient.phoneNumber}</p>

            <p><strong>Goverment Scheme: </strong>{patient.goverment_scheme}</p>
            <p><strong>Insurance Company: </strong>{patient.insurance_company}</p>
            <p><strong>Insurance Type: </strong>{patient.insurance_type}</p>
            <p><strong>Total insurance cover: </strong>{patient.total_cover}</p>

          </div>
        ))}
      </div></center>
    </div>
  );
}
