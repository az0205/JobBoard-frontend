import { useNavigate } from 'react-router-dom';
import {Link} from 'react-router-dom'

function Home() {
  const navigate = useNavigate();

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

    <div class = "homepage" className="flex flex-col items-center justify-center h-[91vh] bg-gray-100">
      <h1 className="my-20 text-5xl font-extrabold text-gray-800 mb-6">
          Welcome to <br/><span className="text-blue-600">JobFinder</span>
        </h1>
      <div className='my-30 text-4xl space-x-6'>
      <button class = 'homebuttonL' className='px-6 py-3 text-lg font-semibold rounded-xl bg-blue-600 text-white hover:bg-blue-700 shadow-md transition cursor-pointer w-50 my-5 h-15' onClick={() => navigate('/candidate/login')}>Candidate Login</button><br/>
      <button class = 'homebuttonR' className= 'px-6 py-3 text-lg font-semibold rounded-xl bg-gray-200 text-gray-800 hover:bg-gray-300 shadow-md transition cursor-pointer w-50 h-15' onClick={() => navigate('/recruiter/login')}>Recruiter Login</button>
      </div>
    </div>
    </>
  );
}

export default Home;