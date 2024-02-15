import React from "react";
import { Link } from "react-router-dom";
import { LazyLoadImage } from 'react-lazy-load-image-component';
export default function UserCard({user,msg}) {
  return <div className="py-3 px-1 flex flex-row ">
              <div className="w-[50px] h-[50px] shrink-0" >
               {/*  <img className=" w-[100%] h-[100%] rounded-[50%]" src="https://th.bing.com/th/id/R.25024fac280e72a1b9ffbace5196421c?rik=OtokY82MWgCl4Q&pid=ImgRaw&r=0" /> */}
                <LazyLoadImage
                    
                  alt='#'
                  height={40}
                  src="https://th.bing.com/th/id/R.25024fac280e72a1b9ffbace5196421c?rik=OtokY82MWgCl4Q&pid=ImgRaw&r=0" 
                  width={60} 
                  className="rounded-[50%]"
                  />
                

           
             </div>   
            <div className="ml-1 md:ml-3 flex justify-start items-start flex-col">
                <div>{user?.meetingName}</div>
                <div>
                    
                    {user.description}
                </div>
            </div>

          </div>;
}
