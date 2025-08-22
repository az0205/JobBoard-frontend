import { useNavigate} from 'react-router-dom';
import {Link} from 'react-router-dom';
import {useRef} from 'react';
import API from '../../api/axios';

const RegisterC = () => {
    const navigate = useNavigate();

    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();

    const handleRegister = async(e) => {

        e.preventDefault();

        const name = nameRef.current.value;
        const email = emailRef.current.value;
        const password = passwordRef.current.value;

        /*const emailPattern = `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`;
        if (!emailPattern.test(email)) {
            alert("Please enter a valid email address");
        }

        const passwordPattern = `/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/`;
        if (!passwordPattern.test(password)) {
            alert("Password must be at least 8 characters long, include uppercase, lowercase, a number, and a special symbol.");
        }*/

        try {
            await API.post("/candidate/register", { name, email, password });

            navigate("/candidate/login");
        }
        catch(err){
            alert("User with this email already exists")
        }
    }
    


    return (
<>
    <header className='bg-white shadow-md'>
    <div class="logo"></div>
    <nav className='space-x-6  mx-auto flex justify-between items-center p-4'>
      <Link to="/" class='nav' className= 'mx-10 text-gray-700 hover:text-blue-600 text-2xl'>Home</Link>
      <Link to="/recruiter/login" class='nav' className= 'mx-10 text-gray-700 hover:text-blue-600 text-2xl'>Recruiter</Link>
      <Link to="/candidate/login" class='nav' className= 'mx-10 text-gray-700 hover:text-blue-600 text-2xl'>Login</Link>
      
    </nav>
    </header>

        <div class = 'formPage' className='flex flex-col items-center justify-center h-[91vh] bg-gray-100'>
            <div className='bg-white shadow-lg rounded-xl p-8 w-150'>
<h1 className='text-3xl font-extrabold text-gray-800 mb-6 text-center'> Candidate <span className="text-blue-600">Register</span></h1>
            <form onSubmit= {handleRegister} className='space-y-4'>
                <input type="text" placeholder="Name" ref={nameRef} required className='w-full px-4 py-2 border-2 rounded-lg border-gray-300'/><br />
                <input type="email" placeholder="Email" ref={emailRef} required  className='w-full px-4 py-2 border-2 rounded-lg border-gray-300'/><br />
                <input type="password" placeholder="Password" ref={passwordRef} required className='w-full px-4 py-2 border-2 rounded-lg border-gray-300' /><br />
                <button type="submit" className='w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition cursor-pointer'>Register</button>
            </form>
            <br/>
            <p className='mt-6 text-gray-600 text-center'> Already have an account?</p>
            <button className='w-full mt-2 text-blue-600 hover:text-blue-800 transition cursor-pointer' onClick={() => navigate('/candidate/login')}>Login</button>
            </div>
        </div>
        </>
    )
};

export default RegisterC;