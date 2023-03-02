import React from "react";
import { Link } from "react-router-dom";

export default function UserCard({user,msg}) {
  return <div className="py-3 px-2 flex flex-row ">
              <div className="w-[52px] h-[52px]" >
                <img className=" w-[100%] h-[100%] rounded-[50%]" src="https://res.cloudinary.com/khoa252001/image/upload/v1668777257/socialmedia/duck_orrdvy.jpg" />
            </div>   
            <div className="ml-3 flex justify-start items-start flex-col">
                <div>{user?.username}</div>
                <div>
                          {
                                  msg 
                                  ? user.text
                                  : user.fullname
                              }
                </div>
            </div>

          </div>;
}
