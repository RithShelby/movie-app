import {useEffect} from 'react';

const LocalStorage = ({setData}) => {
    useEffect(() => {
        // Get user data from localStorage
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setData(JSON.parse(storedUser));
        }
    }, []);
};

export default LocalStorage;