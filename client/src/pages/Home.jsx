import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import RightHome from "../components/RightHome";

export default function Home() {
 
  return <div className="mx-3">
    <h1 className="lg:text-2xl text-lg font-extrabold leading-none text-gray-900 tracking-tight mb-5"> New Feed </h1>
    <div className="lg:flex justify-center lg:space-x-10 lg:space-y-0 space-y-5">

                 
                    <div className="space-y-5 flex-shrink-0 lg:w-7/12">

                     
                        <div className="bg-white shadow rounded-md  -mx-2 lg:mx-0">
    
                        
                            <div className="flex justify-between items-center px-4 py-3">
                                <div className="flex flex-1 items-center space-x-4">
                                    <a href="#">
                                        <div className="bg-gradient-to-tr from-yellow-600 to-pink-600 p-0.5 rounded-full">  
                                            <img src="https://instelloo.netlify.app/assets/images/post/img4.jpg" className="bg-gray-200 border border-white rounded-full w-8 h-8" />
                                        </div>
                                    </a>
                                    <span className="block capitalize font-semibold "> Johnson smith </span>
                                </div>
                              <div>
                                <a href="#" aria-expanded="false"> <i className="icon-feather-more-horizontal text-2xl hover:bg-gray-200 rounded-full p-2 transition -mr-1 "></i> </a>
                                <div className="bg-white w-56 shadow-md mx-auto p-2 mt-12 rounded-md text-gray-500 hidden text-base border border-gray-100" uk-drop="mode: hover;pos: top-right">
                              
                                    <ul className="space-y-1">
                                      <li> 
                                          <a href="#" className="flex items-center px-3 py-2 hover:bg-gray-200 hover:text-gray-800 rounded-md ">
                                           <i className="uil-share-alt mr-1"></i> Share
                                          </a> 
                                      </li>
                                      <li> 
                                          <a href="#" className="flex items-center px-3 py-2 hover:bg-gray-200 hover:text-gray-800 rounded-md ">
                                           <i className="uil-edit-alt mr-1"></i>  Edit Post 
                                          </a> 
                                      </li>
                                      <li> 
                                          <a href="#" className="flex items-center px-3 py-2 hover:bg-gray-200 hover:text-gray-800 rounded-md ">
                                           <i className="uil-comment-slash mr-1"></i>   Disable comments
                                          </a> 
                                      </li> 
                                      <li> 
                                          <a href="#" className="flex items-center px-3 py-2 hover:bg-gray-200 hover:text-gray-800 rounded-md ">
                                           <i className="uil-favorite mr-1"></i>  Add favorites 
                                          </a> 
                                      </li>
                                      <li>
                                        <div className="-mx-2 my-2 " />
                                      </li>
                                      <li> 
                                          <a href="#" className="flex items-center px-3 py-2 text-red-500 hover:bg-red-100 hover:text-red-500 rounded-md ">
                                           <i className="uil-trash-alt mr-1"></i>  Delete
                                          </a> 
                                      </li>
                                    </ul>
                                
                                </div>
                              </div>
                            </div>
    
                            <div uk-lightbox="">
                                <a href="https://instelloo.netlify.app/assets/images/post/img4.jpg">  
                                    <img src="https://instelloo.netlify.app/assets/images/post/img4.jpg" alt="#" />
                                </a>
                            </div>
                            
    
                            <div className="py-3 px-4 space-y-3"> 
                               
                                <div className="flex space-x-4 lg:font-bold">
                                    <a href="#" className="flex items-center space-x-2">
                                        <div className="p-2 rounded-full text-black">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" width="22" height="22" className="">
                                                <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z"></path>
                                            </svg>
                                        </div>
                                        <div> Like</div>
                                    </a>
                                    <a href="#" className="flex items-center space-x-2">
                                        <div className="p-2 rounded-full text-black">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" width="22" height="22" className="">
                                                <path fill-rule="evenodd" d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z" ></path>
                                            </svg>
                                        </div>
                                        <div> Comment</div>
                                    </a>
                                    <a href="#" className="flex items-center space-x-2 flex-1 justify-end">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" width="22" height="22" className="">
                                            <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z"></path>
                                        </svg>
                                        <div> Share</div>
                                    </a>
                                </div>
                                <div className="flex items-center space-x-3"> 
                                    <div className="flex items-center">
                                        <img src="https://instelloo.netlify.app/assets/images/post/img4.jpg" alt="" className="w-6 h-6 rounded-full border-2 border-white " />
                                        <img src="https://instelloo.netlify.app/assets/images/post/img4.jpg" alt="" className="w-6 h-6 rounded-full border-2 border-white  -ml-2"/>
                                        <img src="https://instelloo.netlify.app/assets/images/post/img4.jpg" alt="" className="w-6 h-6 rounded-full border-2 border-white  -ml-2"/>
                                    </div>
                                    <div className="">
                                        Liked <strong> Johnson</strong> and <strong> 209 Others </strong>
                                    </div>
                                </div>

                                <div className="border-t pt-4 space-y-4 ">
                                    <div className="flex">
                                        <div className="w-10 h-10 rounded-full relative flex-shrink-0">
                                            <img src="https://instelloo.netlify.app/assets/images/post/img4.jpg" alt="" className="absolute h-full rounded-full w-full" />
                                        </div>
                                        <div className="text-gray-700 py-2 px-3 rounded-md h-full relative lg:ml-5 ml-2 lg:mr-20 bg-gray-300  ">
                                            <p className="leading-6">In ut odio libero vulputate <div className="i uil-heart"></div> <i className="uil-grin-tongue-wink"> </i> </p>
                                            <div className="absolute w-3 h-3 top-3 -left-1 bg-gray-300 transform rotate-45 "></div>
                                        </div>
                                    </div>
                                    <div className="flex">
                                        <div className="w-10 h-10 rounded-full relative flex-shrink-0">
                                            <img src="https://instelloo.netlify.app/assets/images/post/img4.jpg" alt="" className="absolute h-full rounded-full w-full" />
                                        </div>
                                        <div className="text-gray-700 py-2 px-3 rounded-md bg-gray-300  h-full relative lg:ml-5 ml-2 lg:mr-20   ">
                                            <p className="leading-6">Nam liber tempor cum soluta nobis eleifend option <i className="uil-grin-tongue-wink-alt"></i>
                                            </p>
                                            <div className="absolute w-3 h-3 top-3 -left-1 bg-gray-300  transform rotate-45 "></div>
                                        </div>
                                    </div>
                                </div>
                              <div class="bg-gray-200  rounded-full relative py-2  ">
                                    <input type="text" placeholder="Add your Comment.." class="mx-3 bg-transparent w-[90%] shadow-none" />
                                    <div class="absolute bottom-0 flex h-full items-center  right-3 text-xl space-x-2">
                                        <a href="#"> <i class="uil-image"></i></a>
                                        <a href="#"> <i class="uil-video"></i></a>
                                    </div>
                                </div>
                            </div>
                        </div>
    
                    
                        <div className="flex justify-center mt-6" id="toggle">
                            <a href="#" className="bg-white font-semibold my-3 px-6 py-2 rounded-full shadow-md ">
                                Load more ..</a>
                        </div>
 
                    </div>
                       <div className="lg:w-5/12">
                  <RightHome/>

                       </div>
                  </div>
  </div>;
}
