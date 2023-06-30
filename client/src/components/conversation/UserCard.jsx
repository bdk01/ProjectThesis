import React from "react";
import { Link } from "react-router-dom";

export default function UserCard({user,msg}) {
  return <div className="py-3 px-1 flex flex-row ">
              <div className="w-[52px] h-[52px]" >
                <img className=" w-[100%] h-[100%] rounded-[50%]" src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Calendar_font_awesome.svg/1024px-Calendar_font_awesome.svg.png" />
             </div>   
            <div className="ml-3 flex justify-start items-start flex-col">
                <div>{user?.meetingName}</div>
                <div>
                        {/*   {
                                  msg 
                                  ? user.text
                                  : user.fullname
                              } */}
                              {user.description}
                </div>
            </div>

          </div>;
}
