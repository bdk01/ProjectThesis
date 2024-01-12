import React from 'react';
import "./notfound.css"
import notfound from "./notfound.png"
import Header from '../../components/Header/Header';


const NotFound= () => {
    return (
        <>
     
        <div className="flex justify-center items-center">
           <img src={notfound} className='h-[80%] w-[60%]' />
           
        </div>
        
        </>
    );
}
 

 
export default NotFound;