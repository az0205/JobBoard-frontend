import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home.jsx";

import RegisterR from "./pages/Recruiter/Register.jsx";
import LoginR from "./pages/Recruiter/Login.jsx";
import MainR from "./pages/Recruiter/Main.jsx";
import JobForm from "./pages/Recruiter/JobForm.jsx";
import EditJob from "./pages/Recruiter/EditJob.jsx";

import RegisterC from "./pages/Candidate/Register.jsx";
import LoginC from "./pages/Candidate/Login.jsx";
import MainC from "./pages/Candidate/Main.jsx";
import Apply from "./pages/Candidate/Apply.jsx";

import LoginA from "./pages/Admin/Login.jsx";
import MainA from "./pages/Admin/Main.jsx";

function App() {

  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<Home />} />
          <Route path="recruiter/main" element={<MainR />} />
          <Route path="recruiter/register" element={<RegisterR />} />
          <Route path="recruiter/login" element={<LoginR />} />
          <Route path="recruiter/jobform" element={<JobForm />} />
          <Route path="recruiter/editjob/:id" element={<EditJob />} />

          <Route path="candidate/register" element={<RegisterC />} />
          <Route path="candidate/login" element={<LoginC />} />
          <Route path="candidate/main" element={<MainC />} />
          <Route path="candidate/apply/:jobId" element={<Apply />} />

          <Route path="admin/login" element={<LoginA />} />
          <Route path="admin/main" element={<MainA />} />
        </Route>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
