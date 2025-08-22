import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../../api/axios'

const MainA = () => {

const navigate = useNavigate();
const [recruiters, setRecs] = useState([]);

useEffect(() => {

  const fetchRecs = async () => {
    try {
      const res = await API.get("/recruiter");
      setRecs(res.data.data);
    }
    catch (err) {
      console.error("Failed to load jobs:", err);
    }
  };
  fetchRecs();
  }, []);

  const handleDelete = async (id) => {
    await API.delete(`/recruiter/${id}`);
    setRecs(prev => prev.filter(rec => rec._id !== id));
  };


  return (
    <>

    <header className='bg-white shadow-md'>
    <div class="logo"></div>
    <nav className='space-x-6  mx-auto flex justify-between items-center p-4'>
      <button className= 'mx-10 text-gray-700 hover:text-blue-600 text-2xl' onClick={()=>{navigate("/"); localStorage.removeItem("token")}}>Home</button>
      <button className= 'mx-10 text-gray-700 hover:text-blue-600 text-2xl' onClick={()=>{navigate("/candidate/login"); localStorage.removeItem("token")}}>Candidate</button>
      <button className= 'mx-10 text-gray-700 hover:text-blue-600 text-2xl' onClick={()=>{navigate("/recruiter/login"); localStorage.removeItem("token")}}>Recruiter</button>
      <button className= 'mx-10 text-gray-700 hover:text-blue-600 text-2xl' onClick={()=>{navigate("/"); localStorage.removeItem("token")}}>Log Out</button>
      
    </nav>
    </header>
<div className='bg-gray-100'>
     <div className = 'max-w-md mx-auto p-6 min-h-screen'>
      <h1 className="text-4xl font-extrabold text-gray-800 mb-6 text-center">Recruiters</h1>
      <ul className="space-y-4">
        {recruiters.map(rec => (
          <li key={rec._id} className="flex justify-between items-center bg-white shadow-md rounded-lg p-4 border border-gray-200">
            <>
            
            <div className="text-lg font-semibold text-gray-800 mx-10">{rec.name}</div>
            <div className='flex space-x-137'>
            <button className="text-lg text-gray-500 hover:text-red-500 cursor-pointer mx-10" onClick={() => handleDelete(rec._id)}>Delete</button>
            </div></>
          </li>
        ))}
      </ul>
      </div>
        </div>


    </>
  )
};

export default MainA;