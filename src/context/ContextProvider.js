import React, { useState, useEffect } from "react";
import UserContext from "./UserContext";

const ContextProvider = ({
    children
}) => {
    const [user, setUser] = useState(JSON.parse(window.sessionStorage.getItem('user')));
    
    useEffect(()=>{
        window.sessionStorage.setItem('user', JSON.stringify(user));
    });

    return(
        <UserContext.Provider value={{user, setUser}}>
          {children}
        </UserContext.Provider>
    );
}

export default ContextProvider;