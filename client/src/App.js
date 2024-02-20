import React, { Suspense, lazy, useEffect, useState } from "react";


import { getSocket } from "./redux/socketSlice";
import io from "socket.io-client";
import SocketClient from "./SocketClient";

import NotFound from "./pages/NotFound/NotFound";
import CreateMeeting from "./pages/CreateMeeting";

import Conversation from "./pages/Conversation";


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


import CreateSubject from "./pages/Teacher/CreateSubject";

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


import { getSuggestions } from "./api/suggestionsAPI";

import CreateTaSchedule1 from "./pages/Teacher/CreateTaSchedule1";
import AdminLayout from "./Layout/adminLayout/adminLayout";
import ConversationAdmin from "./pages/MessageAdmin/ConversationAdmin";
import ManagePosts from "./pages/Admin/ManagePosts";
import Loading from "./components/Loading/Loading";
import Statitics from "./pages/Admin/Statitics";
import RegisterTA from "./pages/EnrollmentTA/RegisterTA";
import EditTAEnrollment from "./pages/EnrollmentTA/EditTAEnrollment";



const App = () => {


  const dispatch = useDispatch();

  const { auth, socket } = useSelector((state) => state);
  useEffect(() => {
    refreshToken(dispatch);
    const socket = io("ws://localhost:8000");

    dispatch(getSocket(socket));

    return () => socket.close();
  }, [dispatch]);

 /*  const isMobile = window.matchMedia(
    "only screen and (max-width: 768px)"
  ).matches;

  useEffect(() => {
    if (isMobile) {
      window.onbeforeunload = () => {
        return "Are you sure you want to exit?";
      };
    }
  }, [isMobile]); */
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
              <Suspense fallback={<Loading/>}>
                 <Pages.Home />

              </Suspense>
               </UserRoute>
            }
          />
          <Route
            path="profile"
            /*   lazy={() => import('./pages/Home')} */
            element={
              <Suspense fallback={<Loading/>}>
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

    
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />


     {/*    <Route
          path="create-post"
          element={
            <Suspense fallback={<p className="text-3xl"> Loading...</p>}>
                <CreatePost />

         </Suspense>
     
       
          }
        /> */}
        <Route
          path="review-ta"
          element={
            <Suspense fallback={<p className="text-3xl"> Loading...</p>}>
          <Layout>
              
              <ReviewTA />
            </Layout>

     </Suspense>
           
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
            <Suspense fallback={<Loading/>}>
            <Layout>
              <Conversation />
            </Layout>
            </Suspense>
          }
        />

        <Route
          path="/conversation/:id"
          element={
            <Suspense fallback={<Loading/>}>
           
             <Layout>
              <Conversation />
            </Layout>

   </Suspense>
           
          }
        />

        <Route
          path="/create-schedule"
          element={
            <Suspense fallback={<p className="text-3xl"> Loading...</p>}>
                  <Layout>

              <CreateMeeting />
              </Layout>

         </Suspense>
         
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
            <Suspense fallback={<p className="text-3xl"> Loading...</p>}>
            <Layout>
              <RegisterTA />
            </Layout>

   </Suspense>
          
          }
        />
        <Route
          path="/edit-applyTA/:id"
          element={
            <Suspense fallback={<p className="text-3xl"> Loading...</p>}>
            <Layout>
              <EditTAEnrollment/>
            </Layout>

   </Suspense>
          
          }
        />
        <Route
          path="/createSubject"
          element={
            <Suspense fallback={<p className="text-3xl"> Loading...</p>}>
            <Layout>
              <CreateSubject />
            </Layout>

   </Suspense>
           
          }
        />
        <Route
          path="/createTaSchedule"
          element={
            <Suspense fallback={<p className="text-3xl"> Loading...</p>}>
           <Layout>
              <CreateTaSchedule1 />
            </Layout>

   </Suspense>
           
          }
        />
        <Route
          path="/manageTaSchedule"
          element={
            <Suspense fallback={<p className="text-3xl"> Loading...</p>}>
           <Layout>
              <ManageTaSchedule />
            </Layout>
 
    </Suspense>
         
          }
        />
        <Route
          path="/manageTa"
          element={
            <Suspense fallback={<p className="text-3xl"> Loading...</p>}>
             <Layout>
              <ManageTa />
            </Layout>
  
     </Suspense>
         
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
          path="/admin/statitics"
          element={
            <AdminLayout>
              <Statitics />
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
     
        <Route path="*" element={<NotFound />} />
      </Routes>

    </Router>
  );
};

export default App;
