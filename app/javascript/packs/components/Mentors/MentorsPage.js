import { faHourglass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import UserStore from "../Auth/UserStore";
import MiniHeader from "../Dashboard/MiniHeader";
import DashboardNavbar from "../Menu/DashboardNavBar";
import Sidebar from '../Menu/Sidebar'

import MentorItem from "./MentorItem";

export default function MentorsPage() {
  const [mentors, setMentors] = useState([])
  const [progress, setProgress] = useState(true)

  useEffect(() => {
    console.log(UserStore.getUser());
    fetch('/api/v1/mentors', {
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
          setMentors(data)
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
          {mentors.length == 0 && <div className="w-2/3 self-center">You have no mentors yet</div>}
          {mentors.map((mentor) =>
            <MentorItem mentor={mentor} key={mentor.id} />
          )}
        </div>
      </MiniHeader>
    </>
  );
}
