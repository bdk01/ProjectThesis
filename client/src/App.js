import React, { useEffect, useState } from "react";
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
import Main from "./components/Main";
import NotFound from "./pages/NotFound/NotFound";
import CreateMeeting from "./pages/CreateMeeting";
import Meeting from "./pages/Meeting";
import Conversation from "./pages/Conversation";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import {
  BrowserRouter,
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";

import { refreshToken } from "./api/authAPI";
import { useDispatch, useSelector } from "react-redux";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
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

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/home"
          element={
            <Main>
              <Home />
            </Main>
          }
        />

        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route
          path="/conversation"
          element={
            <Main>
              <Conversation />
            </Main>
          }
        />
        <Route
          path="/conversation/:id"
          element={
            <Main>
              <Conversation />
            </Main>
          }
        />
        <Route
          path="/create-schedule"
          element={
            <Main>
              <CreateMeeting />
            </Main>
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
    </BrowserRouter>
  );
};

export default App;
