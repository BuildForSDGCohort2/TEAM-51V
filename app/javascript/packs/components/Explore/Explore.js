import { faHourglass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import UserStore from "../Auth/UserStore";
import MiniHeader from "../Dashboard/MiniHeader";
import DashboardNavbar from "../Menu/DashboardNavBar";
import Sidebar from '../Menu/Sidebar'
import UserItem from "../Users/UserItem";


export default function Explore() {
  const [users, setUsers] = useState([])
  const [progress, setProgress] = useState(true)

  useEffect(() => {
    console.log(UserStore.getUser());
    fetch('/api/v1/users', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authentication': `Bearer ${UserStore.getUser().auth_token}`
        // 'X-CSRF-TOKEN': document.querySelector('[name=csrf-token]').content,
      }
    }).then((response) => {
      if (response.ok) {
        return response.json()
      }
    })
      .then((data) => {
        if (data) {
          setUsers(data)
        }
      }
      ).catch((error) => {
        console.log(error);
        Toast.fire({
          icon: 'error',
          title: 'Incorrect email or password'
        })
      }).finally(() => setProgress(false))
  }, [])
  return (
    <>
      <Sidebar />
      <MiniHeader >
        <div className="flex flex-wrap bg-gray-200">
          {progress && <FontAwesomeIcon icon={faHourglass} />}
          {users.length == 0 && <div className="w-2/3 self-center">You have no users yet</div>}
          {users.map((profile) =>
            <UserItem profile={profile} key={profile.id} />
          )}
        </div>
      </MiniHeader>
    </>
  );
}
