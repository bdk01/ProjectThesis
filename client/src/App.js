import React, { Suspense, lazy, useEffect, useState } from "react";
import { Constants, MeetingProvider } from "@videosdk.live/react-sdk";
import { LeaveScreen } from "./components/screens/LeaveScreen";
import { JoiningScreen } from "./components/screens/JoiningScreen";
import { meetingTypes } from "./utils/common";
import { MeetingContainer } from "./meeting/MeetingContainer";
/* import { ILSContainer } from "./interactive-live-streaming/ILSContainer"; */
import { MeetingAppProvider } from "./MeetingAppContextDef";
import { getSocket } from "./redux/socketSlice";
import io from "socket.io-client";
import SocketClient from "./SocketClient";

import NotFound from "./pages/NotFound/NotFound";
import CreateMeeting from "./pages/CreateMeeting";

import Conversation from "./pages/Conversation";
/* import Home from "./pages/Home"; */

import Register from "./pages/Auth/Register";
import {
  BrowserRouter,
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";

import { refreshToken } from "./api/authAPI";
import { useDispatch, useSelector } from "react-redux";
import ForgotPassword from "./pages/Auth/ForgotPassword";
import ResetPassword from "./pages/Auth/ResetPassword";
import CreatePost from "./pages/CreatePost";

import Post from "./pages/Post";
import { getPosts } from "./api/postAPI";
import { getNotifies } from "./api/notifyAPI";

import Profile from "./pages/Profile";
import RegisterTA from "./pages/RegisterTA";
import RegisterSubject from "./pages/Teacher/CreateSubject";
import CreateSubject from "./pages/Teacher/CreateSubject";
import CreateTaSchedule from "./pages/Teacher/CreateTaSchedule";

import ManageTaSchedule from "./pages/Teacher/ManageTaSchedule";
import ManageTa from "./pages/Teacher/ManageTa";
import Login from "./pages/Auth/Login";
import Layout from "./Layout/Layout";


import ReviewTA from "./pages/Teacher/ReviewTA";
import UserRoute from "./routes/UserRoute";
import ManageSubject from "./pages/Admin/ManageSubject";
import ManageUser from "./pages/Admin/ManageUser";
import ScrollToTop from "./hooks/ScrollToTop";
import { Pages } from "./routes/routers";

import i18n from "./i18ns/i18n.config";
import { getSuggestions } from "./api/suggestionsAPI";
import LayoutAdmin from "./Layout/LayoutAdmin";
import NewPage from "./pages/NewPage";
import CreateTaSchedule1 from "./pages/Teacher/CreateTaSchedule1";
import AdminLayout from "./Layout/adminLayout/adminLayout";
import ConversationAdmin from "./pages/MessageAdmin/ConversationAdmin";
import ManagePosts from "./pages/Admin/ManagePosts";



const App = () => {

  const [token, setToken] = useState("");
  const [meetingId, setMeetingId] = useState("");
  const [participantName, setParticipantName] = useState("");
  const [micOn, setMicOn] = useState(false);
  const [webcamOn, setWebcamOn] = useState(true);
  const [selectedMic, setSelectedMic] = useState({ id: null });
  const [selectedWebcam, setSelectedWebcam] = useState({ id: null });
  const [selectWebcamDeviceId, setSelectWebcamDeviceId] = useState(
    selectedWebcam.id
  );
  const [meetingMode, setMeetingMode] = useState(Constants.modes.CONFERENCE);
  const [selectMicDeviceId, setSelectMicDeviceId] = useState(selectedMic.id);
  const [isMeetingStarted, setMeetingStarted] = useState(false);
  const [isMeetingLeft, setIsMeetingLeft] = useState(false);
  const [meetingType, setMeetingType] = useState(meetingTypes.MEETING);
  const dispatch = useDispatch();

  const { auth, socket } = useSelector((state) => state);
  useEffect(() => {
    refreshToken(dispatch);
    const socket = io("ws://localhost:8000");

    dispatch(getSocket(socket));

    return () => socket.close();
  }, [dispatch]);

  const isMobile = window.matchMedia(
    "only screen and (max-width: 768px)"
  ).matches;

  useEffect(() => {
    if (isMobile) {
      window.onbeforeunload = () => {
        return "Are you sure you want to exit?";
      };
    }
  }, [isMobile]);
  useEffect(() => {
    if (auth.accesstoken) {
      /*     dispatch(getPosts(auth.token))
          dispatch(getSuggestions(auth.token)) */
      getSuggestions({ auth, dispatch })
      getNotifies({ auth, dispatch })
    }
  }, [dispatch, auth.accesstoken, socket])
  /*  useEffect(()=>{
     i18n.changeLanguage('vi')
   },[]) */
  const Home = lazy(() => import('./pages/Home'));
  return (
    <Router>
      <ScrollToTop />
      {auth.accesstoken && socket && <SocketClient />}
      <Routes>

        <Route path='/' element={<Layout />}>
          <Route
            path="home"
            /*   lazy={() => import('./pages/Home')} */
            element={
           
          <Suspense fallback={<p className="text-3xl"> Loading...</p>}>
                <Pages.Home />

              </Suspense>
       

       

            }
          />
          <Route
            path=""
            /*   lazy={() => import('./pages/Home')} */
            element={
              <UserRoute>
              <Suspense fallback={<p className="text-3xl"> Loading...</p>}>
                 <Pages.Home />

              </Suspense>
               </UserRoute>
            }
          />
          <Route
            path="profile"
            /*   lazy={() => import('./pages/Home')} */
            element={
              <Suspense fallback={<p className="text-3xl"> Loading...</p>}>
                <Pages.Profile />

              </Suspense>
            }
          />
        
          <Route
            path="profile/:id"
            /*   lazy={() => import('./pages/Home')} */
            element={
              <Suspense fallback={<p className="text-3xl"> Loading...</p>}>
                <Pages.Profile />
              </Suspense>
            }
          />
        </Route>
        <Route
          path="/login"
          /*   lazy={() => import('./pages/Home')} */
          element={
            <Suspense fallback={<p className="text-3xl"> Loading...</p>}>
              <Pages.Login />

            </Suspense>
          }
        />


        <Route
          path="/register"
          /*   lazy={() => import('./pages/Home')} */
          element={
            <Suspense fallback={<p className="text-3xl"> Loading...</p>}>
              <Pages.Register />

            </Suspense>
          }
        />

        {/*  <Route
                path="/"
              element={
                <UserRoute>
              
                </UserRoute>
              }
            /> */}
        {/*  <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} /> */}
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />


        <Route
          path="create-post"
          element={
            <CreatePost />
          }
        />
        <Route
          path="review-ta"
          element={
            <Layout>

              <ReviewTA />
            </Layout>
          }
        />

        
        {/*  <Route
          path="/profile/:id"
          element={
            <Layout>
              <Profile />
            </Layout>
          }
        /> */}
        <Route
          path="/conversation"
          element={
            <Layout>
              <Conversation />
            </Layout>
          }
        />

        <Route
          path="/conversation/:id"
          element={
            <Layout>
              <Conversation />
            </Layout>
          }
        />

        <Route
          path="/create-schedule"
          element={
            <Layout>
              <CreateMeeting />
            </Layout>
          }
        />
        <Route
          path="/post/:id"
          element={
            <Layout>
              <Post />
            </Layout>
          }
        />
        <Route
          path="/registerTA/:id"
          element={
            <Layout>
              <RegisterTA />
            </Layout>
          }
        />
        <Route
          path="/createSubject"
          element={
            <Layout>
              <CreateSubject />
            </Layout>
          }
        />
        <Route
          path="/createTaSchedule"
          element={
            <Layout>
              <CreateTaSchedule1 />
            </Layout>
          }
        />
        <Route
          path="/manageTaSchedule"
          element={
            <Layout>
              <ManageTaSchedule />
            </Layout>
          }
        />
        <Route
          path="/manageTa"
          element={
            <Layout>
              <ManageTa />
            </Layout>
          }
        />
        <Route
          path="/manage-user"
          element={
                   <Suspense fallback={<p className="text-3xl"> Loading...</p>}>
     
            <AdminLayout>
                   <ManageUser />

            
            </AdminLayout>
            </Suspense>
          }
        />
        <Route
          path="/manage-posts"
          element={
                   <Suspense fallback={<p className="text-3xl"> Loading...</p>}>
     
            <AdminLayout>
                   <ManagePosts />

            
            </AdminLayout>
            </Suspense>
          }
        />
        <Route
          path="/review-subject"
          element={
            <AdminLayout>
              <ManageSubject />
              </AdminLayout>
          }
        />
           <Route
          path="/admin/conversation"
          element={
            <AdminLayout>
           <ConversationAdmin />
              </AdminLayout>
          }
        />

        <Route
          path="/admin/conversation/:id"
          element={
            <AdminLayout>
              <ConversationAdmin />
              </AdminLayout>
          }
        />
        <Route
          path="/meeting"
          element={
            <>
              {isMeetingStarted ? (
                <MeetingAppProvider
                  selectedMic={selectedMic}
                  selectedWebcam={selectedWebcam}
                  initialMicOn={micOn}
                  initialWebcamOn={webcamOn}
                >
                  <MeetingProvider
                    config={{
                      meetingId,
                      micEnabled: micOn,
                      webcamEnabled: webcamOn,
                      name: participantName ? participantName : "TestUser",
                      mode: meetingMode,
                      multiStream:
                        meetingType === meetingTypes.MEETING ? true : false,
                    }}
                    token={token}
                    reinitialiseMeetingOnConfigChange={true}
                    joinWithoutUserInteraction={true}
                  >
                    {meetingType === meetingTypes.MEETING ? (
                      <MeetingContainer
                        onMeetingLeave={() => {
                          setToken("");
                          setMeetingId("");
                          setParticipantName("");
                          setWebcamOn(false);
                          setMicOn(false);
                          setMeetingStarted(false);
                        }}
                        setIsMeetingLeft={setIsMeetingLeft}
                        selectedMic={selectedMic}
                        selectedWebcam={selectedWebcam}
                        selectWebcamDeviceId={selectWebcamDeviceId}
                        setSelectWebcamDeviceId={setSelectWebcamDeviceId}
                        selectMicDeviceId={selectMicDeviceId}
                        setSelectMicDeviceId={setSelectMicDeviceId}
                        micEnabled={micOn}
                        webcamEnabled={webcamOn}
                      />
                    ) : (
                      <div></div>
                    )}
                  </MeetingProvider>
                </MeetingAppProvider>
              ) : isMeetingLeft ? (
                <LeaveScreen setIsMeetingLeft={setIsMeetingLeft} />
              ) : (
                <JoiningScreen
                  participantName={participantName}
                  setParticipantName={setParticipantName}
                  setMeetingId={setMeetingId}
                  setToken={setToken}
                  setMicOn={setMicOn}
                  micEnabled={micOn}
                  webcamEnabled={webcamOn}
                  setSelectedMic={setSelectedMic}
                  setSelectedWebcam={setSelectedWebcam}
                  setWebcamOn={setWebcamOn}
                  onClickStartMeeting={() => {
                    setMeetingStarted(true);
                  }}
                  startMeeting={isMeetingStarted}
                  setIsMeetingLeft={setIsMeetingLeft}
                  meetingMode={meetingMode}
                  setMeetingMode={setMeetingMode}
                  meetingType={meetingType}
                  setMeetingType={setMeetingType}
                />
              )}
            </>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>

    </Router>
  );
};

export default App;
