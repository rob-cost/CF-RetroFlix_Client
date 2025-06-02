import React from "react";
import { useState } from "react";

export const SignupView = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [birthday, setBirthday] = useState('');
    const [city, setCity] = useState('');
    

    const handleSubmit = (event) => {
        event.preventDefault();

        const data = {
            Username: username,
            Password: password,
            Email: email,
            Birthday: birthday,
            City: city
        };

        fetch ('https://my-vintage-flix-06cde8de3bcb.herokuapp.com/users', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            },
        })
        .then((response)=> {
            if(response.ok) {
                alert('Signup successful');
                window.location.reload();
            } else {
                alert('Signup failed')
            }
        })
    };
    return(
        <form onSubmit={handleSubmit}>
            <label>
                Username
                <input 
                    type="text"
                    value={username}
                    onChange={(e)=> setUsername(e.target.value)}
                    required
                    minLength="3"
                    />
                </label>
            <label>
                Password
                <input 
                    type="password"
                    value={password}
                    onChange={(e)=> setPassword(e.target.value)}
                    required
                    />
                </label>
            <label>
                E-mail
                <input 
                    type="email"
                    value={email}
                    onChange={(e)=> setEmail(e.target.value)}
                    required
                    />
                </label>
            <label>
                Birthday
                <input 
                    type="date"
                    value={birthday}
                    onChange={(e)=> setBirthday(e.target.value)}
                    required
                    />
                </label>
            <label>
                City
                <input 
                    type="text"
                    value={city}
                    onChange={(e)=> setCity(e.target.value)}
                    />
                </label>
            <button type="submit">Submit</button>
        </form>
    )
}