import React from 'react'
import { useParams } from 'react-router-dom'
import PlaceList from '../components/PlaceList/PlaceList'

const DUMMY_PLACES = [
    {
        id: 'p1',
        title: 'Empire State Building',
        description: 'One of the most famous sky scrapers in world!',
        imageURL: 'https://media.timeout.com/images/101705309/750/422/image.jpg',
        address: '20 W 34th St., New York, NY 10001, United States',
        location: {
            lat: 40.7484,
            lng: -73.9857,
        },
        creatorId: 'u2'
    },
    {
        id: 'p2',
        title: 'Empire State Building',
        description: 'One of the most famous sky scrapers in world!',
        imageURL: 'https://media.timeout.com/images/101705309/750/422/image.jpg',
        address: '20 W 34th St., New York, NY 10001, United States',
        location: {
            lat: 40.7484,
            lng: -73.9857,
        },
        creatorId: 'u1'
    }
]


const UserPlaces = () => {
    const {uid: userId} = useParams();
    const loadedPlaces = DUMMY_PLACES.filter((place)=> place.creatorId === userId);
  return (
    <PlaceList items={loadedPlaces}/>
  )
}

export default UserPlaces