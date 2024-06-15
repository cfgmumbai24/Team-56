import axios from 'axios';
import { useState } from "react";
import Layout from '../Layout';
import './RegisterPage.css'; // Import your CSS file for styling

export default function RegisterPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [grade, setGrade] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    async function register(event) {
        event.preventDefault();
        setError('');
        setSuccess('');

        try {
            const response = await axios.post('http://localhost:5000/api/signup', {
                username,
                password,
                grade
            });

            const data = response.data;

            if (response.status === 201) {
                console.log('Registered:', data);
                setSuccess('Registration successful');
                // Store the token in local storage
                localStorage.setItem('token', data.token);
                // Handle successful registration, e.g., redirect to dashboard
            } else {
                setError(data.message);
            }
        } catch (error) {
            if (error.response) {
                setError(error.response.data.message);
            } else {
                setError('An error occurred while signing up.');
            }
            console.error('Error:', error);
        }
    }

    return (
        <>
            <Layout />
            <div className="register-container">
                <form className="register-form" onSubmit={register}>
                    <h2 className="register_heading">Register</h2>
                    {error && <p className="error">{error}</p>}
                    {success && <p className="success">{success}</p>}
                    <div className="form-group">
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Username"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="text"
                            value={grade}
                            onChange={(e) => setGrade(e.target.value)}
                            placeholder="Grade"
                            required
                        />
                    </div>
                    <button type="submit">Register</button>
                </form>
            </div>
        </>
    );
}
