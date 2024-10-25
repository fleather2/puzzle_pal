import React, {createContext, useState, useContext} from 'react';

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
}

export const AuthProvider = ( {children} ) => {
    const [user, setUser] = useState(null);

    const login = (userData) => {
        const data = new URLSearchParams({
            name: userData.name,
            password: userData.password
        })
        const requestOptions = {
            method: 'POST',
            //mode: 'no-cors',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded'},
            body: data
        }
        console.log(requestOptions);
        fetch("http://localhost:5000/authenticate_user", requestOptions)
        .then(response => {
            if (response.status >= 400 && response.status < 600) {
                throw new Error("Bad response from the server");
            }
            return response.text();
        })
        .then(username => {
            console.log(username, "logged in");
            setUser(username);
            //redirect("")
        })
        .catch(error => {
            console.error("Error:", error)
        });
    };

    const logout = () => {
        // Logic to log out user
        setUser(null);
    }

    return <AuthContext.Provider value = {{ user, login, logout }}>
        {children}
    </AuthContext.Provider>
}