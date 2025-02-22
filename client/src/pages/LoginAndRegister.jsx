import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginAndRegister = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate()
  const [error, setError] = useState('');

  const toggleFormType = () => {
    setIsLogin(!isLogin);
    setError('');
  };

  const handleRegister = async () => {
    try {
      const response = await axios.post('/api/v1/users/register', { name , email, password })
      console.log('Registration successful:', response.data)
      navigate('/dashboard')
    
    } catch (error) {
      console.error('Registration failed:', error)
     
    }
  }
  const handleLogin = async () => {
    try {
      const response = await axios.post('/api/v1/users/login', { email , password })
      
      console.log('Login successful:', response.data)
      localStorage.setItem('token', response.data.token)
      navigate('/dashboard')
    } catch (error) {
      console.error('Login failed:', error)
      alert('Login Failed. Incorrect email or password.')
    }
  }

  const handleSubmit = async (ev) => {
    ev.preventDefault()
    if (!isLogin) {
      handleRegister()
    } else {
      handleLogin()
    }
  }


  return (
    <div className='flex'>
      <section className='w-2/3 h-screen bg-blue-100'></section>
      <section className='w-1/3 h-screen bg-cyan-400 flex flex-col justify-center gap-10'>
        <div className='flex flex-col justify-center items-center'>
          <h2 className='text-2xl font-bold mb-3'>{isLogin ? 'Welcome Back!' : 'Create an Account'}</h2>
          <p className='mb-4'>{isLogin ? 'Please login to your account to continue.' : 'Please register to create a new account.'}</p>
        </div>
        <div className='flex justify-center'>
          <form onSubmit={handleSubmit} className='flex flex-col space-y-2'>
            {!isLogin && (
              <input
                type="text"
                value={name}
                onChange={(ev) => setName(ev.target.value)}
                placeholder='Enter your name'
               className="p-2 rounded-md border text-lg"
              />
            )}
            <input
              type="email"
              placeholder='Enter your Email'
              value={email}
              onChange={(ev) => setEmail(ev.target.value)}
              className="p-2 rounded-md border text-lg"
            />
            <input
              type="password"
              value={password}
              onChange={(ev) => setPassword(ev.target.value)}
              placeholder='Enter your password'
              className="p-2 rounded-md border text-lg"
            />
            <button type='submit' className="bg-blue-700 hover:bg-blue-600 p-2 rounded-md text-white text-lg transition-all">
              {isLogin ? 'Login' : 'Register'}
            </button>
            <button type='button' onClick={toggleFormType} className="text-blue-700 hover:underline">
              {isLogin ? "Don't have an account? Register" : 'Already have an account? Login'}
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default LoginAndRegister;