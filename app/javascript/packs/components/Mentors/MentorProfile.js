import React from "react";
import MiniHeader from "../Dashboard/MiniHeader";
import DashboardNavbar from "../Menu/DashboardNavBar";
import Sidebar from '../Menu/Sidebar'

import MentorItem from "./MentorItem";

export default function MentorsPage() {
  return (
    <>
      <Sidebar />
      <MiniHeader >
      <div className="flex flex-wrap bg-gray-200">
      <MentorItem />
      </div>
        </MiniHeader>
    </>
  );
}
