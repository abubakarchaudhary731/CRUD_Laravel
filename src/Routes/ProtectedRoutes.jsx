import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Protected(props){
    const navigate = useNavigate();
    const { Component } = props;
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const isLogin = localStorage.getItem('token');
        setIsLoggedIn(!!isLogin); // Convert string to boolean
        if (!isLogin) {
            navigate('/signin');
        }
    }, [navigate]);

    return isLoggedIn ? <Component /> : null;
}

export default Protected;