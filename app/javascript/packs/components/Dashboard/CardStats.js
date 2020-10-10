import React, { useEffect, useState } from 'react'


export default function CardStats(props) {
    const [users, setUsers] = useState([])
    const [progress, setProgress] = useState(true)

    useEffect(() => {

      fetch('/api/v1/stats', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        //   'Authentication': `Bearer ${UserStore.getUser().auth_token}`
          // 'X-CSRF-TOKEN': document.querySelector('[name=csrf-token]').content,
        }
      }).then((response) => {
        if (response.ok) {
          return response.json()
        }
      })
        .then((data) => {
          if (data) {
              console.log("cardstast",data);
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
        <div className="flex flex-wrap">
            <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <div className="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg">
                    <div className="flex-auto p-4">
                        <div className="flex flex-wrap">
                            <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                                <h5 className="text-gray-500 uppercase font-bold text-xs">
                                    Mentees
                                </h5>
                                <span className="font-semibold text-xl text-gray-800">
                                    35
                                </span>
                            </div>
                            <div className="relative w-auto pl-4 flex-initial">
                                <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full bg-red-500">
                                    <i className="far fa-chart-bar"></i>
                                </div>
                            </div>
                        </div>
                        <p className="text-sm text-gray-500 mt-4">
                            <span className="text-green-500 mr-2">
                                <i className="fas fa-arrow-up"></i>
                                3.48%
                            </span>
                            <span className="whitespace-no-wrap">
                                Since last month
                            </span>
                        </p>
                    </div>
                </div>
            </div>
            <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <div className="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg">
                    <div className="flex-auto p-4">
                        <div className="flex flex-wrap">
                            <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                                <h5 className="text-gray-500 uppercase font-bold text-xs">
                                    New mentees
                  </h5>
                                <span className="font-semibold text-xl text-gray-800">
                                    2
                  </span>
                            </div>
                            <div className="relative w-auto pl-4 flex-initial">
                                <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full bg-orange-500">
                                    <i className="fas fa-chart-pie"></i>
                                </div>
                            </div>
                        </div>
                        <p className="text-sm text-gray-500 mt-4">
                            <span className="text-red-500 mr-2">
                                <i className="fas fa-arrow-down"></i> 3.48%
                </span>
                            <span className="whitespace-no-wrap">
                                Since last week
                </span>
                        </p>
                    </div>
                </div>
            </div>
            <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <div className="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg">
                    <div className="flex-auto p-4">
                        <div className="flex flex-wrap">
                            <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                                <h5 className="text-gray-500 uppercase font-bold text-xs">
                                    Calls
                  </h5>
                                <span className="font-semibold text-xl text-gray-800">
                                    924
                  </span>
                            </div>
                            <div className="relative w-auto pl-4 flex-initial">
                                <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full bg-pink-500">
                                    <i className="fas fa-users"></i>
                                </div>
                            </div>
                        </div>
                        <p className="text-sm text-gray-500 mt-4">
                            <span className="text-orange-500 mr-2">
                                <i className="fas fa-arrow-down"></i> 1.10%
                </span>
                            <span className="whitespace-no-wrap">
                                Since yesterday
                </span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}