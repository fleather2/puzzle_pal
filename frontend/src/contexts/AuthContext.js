import React, {createContext, useState, useContext} from 'react';

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
}

export const AuthProvider = ( {children} ) => {
    const [user, setUser] = useState(null);

    const login = (userData) => {
        // TODO logic to authenticate user and st user data
        setUser(userData);
    };

    const logout = () => {
        // Logic to log out user
        setUser(null);
    }

    return <AuthContext.Provider value = {{ user, login, logout }}>
        {children}
    </AuthContext.Provider>
}