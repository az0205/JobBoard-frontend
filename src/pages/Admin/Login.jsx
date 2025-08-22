import { useNavigate } from 'react-router-dom';
import {useRef} from 'react';
import {Link} from 'react-router-dom'
import API from '../../api/axios';

const LoginA = () => {
    
    const navigate = useNavigate();

    const emailRef = useRef();
    const passwordRef = useRef();

    const handleLogin = async(e) => {
        e.preventDefault();

        const email = emailRef.current.value;
        const password = passwordRef.current.value;

        if (!email || !password) {
        return alert("Please fill in all fields");
        }

        try {
            const res = await API.post("/admin/login", { email, password });

            localStorage.setItem("token", res.data.token);
            navigate("/admin/main");
        }

        catch (err) {
            alert('Invalid credentials!');
        }
    };

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
<h1 className='text-3xl font-extrabold text-gray-800 mb-6 text-center'> Admin <span className="text-blue-600">Login</span></h1>
            <form onSubmit={handleLogin} className='space-y-4'>
            <input type="email" placeholder="Email" ref={emailRef} required className='w-full px-4 py-2 border-2 rounded-lg border-gray-300'/><br />
            <input type="password" placeholder="Password" ref={passwordRef} required className='w-full px-4 py-2 border-2 rounded-lg border-gray-300'/><br />
            <button type="submit" className='w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition cursor-pointer'>Login</button>
        </form>
        </div>
        </div>
        </>
    )
};

export default LoginA;