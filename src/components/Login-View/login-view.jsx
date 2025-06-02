import React from 'react'
import { useState } from 'react';



export const LoginView = ({onLoggedIn}) => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();

        const data = {
            Username: username,
            Password: password
        }
        fetch('https://my-vintage-flix-06cde8de3bcb.herokuapp.com/login', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("Login response: ", data);
                if(data.User) {
                    localStorage.setItem("user", JSON.stringify(data.User));
                    localStorage.setItem("token", data.Token);
                    onLoggedIn(data.User, data.Token);
                } else {
                    alert ('User does not exist')
                }
            })
            .catch ((e) => {
                alert('Something is wrong' + e);
            });
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Username:
                <input
                    type='text'
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
            </label>
            <label>
                Password:
                <input
                    type='password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </label>
            <button type='submit'>Login</button>
        </form>
    )
}