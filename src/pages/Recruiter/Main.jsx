import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../../api/axios'

const MainR = () => {

  const [jobs, setJobs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {

  const fetchJobs = async () => {
    try {
      const res = await API.get("recruiter/jobs");
      const recruiterId = localStorage.getItem("recId");
      setJobs(res.data.data.filter.filter(job => job.recId === recruiterId));
    }
    catch (err) {
      console.error("Failed to load jobs:", err);
    }
  };
  fetchJobs();
  }, []);


  const handleDelete = async (id) => {
    await API.delete(`/jobs/${id}`);
    setJobs(prev => prev.filter(job => job._id !== id));
  };

  /*
  const saveEdit = async () => {
  const newText = document.getElementById('edit').value;
    await API.put(`/tasks/${editingId}`, { description: newText });
    setNotes(prev =>
      prev.map(note => note._id === editingId ? { ...note, description: newText } : note)
    );
    setEditingId(null);
};

  const cancelEdit = () => {
    setEditingId(null);
  };*/


  return (
    <>

    <header className='bg-white shadow-md'>
    <div class="logo"></div>
    <nav className='space-x-6  mx-auto flex justify-between items-center p-4'>
      <button className= 'mx-10 text-gray-700 hover:text-blue-600 text-2xl' onClick={()=>{navigate("/"); localStorage.removeItem("token")}}>Home</button>
      <button className= 'mx-10 text-gray-700 hover:text-blue-600 text-2xl' onClick={()=>{navigate("/candidate/login"); localStorage.removeItem("token")}}>Candidate</button>
      <button className= 'mx-10 text-gray-700 hover:text-blue-600 text-2xl' onClick={()=>{navigate("/"); localStorage.removeItem("token")}}>Log Out</button>
      
    </nav>
    </header>

    <div className = 'max-w-4xl mx-auto p-6 bg-gray-100 min-w-screen min-h-screen'>
      <h1 className="text-4xl font-extrabold text-gray-800 mb-6 text-center">My Jobs</h1>
      <ul className="space-y-4">
        {jobs.map(job => (
          <li key={job._id} className="flex justify-between items-center bg-white shadow-md rounded-lg p-4 border border-gray-200">
            <>
            
            <div className="text-lg font-semibold text-gray-800 mx-10">{job.title}</div>
            <div className='flex space-x-137'>
            <button className="text-lg text-gray-500 hover:text-blue-600 cursor-pointer" onClick={() => navigate(`/recruiter/editjob/${job._id}`)}>Edit</button>
            <button className="text-lg text-gray-500 hover:text-red-500 cursor-pointer mx-10" onClick={() => handleDelete(job._id)}>Delete</button>
            </div></>
          </li>
        ))}
      </ul>
            <button className = "mt-5 w-full py-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 shadow-md transition cursor-pointer" onClick={()=>{navigate("/recruiter/jobform")}}>Add New Job</button>

        </div>
    </>
  )
};

export default MainR;