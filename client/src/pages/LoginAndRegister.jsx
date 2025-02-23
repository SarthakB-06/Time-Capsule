import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginAndRegister = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const toggleFormType = () => {
    setIsLogin(!isLogin);
    setError('');
  };

  const handleRegister = async () => {
    try {
      const response = await axios.post('/api/v1/users/register', { name, email, password });
      console.log('Registration successful:', response.data);
      navigate('/dashboard');
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post('/api/v1/users/login', { email, password });
      console.log('Login successful:', response.data);
      localStorage.setItem('token', response.data.token);
      navigate('/dashboard');
    } catch (error) {
      console.error('Login failed:', error);
      alert('Login Failed. Incorrect email or password.');
    }
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    if (!isLogin) {
      handleRegister();
    } else {
      handleLogin();
    }
  };

  return (
    <div className='flex flex-col md:flex-row min-h-screen'>
      <section className="hidden md:flex md:w-1/2 bg-white  flex-col justify-center items-center p-7">
        <h1 className="text-4xl font-bold">Welcome to Time Capsule</h1>
        <p className="text-lg mt-4">Store your memories securely and relive them later.</p>
        <img src="/assets/timecapsule.png" alt="Time Capsule" className="mt-6 w-3/4" />
        <p className="text-md mt-4">Create a time capsule to preserve your precious moments and unlock them in the future.</p>
        <button className="mt-6 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-gray-400 transition">
          Learn More
        </button>
      </section>
      <section 
        className='w-full md:w-1/2 h-screen flex flex-col justify-center gap-10 p-6 md:p-0'
        style={{
          backgroundImage: 'url(/assets/nature1.jpeg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className='flex justify-center'>
          <div className='h-auto w-full md:w-1/2 bg-gray-400 flex flex-col justify-center items-center p-5 rounded-md bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10 border border-gray-100'>
            <div className='flex flex-col justify-center items-center text-center'>
              <h2 className='text-2xl text-white font-bold mb-3'>{isLogin ? 'Welcome Back!' : 'Create an Account'}</h2>
              <p className='text-white mb-4'>{isLogin ? 'Please login to your account to continue.' : 'Please register to create a new account.'}</p>
            </div>
            <form onSubmit={handleSubmit} className='flex flex-col space-y-2 w-full'>
              {!isLogin && (
                <input
                  type="text"
                  value={name}
                  onChange={(ev) => setName(ev.target.value)}
                  placeholder='Enter your name'
                  className="p-2 rounded-md border text-lg w-full"
                />
              )}
              <input
                type="email"
                placeholder='Enter your Email'
                value={email}
                onChange={(ev) => setEmail(ev.target.value)}
                className="p-2 rounded-md border text-lg w-full"
              />
              <input
                type="password"
                value={password}
                onChange={(ev) => setPassword(ev.target.value)}
                placeholder='Enter your password'
                className="p-2 rounded-md border text-lg w-full"
              />
              <button type='submit' className="bg-blue-700 hover:bg-blue-600 p-2 rounded-md text-white text-lg transition-all">
                {isLogin ? 'Login' : 'Register'}
              </button>
              <button type='button' onClick={toggleFormType} className="text-white hover:underline">
                {isLogin ? "Don't have an account? Register" : 'Already have an account? Login'}
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LoginAndRegister;
