import React, { useEffect,useState } from 'react'
import ErrorModal from '../../shared/components/UIElements/ErrorModal/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner/LoadingSpinner';
import { useHttpClient } from '../../shared/hooks/http-hook';
import UsersList from '../components/UsersList/UsersList'

const Users = () => {
  
  const {loading, error, sendRequest, clearError} = useHttpClient()
  const [loadedUsers, setLoadedUsers] = useState([])

  useEffect(()=> {
    const sendRequesWrapper = async () => {
      try{
        const resData = await sendRequest('http://localhost:5000/api/users/');
        // console.log();
        setLoadedUsers(resData.users);
      }catch(err){

      }
    }
    sendRequesWrapper();
  },[sendRequest])


    
  return (
    <>
      <ErrorModal error={error} onClear={clearError}/>
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