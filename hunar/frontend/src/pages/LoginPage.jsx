import { useState } from "react";
import Layout from "../Layout";
import './LoginPage.css'; // Import your CSS file for styling

export default function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    function login(event) {
        event.preventDefault();
        console.log('logged in', { username, password });
        // You can add your API call here to send the data to the server
    }

    return (
        <>
        <Layout/>
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
            </form>
        </div>
        </>
    );
}
