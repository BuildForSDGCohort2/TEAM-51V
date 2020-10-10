import React from "react";
import MiniHeader from "../Dashboard/MiniHeader";
import DashboardNavbar from "../Menu/DashboardNavBar";
import Sidebar from '../Menu/Sidebar'

import MenteeItem from "./MenteeItem";

export default function MenteeProfile() {
  return (
    <>
      <Sidebar />
      <MiniHeader >
      <div className="flex flex-wrap bg-gray-200">
      <MenteeItem />
      </div>
        </MiniHeader>
    </>
  );
}
