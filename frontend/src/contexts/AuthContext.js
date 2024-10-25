import React, {createContext, useState, useContext} from 'react';

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
}

export const AuthProvider = ( {children} ) => {
    const [user, setUser] = useState(null);

    async function executeLogin(requestOptions) {
        return fetch("http://localhost:5000/authenticate_user", requestOptions)
        .then(response => {
            if (response.status >= 400 && response.status < 600) {
                throw new Error("Bad response from the server");
            }
            return response.text();
        })
        .then(username => {
            console.log(username, "logged in");
            setUser(username);
            return true;
        })
        .catch(error => {
            console.error("Error:", error)
            return false;
        });
    }
    
    async function login(userData) {
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
        const logged_in = await executeLogin(requestOptions);
        console.log(logged_in);
        
        return logged_in;
    }

    const logout = () => {
        // Logic to log out user
        setUser(null);
    }

    return <AuthContext.Provider value = {{ user, login, logout }}>
        {children}
    </AuthContext.Provider>
}