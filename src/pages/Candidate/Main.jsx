import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../../api/axios'

const MainC = () => {

const navigate = useNavigate();

const [jobs, setJobs] = useState([]);
const [apps, setApps] = useState([]);
const [selectedJob, setSelectedJob] = useState(null);
const [popup, setPopup] = useState(false);
const [view, setView] = useState("jobs");
const [shortlistedJobs, setShortlistedJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const resJob = await API.get("/jobs");
        setJobs(resJob.data.data);

        const resApp = await API.get("/candidate/application");
        setApps(resApp.data.data);

      } catch (err) {
        console.error("Error fetching jobs", err);
      }
    };
    fetchJobs();
  }, [view]);


  const handleViewDetails = (job) => {
    setSelectedJob(job);
    setPopup(true);
  };

  const handleClosePopup = () => {
    setPopup(false);
    setSelectedJob(null);
  };

  const handleShortlist = (jobId) => {
  if (shortlistedJobs.includes(jobId)) {
    setShortlistedJobs(shortlistedJobs.filter(id => id !== jobId));
  } else {
    setShortlistedJobs([...shortlistedJobs, jobId]);
  }
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
  <div className="flex bg-gray-100 min-h-screen">

      <aside className="w-64 bg-gray-800 text-white p-6">
        <h2 className="text-2xl font-bold mb-8">Dashboard</h2>
        <nav className="space-y-4">
          <button onClick={() => setView("jobs")}
            
            className={`w-full text-left px-4 py-2 rounded cursor-pointer ${view === "jobs" ? "bg-gray-700" : "hover:bg-gray-700"}`}
          >
            Jobs
          </button>
          <button onClick={() => setView("applications")}
            
            className={`w-full text-left px-4 py-2 rounded cursor-pointer ${view === "applications" ? "bg-gray-700" : "hover:bg-gray-700"}`}
          >
            My Applications
          </button>
        </nav>
      </aside>

  <div className="flex-1 p-6">
    {view === "jobs" && (<>
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
              <strong>Company:</strong> {selectedJob.company || "No company provided."}
            </p>
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
              className="w-full py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition mb-2 cursor-pointer"
              onClick={() => handleShortlist(selectedJob._id)}
            >
              {shortlistedJobs.includes(selectedJob._id) ? "Unshortlist" : "Shortlist"}
            </button>

            <button
              className="w-full py-2 rounded-lg bg-gray-200 text-black font-semibold hover:bg-gray-300 transition cursor-pointer"
              onClick={handleClosePopup}
            >
              Close
            </button>
          </div>
        </div>
        )}
        </>)}

        {view === "applications" && (<>

        <h1 className="text-4xl font-extrabold text-gray-800 mb-6 text-center">My Applications</h1>
          <ul className="space-y-4">
            {apps.map(app => (
              <li key={app._id} className="flex justify-evenly items-center bg-white shadow-md rounded-lg p-4 border border-gray-200">
                
                <div className="flex-1 text-lg font-semibold text-gray-800 mx-10">{jobs.find(job => job._id === app.job)?.title || "Unknown Title"}</div>
                <div className="flex-1 text-lg text-blue-400 text-center mx-10">{jobs.find(job => job._id === app.job)?.company || "Unknown Company"}</div>
                <div className="flex-1 text-lg text-gray-600 text-center mx-10">{app.status}</div>
              </li>
            ))}
          </ul>
        </>)}

      </div>
        
        
</div>
          

    </>
  )
};

export default MainC;