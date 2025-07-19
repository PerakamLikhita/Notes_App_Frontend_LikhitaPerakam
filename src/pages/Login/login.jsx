import React, { useState } from 'react';
import Navbar from '../../components/navbar';
import { Link, useNavigate } from 'react-router-dom';
import Passwordinput from '../../components/input/Passwordinput';
import { validateEmail } from '../../utils/helper';
import axiosInstance from '../../utils/axiosinstance';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }

    if (!password) {
      setError("Please enter your password");
      return;
    }

    setError("");

    try {
      const response = await axiosInstance.post("/login", {
        email,
        password,
      });

      if (response.status === 200 && response.data.accessToken) {
        localStorage.setItem("token", response.data.accessToken);
        navigate("/dashboard");
      }
    } catch (error) {
      if (error.response?.data?.message) {
        setError(error.response.data.message);
      } else {
        setError("An unexpected error occurred. Please try again later.");
      }
    }
  };

  return (
    <>
      <Navbar />
      <div className='flex items-center justify-center min-h-[80vh] px-4'>
        <div className='w-full max-w-sm p-8 bg-white border rounded-2xl shadow-md'>
          <form onSubmit={handleLogin} className="space-y-5">
            <h2 className="text-2xl font-semibold text-center text-slate-800">
              Welcome Back
            </h2>

            <div>
              <input
                type="text"
                placeholder="Email"
                className="w-full px-4 py-2 text-sm border rounded-md outline-none focus:ring-2 ring-blue-400"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <Passwordinput
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {error && <p className="text-sm text-red-500">{error}</p>}

            <button
              type="submit"
              className="w-full py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors"
            >
              Login
            </button>
          </form>

          <p className="mt-4 text-sm text-center text-slate-600">
            Not registered yet?{" "}
            <Link
              to="/signup"
              className="font-medium text-blue-600 underline hover:text-blue-800"
            >
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;
