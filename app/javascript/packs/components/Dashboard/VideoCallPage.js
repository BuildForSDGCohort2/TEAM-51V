import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import AgoraRTC from 'agora-rtc-sdk';
// import { useSnackbar } from "notistack";
import Navbar from '../Menu/Navbar';
import Sidebar from '../Menu/Sidebar';



function VideoCallComponent() {
    const urlParams = new URLSearchParams(window.location.search);
    const channel_id = urlParams.get('id');
    const user = JSON.parse(localStorage.getItem('user'));



    // const { enqueueSnackbar } = useSnackbar();
    const history = useHistory()
    // var url = "http://streaming.tdiradio.com:8000/house.mp3";
    // var ringtone = new Audio(url);

    useEffect(() => {
        getAppointment(channel_id);
    }, [getAppointment]);


    const [is_complete, setCompeteCall] = useState({ call_complete: false });
    function setCompleteCallTrue() {
        setCompeteCall({ call_complete: true });
        // console.log('state call is_complete', is_complete.call_complete)
    }
    function setCompleteCallFalse() {
        setCompeteCall({ compelete_appointment: false });
        // console.log('state is_complete', is_complete.call_complete)
    }



    // rtc object
    const [rtc, setRtc] = useState({
        client: null,
        joined: false,
        published: false,
        localStream: null,
        remoteStreams: null,
        params: {},
        ring: false
    });



    // Options for joining a channel
    var option = {
        // appID: "0d42d32fd603482abda6509d930446d7",
        appID: "4e9b03dffef541258496eaa5232a6727",
        channel: channel_id, //using appointment ID to create channel
        uid: null,
        token: ""
    };


    function initSdkEvents() {

        // Add a view for the remote stream.
        rtc.client.on("stream-subscribed", function (evt) {
            //avoid multiple video stream
            if (!rtc.remoteStreams) {
                var remoteStream = evt.stream;
                var id = remoteStream.getId();
                // Play the remote stream.
                // ringtone.pause()

                document.getElementById("call_status_text").innerHTML = "Audio";
                document.getElementById("call_loader").style.display = "none";
                remoteStream.play("local_stream");
                // rtc.localStream.play("remote_video");
                console.log("stream-subscribed remote-uid: ", id);

                console.log('on add stream state is--------', remoteStream)
                rtc.remoteStreams = remoteStream
                setRtc({...rtc, remoteStreams: remoteStream });
                console.log('on add stream state is--------+++++++', rtc.remoteStreams)
            }
        });


        //remote endcall
        rtc.client.on("peer-leave", function (evt) {
            var peerStream = evt.stream;
            if (peerStream && peerStream.isPlaying()) {
                peerStream.stop()
                if (document.getElementById("overlay")) {
                    document.getElementById("overlay").style.display = "none";
                }
                document.getElementById("local_stream").innerHTML = "";
                document.getElementById("video-call-div").innerHTML = "";
                document.getElementById("end_call_remote").className = "show_block";
            }
        })
    }

    function initSDK(params) {
        rtc.client = AgoraRTC.createClient({ mode: "rtc", codec: "h264" });

        // Initialize the client
        rtc.client.init(option.appID, function () {
            console.log("init success");
            initSdkEvents();
                    // Join a channel
        rtc.client.join(option.token, option.channel, option.uid, function (uid) {
            console.log("join channel: " + option.channel + " success, uid: " + uid);
            rtc.params.uid = uid;
            // play stream with html element id "local_stream"
            rtc.localStream.play("remote_video");
            console.log("init local stream success");

            // Publish the local stream
            try {
                rtc.client.publish(rtc.localStream, function (err) {
                    console.log("publishing stream");
                    console.error('publishing stream error', err);
                });
            } catch (error) {
                console.log('error', error)
            }
        }, function (err) {
            console.error("client join failed", err);
        });
        }, (err) => {
            console.error(err);

        });


    }


    function leaveCall() {
        try {
            // rtc.client.leave();
            rtc.client.leave(function () {
                    if (rtc.localStream){
                        // Close the local stream
                        rtc.localStream.close();
                        // Stop playing the local stream
                        rtc.localStream.stop();
                        rtc.client.unpublish(rtc.localStream, (err) => {
                            console.log('unpublish failed',err)
                         
                            console.error(err)
                          })

                    }
                    for (let i = 0; i < rtc.remoteStreams.length; i++) {
                        const stream = rtc.remoteStreams.shift()
                        const id = stream.getId()
                        stream.stop()
                      }

                      setRtc({
                        client: null,
                        joined: false,
                        published: false,
                        localStream: null,
                        remoteStreams: null,
                        params: {},
                        ring: false
                    })

                console.log("client leaves channel success");
              }, function (err) {
                console.log("channel leave failed");
                console.error(err);
              });
        }
        catch (error) {
            console.log('error leaving', error)
        }
    }

    function notifyPatient(params) {

    }


    function startLocalStream() {
        initSDK();
        document.getElementById("video-call-avatar").style.display = "none";
        document.getElementById("overlay").style.display = "block";
        document.getElementById("call").disabled = true;
        document.getElementById("call_status_text").innerHTML = "Calling";
        document.getElementById("call_loader").style.display = "block";
        rtc.ring = true;
        // document.getElementById("end_call").showModal(); 
        // end_call
        // $('#myModal').modal('show')
        // Create a local stream
        rtc.localStream = AgoraRTC.createStream({
            streamID: rtc.params.uid,
            audio: true,
            video: true,
            screen: false,
        });
        // Initialize the local stream
        rtc.localStream.init(function () {

        }, function (err) {
            console.error("init local stream failed ", err);
        });



        rtc.client.on("stream-added", function (evt) {
            var remoteStream = evt.stream;
            var id = remoteStream.getId();
            if (id !== rtc.params.uid) {
                rtc.client.subscribe(remoteStream, function (err) {
                    console.log("stream subscribe failed", err);
                });
            }
            console.log("stream-added remote-uid: ", id);
        });
        // ringtone.play();
        setRtc({...rtc, localStream: rtc.localStream, remoteStreams: rtc.remoteStreams });
        notifyPatient();
    }

    function endLocalStream() {
        try {
            is_complete.end_call = true
            rtc.ring = false;
            leaveCall();
            console.log('deleting firebase data')
            var receiver_id = appointment.patient ? appointment.patient.id : ''
            var db = firebase.firestore();
            db.collection("call").doc("" + user.id + "").delete()

            db.collection("call").doc("" + receiver_id + "").delete()

            var unsubscribe = db.collection("call")
                .onSnapshot(function () {
                    // Respond to data
                    // ...
                });

            // Later ...

            // Stop listening to changes
            unsubscribe();

        } catch (error) {
            console.log('deleting firebase data error', error)
        }

        console.log('state is_complete', is_complete.call_complete)
        //complete call
        if (is_complete.call_complete) {
            complete_appointment(channel_id)
        }

        // document.getElementById("video-call-avatar").style.display = "block";
        // document.getElementById("overlay").style.display = "none";
        if (!appointments_read) {
            history.push('/dashboard')
        } else {
            history.push('/appointments')
        }
    }



    if (appointment.patient) {
        var receiver_id = appointment.patient.id
        var db = firebase.firestore();
        db.collection("call")
            .onSnapshot(function (snapshot) {
                snapshot.docChanges().forEach(function (change) {
                    if (change.type === "removed") {
                        console.log("Removed Call: ", change.doc.data());
                        if (document.getElementById("overlay")) {
                            document.getElementById("overlay").style.display = "none";
                        }
                        if (document.getElementById("local_stream")) {
                            document.getElementById("local_stream").innerHTML = "";
                        }
                        if (document.getElementById("video-call-div")) {
                            document.getElementById("video-call-div").innerHTML = "";
                        }
                        if (document.getElementById("end_call_remote")) {
                            if (!is_complete.end_call && rtc.ring) {
                                document.getElementById("end_call_remote").className = "show_block";
                            }
                        }
                    }
                });
            });
    }





    return (
        <div className="main-wrapper">
            <Navbar />
            <Sidebar />
            <div className="page-wrapper" style={{ minHeight: '740px' }}>
                <div className="chat-main-row">
                    <div className="chat-main-wrapper">
                        <div className="col-lg-9 message-view chat-view">
                            <div className="chat-window">
                                <div className="fixed-header">
                                    <div className="navbar">
                                        <div className="user-details mr-auto">
                                            <div className="float-left user-img m-r-10">
                                                <a href="#" title={`${user.first_name} ${user.last_name}`}>
                                                    {user.avatar &&
                                                        <img src={user.avatar} alt="" className="w-40 rounded-circle" />
                                                    }
                                                    {!user.avatar &&
                                                        <img src="assets/img/user.jpg" alt="" className="w-40 rounded-circle" />
                                                    }
                                                    <span className="status online"></span></a>
                                            </div>
                                            <div className="user-info float-left">
                                                <a href="#" title={`${user.first_name} ${user.last_name}`} ><span className="font-bold">{user.first_name} {user.last_name}</span></a>
                                                <span className="last-seen">Online</span>
                                            </div>
                                        </div>
                                        <ul className="nav custom-menu">
                                            <li className="nav-item">
                                                <a className="task-chat profile-rightbar float-right" href="#chat_sidebar" id="task_chat"><i aria-hidden="true" className="fa fa-comments"></i></a>
                                            </li>
                                            <li className="nav-item dropdown dropdown-action">
                                                <a href="#" className="nav-link dropdown-toggle" data-toggle="dropdown" aria-expanded="false"><i className="fa fa-cog"></i></a>
                                                <div className="dropdown-menu dropdown-menu-right">
                                                    <a href="#" className="dropdown-item">Settings</a>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="chat-contents">
                                    <div className="chat-content-wrap">
                                        <div id="video-call-div">
                                            <div className="voice-call-avatar" id="video-call-avatar">
                                                {appointment.patient &&
                                                    <div>
                                                        {appointment.patient.avatar &&
                                                            <img src={appointment.patient.avatar} alt="" className="call-avatar" />
                                                        }
                                                        {!appointment.patient.avatar &&
                                                            <img src="assets/img/user.jpg" alt="" className="call-avatar" />
                                                        }
                                                    </div>
                                                }
                                                {!appointment.patient &&
                                                    <img src="assets/img/user.jpg" alt="" className="call-avatar" />
                                                }
                                                <span className="username">{appointment.patient &&
                                                    <div>
                                                        {appointment.patient.first_name} {appointment.patient.last_name}
                                                    </div>
                                                }
                                                </span>
                                                {/* <span className="call-timing-count">01:23</span> */}
                                            </div>
                                        </div>
                                        <div id="overlay">
                                            <div id="overlay_text">
                                                <div className="row">
                                                    <div className="col-md-6" id="call_status_text">Calling</div>
                                                    <div className="col-md-6" id="call_loader">
                                                        <div className="dot-pulse margin_50_40"></div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="user-video">
                                                <div id="local_stream" className="video_height" ></div>
                                            </div>
                                            <div className="my-video">
                                                <ul>
                                                    <li>
                                                        <div id="remote_video" className="video-fluid"></div>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="chat-footer">
                                    {appointment.patient &&
                                        <div className="call-icons">
                                            <span className="call-duration"></span>
                                            <ul className="call-items">
                                                <li className="call-item">
                                                    {/* <a href="#" title="Enable Video" data-placement="top" data-toggle="tooltip" onClick={startLocalStream} >
                                                <i className="fa fa-video-camera camera"></i>
                                            </a> */}
                                                    <button id="call" title="Enable Video" data-placement="top" data-toggle="tooltip" onClick={startLocalStream} className="btn btn-primary btn-primary-two float-right"><i className="fa fa-video-camera camera"></i> Call</button>
                                                </li>
                                                <li className="call-item">
                                                    {/* <a href="" title="Mute Audio" data-placement="top" data-toggle="tooltip">
                                                <i className="fa fa-microphone microphone"></i>
                                            </a> */}
                                                </li>
                                            </ul>
                                            <div className="end-call">
                                                <a href="#" data-toggle="modal" data-target="#end_call">End Call</a>

                                                {/* <a href="#" onClick={endLocalStream}>
												End Call
											</a> */}
                                            </div>

                                        </div>
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 message-view chat-profile-view chat-sidebar" id="chat_sidebar">
                            <div className="chat-window video-window">
                                <div className="fixed-header">
                                    <ul className="nav nav-tabs nav-tabs-bottom">

                                        <li className="nav-item"><a className="nav-link active" href="#profile_tab" data-toggle="tab">Profile</a></li>
                                    </ul>
                                </div>
                                <div className="tab-content chat-contents">
                                    <div className="content-full tab-pane show active" id="profile_tab">
                                        <div className="display-table">
                                            <div className="table-row">
                                                <div className="table-body">
                                                    <div className="table-content">
                                                        <div className="chat-profile-img">
                                                            <div className="edit-profile-img">
                                                                {appointment.patient &&
                                                                    <div>
                                                                        {appointment.patient.avatar &&
                                                                            <img src={appointment.patient.avatar} alt="" style={{
                                                                                width: "100px",
                                                                                height: "100px"
                                                                            }} />
                                                                        }
                                                                        {!appointment.patient.avatar &&
                                                                            <img src="assets/img/user.jpg" alt="" />
                                                                        }
                                                                    </div>
                                                                }
                                                                {!appointment.patient &&
                                                                    <img src="assets/img/user.jpg" alt="" />
                                                                }
                                                            </div>
                                                            <h3 className="user-name m-t-10 mb-0">
                                                                {appointment.patient &&
                                                                    <div>
                                                                        {appointment.patient.first_name} {appointment.patient.last_name}
                                                                    </div>
                                                                }
                                                            </h3>
                                                            {/* <small className="text-muted">MBBS, MD</small> */}
                                                        </div>
                                                        <div className="chat-profile-info">
                                                            <ul className="user-det-list">

                                                                <li>
                                                                    <span>Date of Birth:</span>
                                                                    <span className="float-right text-muted">{appointment.patient ? appointment.patient.date_of_birth : ''}</span>
                                                                </li>
                                                                <li>
                                                                    <span>Email:</span>
                                                                    <span className="float-right text-muted">{appointment.patient ? appointment.patient.email : ''}</span>
                                                                </li>
                                                                <li>
                                                                    <span>Phone:</span>
                                                                    <span className="float-right text-muted">{appointment.patient ? appointment.patient.phone_number : ''}</span>
                                                                </li>
                                                            </ul>
                                                        </div>

                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="end_call" className="modal fade delete-modal" role="dialog">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-body text-center">
                                <img src="assets/img/sent.png" alt="" width="50" height="46" />

                                <h3>Are you sure want to end {appointment.patient ? appointment.patient.first_name : ''}'s appointment call ?
                                <br />
                                    <br />
                                Have you completed this appointment?<br /><br />
                                    <form>
                                        <input type="radio" name="complete_call" value="true" onClick={setCompleteCallTrue} /> Yes &nbsp;&nbsp;&nbsp;
                                    <input type="radio" name="complete_call" value="false" onClick={setCompleteCallFalse} /> No
                                </form>
                                </h3>

                                <div className="m-t-20"> <a href="#" className="btn btn-white" data-dismiss="modal">Close</a>
                                    {/* <button type="button" className="btn btn-danger" data-dismiss="modal" onClick={() => {history.push('/appointments')}}>End Call</button> */}
                                    <button type="button" className="btn btn-danger" data-dismiss="modal" onClick={endLocalStream}>End Call</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="end_call_remote" className="modal fade delete-modal fade show" role="dialog" aria-modal="true">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-body text-center">
                                <img src="assets/img/sent.png" alt="" width="50" height="46" />

                                <h3>{appointment.patient ? appointment.patient.first_name : ''} ended call ?
                                <br />
                                    <br />
                                Have you completed this appointment?<br /><br />
                                    <form>
                                        <input type="radio" name="complete_call" value="true" onClick={setCompleteCallTrue} /> Yes &nbsp;&nbsp;&nbsp;
                                    <input type="radio" name="complete_call" value="false" onClick={setCompleteCallFalse} /> No
                                </form>
                                </h3>

                                <div className="m-t-20">
                                    {/* <a href="#" className="btn btn-white" data-dismiss="modal" onClick={endLocalStream}>Close</a> */}
                                    {/* <button type="button" className="btn btn-danger" data-dismiss="modal" onClick={() => {history.push('/appointments')}}>End Call</button> */}
                                    <button type="button" className="btn btn-danger" data-dismiss="modal" onClick={endLocalStream}>End Call</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>


            <div className="sidebar-overlay" data-reff=""></div>
        </div>
    );
}


export default VideoCallComponent;
