import {useState, useCallback, useEffect} from 'react'


let logoutTimmer;


const useAuth = ()=> {
    const [token, setToken] = useState(null);
    const [userId, setUserId] = useState('');
    const [tokenExpirationDate, setTokenExpirationDate] = useState();
    const login = useCallback((uid,token,expiration)=> {
      setUserId(uid);
      setToken(token);
      const expirationDate = expiration || new Date(new Date().getTime() + 1000 * 60 * 60 * 24);
      setTokenExpirationDate(expirationDate);
      localStorage.setItem('userData',JSON.stringify({userId: uid, token: token, expiration: expirationDate.toISOString()}));
    },[])
    const logout = useCallback(()=> {
      setToken(null);
      setTokenExpirationDate(null);
      setUserId('');
      localStorage.removeItem('userData');
    },[])
  
  
    useEffect(()=> {
      const userData = JSON.parse(localStorage.getItem('userData'));
      if(userData && userData.token && (new Date(userData.expiration) > new Date())){
        login(userData.userId, userData.token, new Date(userData.expiration));
      }
    },[login,token])
  
  
    // auto logout when the time limit is reached
    useEffect(()=> {
      if(token && tokenExpirationDate){
        const timeLeft = tokenExpirationDate.getTime() - new Date().getTime();
        logoutTimmer = setTimeout(logout, timeLeft);
      } else {
        clearTimeout(logoutTimmer);
      }
    },[tokenExpirationDate, logout, token])
  
    return {login, logout, userId, token};
}

export default useAuth;