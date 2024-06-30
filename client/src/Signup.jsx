import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Signup() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3001/register', { name, email, password });
            console.log(response.data);
            navigate('/login');
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
            <div className="bg-white p-3 rounded w-25">
                <h2>Register</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            placeholder="Enter Name"
                            autoComplete="off"
                            name="name"
                            className="form-control rounded-0"
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
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
                        Register
                    </button>
                </form>
                <p>Already have an account? <Link to="/login">Login</Link></p>
            </div>
        </div>
    );
}

export default Signup;
