import React from 'react';
import "./notfound.css"
import notfound from "./notfound.png"
import Header from './../../components/Header/Header';

const NotFound= () => {
    return (
        <>
        <Header />
        <div className="containernotfound">
           <img src={notfound} />
           
        </div>
        
        </>
    );
}
 

 
export default NotFound;