import React,{useEffect, useState} from "react";
import DashboardNavbar from "../Menu/DashboardNavBar";
import Sidebar from "../Menu/Sidebar";
import UserItem from "../Users/UserItem";


const MentorItem = props => {
  return (
    <UserItem callLink={`mentor/call/${props.mentor.username}`} profileLink={`/profile/${props.mentor.username}`} profile={props.mentor}/>
  );
}

export default MentorItem
