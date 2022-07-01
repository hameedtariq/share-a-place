import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import ErrorModal from '../../shared/components/UIElements/ErrorModal/ErrorModal'
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner/LoadingSpinner'
import { useHttpClient } from '../../shared/hooks/http-hook'
import PlaceList from '../components/PlaceList/PlaceList'

const UserPlaces = () => {
    const {loading, error, sendRequest, clearError} = useHttpClient();
    const [places, setPlaces] = useState([])
    const {uid: userId} = useParams();
    // const loadedPlaces = DUMMY_PLACES.filter((place)=> place.creatorId === userId);
    const onDeletePlace = (id)=> {
        console.log('hello');
        setPlaces(prevPlaces => prevPlaces.filter((place) => place.id !== id))
    }
    useEffect(()=> {
        const fetchUserPlaces = async ()=>  {
            try {
                const resData = await sendRequest(`http://localhost:5000/api/places/user/${userId}`);
                setPlaces(resData.places)
                
            } catch (error) {}
        }
        fetchUserPlaces();
    }, [sendRequest, userId])
  return (
    <>
        <ErrorModal error={error} onClear={clearError}/>
        {loading && <LoadingSpinner asOverlay/>}
        {!loading && <PlaceList items={places} onDeletePlace= {onDeletePlace}/>}
    </>
  )
}

export default UserPlaces