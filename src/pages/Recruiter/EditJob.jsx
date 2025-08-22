import { useNavigate, useParams } from 'react-router-dom';
import {useRef, useEffect} from 'react';
import API from '../../api/axios';

const EditJob = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    const titleRef = useRef();
    const descRef = useRef();
    const salaryRef = useRef();
    const locationRef = useRef();
    const typeRef = useRef();

    useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await API.get(`/jobs/${id}`);
        const job = res.data.data;

        titleRef.current.value = job.title;
        descRef.current.value = job.description;
        salaryRef.current.value = job.salary;
        locationRef.current.value = job.location;
        typeRef.current.value = job.type;
      } catch (err) {
        alert("Failed to load job details");
      }
    };
    fetchJob();
    }, [id]);


    const handleForm = async(e) => {

        e.preventDefault();

        const title = titleRef.current.value;
        const description = descRef.current.value;
        const salary = salaryRef.current.value;
        const location = locationRef.current.value;
        const type = typeRef.current.value;

        try {
            await API.put(`/jobs/${id}`, { title, description, salary, location, type });

            navigate("/recruiter/main");
        }
        catch(err){
            alert(err.response.data.message || "Failed to update job")
        }
    }
    


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

        <div class = 'formPage' className='flex flex-col items-center justify-center h-[91vh] bg-gray-100'>
            <div className='bg-white shadow-lg rounded-xl p-8 w-150'>
            <h1 className='text-3xl font-extrabold text-blue-600 mb-6 text-center'>Edit Job</h1>
            <form className='space-y-4' onSubmit= {handleForm}>
                <input type="text" placeholder="Title" ref={titleRef} required className='w-full px-4 py-2 border-2 rounded-lg border-gray-300'/><br />
                <input type="text" placeholder="Description" ref={descRef} required className='w-full px-4 py-2 border-2 rounded-lg border-gray-300'/><br />
                <input type="number" placeholder="Salary ($)" ref={salaryRef} required className='w-full px-4 py-2 border-2 rounded-lg border-gray-300'/><br />
                <input type="text" placeholder="Location" ref={locationRef} required className='w-full px-4 py-2 border-2 rounded-lg border-gray-300'/><br />
                <input type="text" placeholder="Type (Part-time, Full-time, etc.)" ref={typeRef} required className='w-full px-4 py-2 border-2 rounded-lg border-gray-300'/><br />
                <button className='w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition cursor-pointer' type="submit">Save</button>
            </form>
            <button className='w-full py-2 mt-2 rounded-lg bg-gray-200 text-gray-800 hover:bg-gray-300 transition cursor-pointer' onClick={()=>{navigate("/recruiter/main")}}>Cancel</button>
            <br/>
            </div>
        </div>
        </>
    )
};

export default EditJob;

