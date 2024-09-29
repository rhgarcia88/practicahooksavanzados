import { useState,useEffect } from 'react';


const useCurrentTime = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

 useEffect(() =>{
//Actualizar hora cada segundo
const intervalId = setInterval(() =>{
setCurrentTime(new Date());
},1000);

return () => clearInterval(intervalId);
 },[]);

return currentTime;
};


export default useCurrentTime;