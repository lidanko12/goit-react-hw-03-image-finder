 import React from "react";
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import s from "./Loader.module.css"



const Load =  () =>{
  return (
    <div className={s.Loader}>
      <Loader
        type="TailSpin"
              color="#c5000a"
              height={150}
              width={150}
              timeout={2000}
      />
    </div>
  );
};
export default Load 
