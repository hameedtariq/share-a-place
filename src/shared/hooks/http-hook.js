import { useCallback, useEffect, useRef,useState } from "react";


const useHttpClient = ()=> {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const activeHttpRequests = useRef([])


    const sendRequest = useCallback(async (url, method = 'GET', body = null, headers = {} )=> {
        setLoading(true)
        const httpAbortCtrl = new AbortController();
        activeHttpRequests.current.push(httpAbortCtrl);
        try {
            // console.log('here!');
          const res = await fetch(url, {
            method,
            body,
            headers,
            signal: httpAbortCtrl.signal
          });

          const resData = await res.json();
          activeHttpRequests.current = activeHttpRequests.current.filter((abortCtrl) => abortCtrl !== httpAbortCtrl)

          if(!res.ok) {
            throw new Error(resData.message);
          }
          setLoading(false);
          return resData
          
        } catch(err) {
          setLoading(false);
          setError(err.message || 'Something went wrong while loading users, please try again.')
          throw err;
        }
    })

    const clearError = ()=> {
        setError(null)
    }

    useEffect(()=> {
        return ()=> {
            activeHttpRequests.current.forEach((abortCtrl)=> abortCtrl.abort())
        }
    }, [])

    return {loading, error, clearError, sendRequest};
}

export {useHttpClient}