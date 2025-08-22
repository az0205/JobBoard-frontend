import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../../api/axios'

const MainC = () => {

const navigate = useNavigate();

const [jobs, setJobs] = useState([]);
const [selectedJob, setSelectedJob] = useState(null);
const [popup, setPopup] = useState(false);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await API.get("/jobs");
        setJobs(res.data.data);
      } catch (err) {
        console.error("Error fetching jobs", err);
      }
    };
    fetchJobs();
  }, []);


  const handleViewDetails = (job) => {
    setSelectedJob(job);
    setPopup(true);
  };

  const handleClosePopup = () => {
    setPopup(false);
    setSelectedJob(null);
  };

  return (
    <>

     <header className='bg-white shadow-md'>
    <div class="logo"></div>
    <nav className='space-x-6  mx-auto flex justify-between items-center p-4'>
      <button className= 'mx-10 text-gray-700 hover:text-blue-600 text-2xl' onClick={()=>{navigate("/"); localStorage.removeItem("token")}}>Home</button>
      <button className= 'mx-10 text-gray-700 hover:text-blue-600 text-2xl' onClick={()=>{navigate("/recruiter/login"); localStorage.removeItem("token")}}>Recruiter</button>
      <button className= 'mx-10 text-gray-700 hover:text-blue-600 text-2xl' onClick={()=>{navigate("/"); localStorage.removeItem("token")}}>Log Out</button>
      
    </nav>
    </header>
<div className='max-w-4xl mx-auto p-6 bg-gray-100 min-w-screen min-h-screen'>
        <h1 className='text-4xl font-extrabold text-gray-800 mb-8 text-center'>
          Available Jobs
        </h1>

        <div className='grid grid-cols-3 gap-6'>
          {jobs.map((job) => (
            <div
              key={job._id}
              className='bg-white rounded-lg shadow-md p-6 flex flex-col justify-between border border-gray-200'
            >
              <div>
                <h2 className='text-xl font-semibold text-gray-800 mb-2'>
                  {job.title}
                </h2>
                <p className='text-sm text-gray-600 mb-4'>
                  {job.description || "No description provided."}
                </p>
              </div>
              <button
                className='mt-auto w-full py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition cursor-pointer'
                onClick={() => handleViewDetails(job)}
              >
                View Details
              </button>
            </div>
          ))}
        </div>
        
        {popup && selectedJob && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">


            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              {selectedJob.title}
            </h2>
            <p className="text-gray-600 mb-4">
              <strong>Description:</strong> {selectedJob.description || "No description provided."}
            </p>
            <p className="text-gray-600 mb-4">
              <strong>Salary:</strong> {selectedJob.salary || "N/A"}
            </p>
            <p className="text-gray-600 mb-4">
              <strong>Location:</strong> {selectedJob.location || "N/A"}
            </p>
            <p className="text-gray-600 mb-6">
              <strong>Type:</strong> {selectedJob.type || "N/A"}
            </p>
            <button
              className="w-full py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition mb-2 cursor-pointer"
              onClick={() => navigate(`/candidate/apply/${selectedJob._id}`)}
            >
              Apply
            </button>

            <button
              className="w-full py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition cursor-pointer"
              onClick={handleClosePopup}
            >
              Close
            </button>
          </div>
        </div>
        )}
          
      </div>

    </>
  )
};

export default MainC;