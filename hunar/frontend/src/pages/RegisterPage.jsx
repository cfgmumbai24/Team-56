import { useState } from "react";
import Layout from '../Layout';
import './RegisterPage.css'; // Import your CSS file for styling
export default function RegisterPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [grade, setGrade] = useState('');

    function register(event) {
        event.preventDefault();
        console.log('registered', { username, password, grade });
        // You can add your API call here to send the data to the server
    }

    return (
        <>
        <Layout/>
        <div className="register-container">
            <form className="register-form" onSubmit={register}>
                <h2 className="register_heading">Register</h2>
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
