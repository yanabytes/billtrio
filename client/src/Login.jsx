import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3001/login', { email, password });
            console.log(response.data);
            if (response.data === "Success") {
                navigate('/home');
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
            <div className="bg-white p-3 rounded w-25">
                <h2>Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            placeholder="Enter Email"
                            autoComplete="off"
                            name="email"
                            className="form-control rounded-0"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            placeholder="Enter Password"
                            autoComplete="off"
                            name="password"
                            className="form-control rounded-0"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button type="submit" className="btn btn-success w-100 rounded-0">
                        Login
                    </button>
                </form>
                <p>Don't have an account? <Link to="/register">Register</Link></p>
            </div>
        </div>
    );
}

export default Login;
