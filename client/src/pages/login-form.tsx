import { useState, FormEvent, ChangeEvent } from "react";
import { useNavigate } from 'react-router-dom'; // ✅ import navigate

import Auth from '../utils/auth-service';
import { login } from "../api/auth-api";

const Login = () => {
  const [loginData, setLoginData] = useState({
    username: '',
    password: ''
  });

  const navigate = useNavigate(); // ✅ use navigate from React Router

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const data = await login(loginData);
      Auth.login(data.token, navigate); // ✅ pass navigate to Auth.login
    } catch (err) {
      console.error('Failed to login', err);
    }
  };

  return (
    <div className='form-container'>
      <form className='form' onSubmit={handleSubmit}>
        <h1>Login</h1>
        <label>Username</label>
        <input 
          type='text'
          name='username'
          value={loginData.username || ''}
          onChange={handleChange}
        />
        <label>Password</label>
        <input 
          type='password'
          name='password'
          value={loginData.password || ''}
          onChange={handleChange}
        />
        <button type='submit'
        className="btn"
        >Login</button>
      </form>
    </div>
  );
};

export default Login;

