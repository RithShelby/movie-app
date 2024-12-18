import React, { useState } from 'react';
import LocalStorage from "../../../helper/LocalStorage";
import {useAuth} from "../core/hook";

const UserPage = () => {
    const [user, setUser] = useState(null);
    const {OnLogout} = useAuth();
    return (
        <div className="py-36 text-white">
            <LocalStorage
                setData={setUser}
            />
            {user && (
                <div>
                    <p className="text-3xl">Welcome , {user.name} 👋</p>
                    <button onClick={OnLogout} className="btn btn-error">
                        Logout
                    </button>
                </div>
            )}
        </div>
    );
};

export default UserPage;
