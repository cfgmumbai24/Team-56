import { useState } from "react";

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
        <form onSubmit={register}>
            <div>
                <label>Username:</label>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Password:</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Grade:</label>
                <input
                    type="text"
                    value={grade}
                    onChange={(e) => setGrade(e.target.value)}
                    required
                />
            </div>
            <button type="submit">Register</button>
        </form>
    );
}
