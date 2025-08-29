import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../../api/axios'

const MainR = () => {

  const [jobs, setJobs] = useState([]);
  const [apps, setApps] = useState([]);
  const [candidates, setCandidates] = useState([]);

  const [selectedApp, setSelectedApp] = useState(null);
  const [popup, setPopup] = useState(false);

  const statusOptions = ["Pending", "Reviewed", "Accepted", "Rejected"];

  const [status, setStatus] = useState("");

  useEffect(() => {
  if (selectedApp) {
    setStatus(selectedApp.status);
  }
  }, [selectedApp]);

  const [view, setView] = useState("jobs");

  const navigate = useNavigate();

  useEffect(() => {

    const fetchData = async () => {
      try {
        const resJob = await API.get("/recruiter/jobs");
        setJobs(resJob.data.data);

        const resCand = await API.get("/candidate");
        setCandidates(resCand.data.data);

        if (view=="applications"){
        const resApp = await API.get("/application");
        setApps(resApp.data.data)
        }

      }
      catch (err) {
        console.error(`Failed to load ${view}`, err);
      }
    };
  fetchData();
  }, [view]);

  const handleViewDetails = (app) => {
    setSelectedApp(app);
    setPopup(true);
  };

  const handleClosePopup = () => {
    setPopup(false);
    setSelectedApp(null);
  };

  const handleStatusChange = async (id, newStatus) => {
    try{
      setStatus(newStatus);
      await API.put(`/application/${id}`, { status: newStatus });
      setApps(prev => prev.map(app => 
        app._id === id ? { ...app, status: newStatus } : app
      ));
    }
    catch{
      console.error("Failed to update status");
    }
  };

  const handleDelete = async (id) => {
    await API.delete(`/jobs/${id}`);
    setJobs(prev => prev.filter(job => job._id !== id));
  };

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

    

    <div className = 'flex bg-gray-100 min-h-screen'>
      <aside className="w-64 bg-gray-800 text-white p-6">
        <h2 className="text-2xl font-bold mb-8">Dashboard</h2>
        <nav className="space-y-4">
          <button
            onClick={() => setView("jobs")}
            className={`w-full text-left px-4 py-2 rounded cursor-pointer ${view === "jobs" ? "bg-gray-700" : "hover:bg-gray-700"}`}
          >
            View Jobs
          </button>
          <button
            onClick={() => setView("applications")}
            className={`w-full text-left px-4 py-2 rounded cursor-pointer ${view === "applications" ? "bg-gray-700" : "hover:bg-gray-700"}`}
          >
            View Applications
          </button>
        </nav>
      </aside>

      <div className="flex-1 p-6">
      {view === "jobs" && (<>
          <h1 className="text-4xl font-extrabold text-gray-800 mb-6 text-center">My Jobs</h1>
          <ul className="space-y-4">
            {jobs.map(job => (
              <li key={job._id} className="flex justify-between items-center bg-white shadow-md rounded-lg p-4 border border-gray-200">
                
                <div className="text-lg font-semibold text-gray-800 mx-10">{job.title}</div>
                <div className='flex space-x-105'>
                <button className="text-lg text-gray-500 hover:text-blue-600 cursor-pointer" onClick={() => navigate(`/recruiter/editjob/${job._id}`)}>Edit</button>
                <button className="text-lg text-gray-500 hover:text-red-500 cursor-pointer mx-10" onClick={() => handleDelete(job._id)}>Delete</button>
                </div>
              </li>
            ))}
          </ul>
                <button className = "mt-5 w-full py-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 shadow-md transition cursor-pointer" onClick={()=>{navigate("/recruiter/jobform")}}>Add New Job</button>

        </>)}

        {view === "applications" && (
          <>
            <h1 className="text-4xl font-extrabold text-gray-800 mb-6 text-center">Applications</h1>
          <ul className="space-y-4">
            {apps.map(app => (
              <li key={app._id} className="flex justify-between items-center bg-white shadow-md rounded-lg p-4 border border-gray-200">
                
                <div className="w-1/4 text-lg font-semibold text-gray-800 mx-10">{jobs.find(job => job._id === app.job)?.title || "Unkown Title"}</div>
                <div className="w-1/4 text-lg text-gray-800 mx-10">{candidates.find(cand => cand._id === app.candidate)?.name || "Unknown Candidate"}</div>
                <div className="w-1/4 text-lg text-gray-800 mx-10">{app.status}</div>
                <button className="w-1/4 text-lg text-gray-500 hover:text-blue-600 cursor-pointer mx-10" onClick={() => handleViewDetails(app)}>View Details</button>
              </li>
            ))}
          </ul>
          {popup && selectedApp && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">

            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              {jobs.find(job => job._id === selectedApp.job)?.title || "Unknown Title"}
            </h2>
            
            <p className="text-gray-600 mb-4">
              <strong>Company:</strong> {jobs.find(job => job._id === selectedApp.job)?.company || "Unknown Company"}
            </p>

            <p className="text-gray-600 mb-4">
              <strong>Candidate Name:</strong> {candidates.find(cand => cand._id === selectedApp.candidate)?.name || "Unknown Candidate"}
            </p>

            <p className="text-gray-600 mb-4">
              <strong>Candidate Email:</strong> {candidates.find(cand => cand._id === selectedApp.candidate)?.email || "Unknown Candidate Email"}
            </p>

            <p className="text-gray-600 mb-4">
              <strong>Skills:</strong> {selectedApp.skills}
            </p>

            <div className="text-gray-600 mb-4">
              <strong>Status:</strong>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="ml-2 border px-2 py-1 rounded"
              >
                  <option value="Pending">Pending</option>
                  <option value="Reviewed">Reviewed</option>
                  <option value="Accepted">Accepted</option>
                  <option value="Rejected">Rejected</option>
              </select>
          </div>

            <p className="text-gray-600 mb-4">
              <strong>Resume:</strong> <a href={`http://localhost:3200/${selectedApp.resume}`} target="_blank"
                rel="noopener noreferrer" className="text-blue-600 hover:underline">View Resume</a>
            </p>
            

            <button
              className="w-full py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition cursor-pointer"
              onClick={()=> {handleClosePopup(); handleStatusChange(selectedApp._id, status)}}
            >
              Close
            </button>
          </div>
        </div>
        )}
          </>
          
        )}
        </div>
      
    </div>
    </>
  )
};

export default MainR;