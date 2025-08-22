import { useNavigate, useParams} from 'react-router-dom';
import {useRef} from 'react';
import API from '../../api/axios';

const Apply = () => {
    const navigate = useNavigate();
    const { jobId } = useParams();

    const skillsRef = useRef();
    const resumeRef = useRef();

    const handleForm = async(e) => {

        e.preventDefault();

        const formData = new FormData();
        formData.append("jobId", jobId);
        formData.append("skills", skillsRef.current.value);
        formData.append("resume", resumeRef.current.files[0]);

        try {
            await API.post("/application", formData);

            alert("Application submitted");
            navigate("/candidate/main");
        }
        catch(err){
            alert("Failed to create application")
        }
    }
    


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

        <div class = 'formPage' className='flex flex-col items-center justify-center h-[91vh] bg-gray-100'>
            <div className='bg-white shadow-lg rounded-xl p-8 w-150'>
            <h1 className='text-3xl font-extrabold text-blue-600 mb-6 text-center'>Application</h1>
            <form className='space-y-4' onSubmit= {handleForm}>
                <input type="text" placeholder="Skills (e.g. JavaScript, React, Node.js)" ref={skillsRef} required className='w-full px-4 py-2 border-2 rounded-lg border-gray-300'/><br />
                <label className=" font-semibold text-gray-600 px-2">Upload Resume: </label><br/>
                <input type="file" ref={resumeRef} required className='w-full px-4 py-2 border-gray-300 rounded-lg mt-2 text-black file:text-bold bg-gray-200  cursor-pointer hover:bg-gray-300'/><br /><br />
                <button className='w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition cursor-pointer' type="submit">Submit Application</button>
            </form>
            <button className='w-full py-2 mt-2 rounded-lg bg-gray-200 text-gray-800 hover:bg-gray-300 transition cursor-pointer' onClick={()=>{navigate("/candidate/main")}}>Cancel</button>
            <br/>
            </div>
        </div>
        </>
    )
};

export default Apply;