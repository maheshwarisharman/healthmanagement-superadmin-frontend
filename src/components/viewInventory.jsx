import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom';
import exportToExcel from './exporttoexcel';


export default function ViewInventory() {
    const { id } = useParams();
    console.log(id);

    const [data, setData] = useState([{}, {}, {}, {}]); 
    const [loading, setLoading] = useState(true); 

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch('https://health-management-backend.vercel.app/api/hospital/allitems'); // Replace with your API URL
            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }
            const result = await response.json();   
            let newArr = [];
            for (let index = 0; index < result.length; index++) {
                if(result[index].hospital_id == id) {
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
    <h1>All items</h1>
    <button className='dl-btn' onClick={() => exportToExcel(data, 'product_report.xlsx')}>Export Data</button>
    </center>
      <center><div className="card-grid">
        {loading ? <center><img src="https://i.pinimg.com/originals/c7/e1/b7/c7e1b7b5753737039e1bdbda578132b8.gif" alt="" /></center> : data.map((item, index) => (
          <div className="card" key={index}>
            <h3>{item.itemName}</h3>
            <p><strong>Item Type:</strong> {item.itemType}</p>
            <p><strong>Price:</strong> {item.price}</p>
            <p><strong>Available Stock: </strong>{item.stock}</p>
          </div>
        ))}
      </div></center>
    </div>
  );
}
