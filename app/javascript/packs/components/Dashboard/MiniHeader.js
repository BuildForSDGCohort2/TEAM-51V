import React from 'react'
import DashboardNavbar from "../Menu/DashboardNavBar";

export default function MiniHeader(props) {
    return (
        <div className="relative md:ml-64 bg-gray-200">
            <DashboardNavbar transparent={true} />
            {/* Header */}
            <div className="relative bg-pink-600 md:pt-32  pt-5">
                <div className="px-4 md:px-10 mx-auto w-full">
                </div>
            </div>

            {props.children}
        </div>
    )
}