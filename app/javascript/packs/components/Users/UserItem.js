import { faEye, faPhone } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import UserStore from "../Auth/UserStore";

export default function UserItem(props) {
    const profile = props.profile;

    let history = useHistory();
    const [user, setUser] = useState({})
    useEffect(() => {
        if (UserStore.getUser()) {
            setUser(UserStore.getUser())
            console.log('user',user);
        }
    }, [])
    return (
        <div className="md:flex bg-white border-gray-100 border rounded-lg p-6 m-5">
            <img className="h-16 w-16 md:h-24 md:w-24 rounded-full mx-auto md:mx-0 md:mr-6" src={require("../../assets/img/team-1-800x800.jpg")} />
            <div className="text-center md:text-left">
    <h2 className="text-lg">{profile.first_name} {profile.last_name}</h2>
                {/* <div className="text-purple-500">Product Engineer</div> */}
    <div className="text-gray-600">{profile.email}</div>
                {/* <div className="text-gray-600">(555) 765-4321</div> */}
                <div className="text-center mt-2">
{user?.id != profile.id && <Link to={`/start/meeting/${profile.username}`} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mr-3 rounded">
                        <FontAwesomeIcon rotation={90} icon={faPhone} className="mr-2" />
                        <span>Call</span>
                    </Link>}
                    <Link to={`/profile/${profile.username}`} className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                        <FontAwesomeIcon  icon={faEye} className="mr-2" />
                        View
                        </Link>
                </div>
            </div>
        </div>
    );
}