import React from "react";

export default function RightHome() {
  return <div>
      {/*  <!-- right sidebar--> */}
                 

                        <div className="bg-white  shadow-md rounded-md overflow-hidden">

                            <div className="bg-gray-50  border-b border-gray-100 flex items-baseline justify-between py-4 px-6 ">
                                <h2 className="font-semibold text-lg">Who to follow</h2>
                                <a href="#"> Refresh</a>
                            </div>
                           
                            <div className=" divide-gray-50 divide-opacity-50 divide-y px-4 ">
                                <div className="flex items-center justify-between py-3">
                                    <div className="flex flex-1 items-center space-x-4">
                                        <a href="profile.html">
                                            <img src="https://instelloo.netlify.app/assets/images/post/img4.jpg" className="bg-gray-200 rounded-full w-10 h-10" />
                                        </a>
                                        <div className="flex flex-col">
                                            <span className="block capitalize font-semibold"> Johnson smith </span>
                                            <span className="block capitalize text-sm"> Australia </span>
                                        </div>
                                    </div>
                                    
                                    <a href="#" className="border border-gray-200 font-semibold px-4 py-1 rounded-full hover:bg-pink-600 hover:text-white hover:border-pink-600 "> Follow </a>
                                </div>
                                <div className="flex items-center justify-between py-3">
                                    <div className="flex flex-1 items-center space-x-4">
                                        <a href="profile.html">
                                            <img src="https://instelloo.netlify.app/assets/images/post/img4.jpg" className="bg-gray-200 rounded-full w-10 h-10" />
                                        </a>
                                        <div className="flex flex-col">
                                            <span className="block capitalize font-semibold"> James Lewis </span>
                                            <span className="block capitalize text-sm"> Istanbul </span>
                                        </div>
                                    </div>
                                    <a href="#" className="border border-gray-200 font-semibold px-4 py-1 rounded-full hover:bg-pink-600 hover:text-white hover:border-pink-600 "> Follow </a>
                                </div>
                                <div className="flex items-center justify-between py-3">
                                    <div className="flex flex-1 items-center space-x-4">
                                        <a href="profile.html">
                                            <img src="https://instelloo.netlify.app/assets/images/post/img4.jpg" className="bg-gray-200 rounded-full w-10 h-10" />
                                        </a>
                                        <div className="flex flex-col">
                                            <span className="block capitalize font-semibold"> John Michael </span>
                                            <span className="block capitalize text-sm"> New York </span>
                                        </div>
                                    </div>
                                    <a href="#" className="border border-gray-200 font-semibold px-4 py-1 rounded-full hover:bg-pink-600 hover:text-white hover:border-pink-600 "> Follow </a>
                                </div>
                                <div className="flex items-center justify-between py-3">
                                    <div className="flex flex-1 items-center space-x-4">
                                        <a href="profile.html">
                                            <img src="https://instelloo.netlify.app/assets/images/post/img4.jpg" className="bg-gray-200 rounded-full w-10 h-10" />
                                        </a>
                                        <div className="flex flex-col">
                                            <span className="block capitalize font-semibold"> Monroe Parker </span>
                                            <span className="block capitalize text-sm"> Yeman </span>
                                        </div>
                                    </div>
                                    
                                    <a href="#" className="border border-gray-200 font-semibold px-4 py-1 rounded-full hover:bg-pink-600 hover:text-white hover:border-pink-600 "> Follow </a>
                                </div>

                            </div>

                        </div>

                        <div className="mt-5 uk-sticky" uk-sticky="offset:28; bottom:true ; media @m">
                            <div className="bg-white shadow-md rounded-md overflow-hidden">

                                <div className="bg-gray-50 border-b border-gray-100 flex items-baseline justify-between py-4 px-6 0">
                                    <h2 className="font-semibold text-lg">Latest</h2>
                                    <a href="explore.html"> See all</a>
                                </div>
    
                                <div className="grid grid-cols-2 gap-2 p-3 uk-link-reset">
    
                                    <div className="bg-red-500 max-w-full h-32 rounded-lg relative overflow-hidden uk-transition-toggle"> 
                                        <a href="#story-modal" uk-toggle="">
                                            <img src="https://instelloo.netlify.app/assets/images/post/img4.jpg" className="w-full h-full absolute object-cover inset-0" />
                                        </a>
                                        <div className="flex flex-1 justify-around items-center absolute bottom-0 w-full p-2 text-white custom-overly1 uk-transition-slide-bottom-medium">   
                                            <a href="#"> <i className="uil-heart"></i> 150 </a>
                                            <a href="#"> <i className="uil-heart"></i> 30 </a>
                                        </div>
                                    </div>
                                    
                                    <div className="bg-red-500 max-w-full h-40 rounded-lg relative overflow-hidden uk-transition-toggle"> 
                                        <a href="#story-modal" uk-toggle="">
                                            <img src="https://instelloo.netlify.app/assets/images/post/img4.jpg" className="w-full h-full absolute object-cover inset-0"/>
                                        </a>
                                        <div className="flex flex-1 justify-around items-center absolute bottom-0 w-full p-2 text-white custom-overly1 uk-transition-slide-bottom-medium">   
                                            <a href="#"> <i className="uil-heart"></i> 150 </a>
                                            <a href="#"> <i className="uil-heart"></i> 30 </a>
                                        </div>
                                    </div>                             
                                    
                                    <div className="bg-red-500 max-w-full h-40 -mt-8 rounded-lg relative overflow-hidden uk-transition-toggle"> 
                                        <a href="#story-modal" uk-toggle="">
                                            <img src="https://instelloo.netlify.app/assets/images/post/img4.jpg" className="w-full h-full absolute object-cover inset-0"/>
                                        </a>
                                        <div className="flex flex-1 justify-around  items-center absolute bottom-0 w-full p-2 text-white custom-overly1 uk-transition-slide-bottom-medium">   
                                            <a href="#"> <i className="uil-heart"></i> 150 </a>
                                            <a href="#"> <i className="uil-heart"></i> 30 </a>
                                        </div>
                                    </div>
    
                                    <div className="bg-red-500 max-w-full h-32 rounded-lg relative overflow-hidden uk-transition-toggle"> 
                                        <a href="#story-modal" uk-toggle="">
                                            <img src="https://instelloo.netlify.app/assets/images/post/img4.jpg" className="w-full h-full absolute object-cover inset-0"/>
                                        </a>
                                        <div className="flex flex-1 justify-around  items-center absolute bottom-0 w-full p-2 text-white custom-overly1 uk-transition-slide-bottom-medium">   
                                            <a href="#"> <i className="uil-heart"></i> 150 </a>
                                            <a href="#"> <i className="uil-heart"></i> 30 </a>
                                        </div>
                                    </div>
    
                                </div>
    
                            </div>
                        </div><div className="h-[381px] " hidden=""></div>

             
 
  </div>;
}
