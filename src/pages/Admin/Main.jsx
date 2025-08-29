import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../../api/axios'

const MainA = () => {

const navigate = useNavigate();
const [recruiters, setRecs] = useState([]);
const [candidates, setCandidates] = useState([]);
const [jobs, setJobs] = useState([]);

const [view, setView] = useState("recruiters");

useEffect(() => {

  const fetchRecs = async () => {
    try {
      const resRec = await API.get("/recruiter");
      setRecs(resRec.data.data);

      const resCand = await API.get("/candidate");
        setCandidates(resCand.data.data);

      const resJob = await API.get("/jobs");
      setJobs(resJob.data.data)

    }
    catch (err) {
      console.error("Failed to load jobs:", err);
    }
  };
  fetchRecs();
  }, []);

  const handleRecDelete = async (id) => {
    await API.delete(`/recruiter/${id}`);
    setRecs(prev => prev.filter(rec => rec._id !== id));
  };

  const handleJobDelete = async (id) => {
    await API.delete(`/jobs/${id}`);
    setJobs(prev => prev.filter(job => job._id !== id));
  };

  const handleCandDelete = async (id) => {
    await API.delete(`/candidate/${id}`);
    setCandidates(prev => prev.filter(cand => cand._id !== id));
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
<div className='flex bg-gray-100 min-h-screen'>
  

      <aside className="w-64 bg-gray-800 text-white p-6">
        <h2 className="text-2xl font-bold mb-8">Dashboard</h2>
        <nav className="space-y-4">
          <button onClick={() => setView("recruiters")}
            
            className={`w-full text-left px-4 py-2 rounded cursor-pointer ${view === "recruiters" ? "bg-gray-700" : "hover:bg-gray-700"}`}
          >
            Recruiters
          </button>
          <button onClick={() => setView("candidates")}
            
            className={`w-full text-left px-4 py-2 rounded cursor-pointer ${view === "candidates" ? "bg-gray-700" : "hover:bg-gray-700"}`}
          >
            Candidates
          </button>

          <button onClick={() => setView("jobs")}
            
            className={`w-full text-left px-4 py-2 rounded cursor-pointer ${view === "jobs" ? "bg-gray-700" : "hover:bg-gray-700"}`}
          >
            Jobs
          </button>
        </nav>
      </aside>

      <div className="flex-1 p-6">
        {view === "recruiters" && (<>
      <h1 className="text-4xl font-extrabold text-gray-800 mb-6 text-center">Recruiters</h1>
      <div className="max-w-2xl mx-auto">
      <ul className="space-y-4">
        {recruiters.map(rec => (
          <li key={rec._id} className="flex justify-between items-center bg-white shadow-md rounded-lg p-4 border border-gray-200">
            <>
            
            <div className="text-lg font-semibold text-gray-800 mx-10">{rec.name}</div>
            <div className='flex space-x-137'>
            <button className="text-lg text-gray-500 hover:text-red-500 cursor-pointer mx-10" onClick={() => handleRecDelete(rec._id)}>Delete</button>
            </div></>
          </li>
        ))}
      </ul>
      
      </div>
      </>)}
      {view === "candidates" && (<>
      <h1 className="text-4xl font-extrabold text-gray-800 mb-6 text-center">Candidates</h1>
      <div className="max-w-2xl mx-auto">
      <ul className="space-y-4">
        {candidates.map(cand => (
          <li key={cand._id} className="flex justify-between items-center bg-white shadow-md rounded-lg p-4 border border-gray-200">
            <>
            
            <div className="text-lg font-semibold text-gray-800 mx-10">{cand.name}</div>
            <div className='flex space-x-137'>
            <button className="text-lg text-gray-500 hover:text-red-500 cursor-pointer mx-10" onClick={() => handleCandDelete(cand._id)}>Delete</button>
            </div></>
          </li>
        ))}
      </ul>
      
      </div>
      </>)}
      {view === "jobs" && (<>
      <h1 className="text-4xl font-extrabold text-gray-800 mb-6 text-center">Jobs</h1>
      <div className="max-w-6xl mx-auto">
      <ul className="space-y-4">
        {jobs.map(job => (
          <li key={job._id} className="flex justify-between items-center bg-white shadow-md rounded-lg p-4 border border-gray-200">
            <>
            
            <div className="w-1/3 text-lg font-semibold text-gray-800 mx-10">{job.title}</div>
            <div className="w-1/3 text-gray-600">{recruiters.find(r => r._id === job.recId)?.name || "Unknown Recruiter"}</div>
            <button className="text-lg text-gray-500 hover:text-red-500 cursor-pointer mx-10" onClick={() => handleJobDelete(job._id)}>Delete</button>
</>
          </li>
        ))}
      </ul>
      
      </div>
      </>)}
  </div>

      </div>


    </>
  )
};

export default MainA;