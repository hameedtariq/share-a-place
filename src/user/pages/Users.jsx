import React, { useEffect,useState } from 'react'
import ErrorModal from '../../shared/components/UIElements/ErrorModal/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner/LoadingSpinner';
import UsersList from '../components/UsersList/UsersList'

const Users = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [loadedUsers, setLoadedUsers] = useState([]);


  useEffect(()=> {
    const sendRequest = async ()=> {
      setLoading(true)
      try {
        const res = await fetch('http://localhost:5000/api/users/');
        const resData = await res.json();
        if(!res.ok) {
          throw new Error(resData.message);
        }
        setLoadedUsers(resData.users)
        setLoading(false);
        
      } catch(err) {
        setLoading(false);
        setError(err.message || 'Something went wrong while loading users, please try again.')
      }

    }
    sendRequest();
  },[])


    const errorHandler = ()=> {
      setError(null)
    }
  return (
    <>
      <ErrorModal error={error} onClear={errorHandler}/>
      {
        loading && <div className='center'>
          <LoadingSpinner />
        </div>
      }
      {
        !loading && <UsersList items={loadedUsers} />
      }
    </>    
  )
}

export default Users