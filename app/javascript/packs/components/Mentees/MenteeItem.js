import React,{useEffect, useState} from "react";
import DashboardNavbar from "../Menu/DashboardNavBar";
import Sidebar from "../Menu/Sidebar";
import UserItem from "../Users/UserItem";


const MenteeItem = props => {
  return (
    <UserItem callLink={`mentee/call/${props.mentee.username}`} profileLink={`/profile/${props.mentee.username}`} profile={props.mentee}/>
  );
}

export default MenteeItem
