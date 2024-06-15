import axios from 'axios';
import { useState } from "react";
import Layout from "../Layout";
import './LoginPage.css'; // Import your CSS file for styling

export default function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    async function login(event) {
        event.preventDefault();
        setError('');

        try {
            const response = await axios.post('http://localhost:5000/api/login', {
                username,
                password
            });

            const data = response.data;

            if (response.status === 200) {
                console.log('Logged in:', data);
                // Store the token in local storage
                localStorage.setItem('token', data.token);
                // Redirect to a protected route or dashboard
                window.location.href = '/dashboard'; // Adjust the path as needed
            } else {
                setError(data.message);
            }
        } catch (error) {
            if (error.response) {
                setError(error.response.data.message);
            } else {
                setError('An error occurred while logging in.');
            }
            console.error('Error:', error);
        }
    }

    return (
        <>
            <Layout />
            <div className="login-container">
                <form className="login-form" onSubmit={login}>
                    <div className="form-group">
                        <h2 className='login_heading'>Login</h2>
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
                    <button type="submit">Login</button>
                    {error && <p className="error">{error}</p>}
                </form>
            </div>
        </>
    );
}
