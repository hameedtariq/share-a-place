import React from 'react'
import './UserItem.css'
import Avatar from '../../../shared/components/UIElements/Avatar/Avatar'
import Card from '../../../shared/components/UIElements/Card/Card'
import { Link } from 'react-router-dom'
const UserItem = ({image,id,name, places}) => {
  return (
    <li className='user-item'>
        <Card className='user-item__content'>
            <Link to={`/${id}/places`}>
                <div className='user-item__image'>
                    <Avatar image={image} alt={name} />
                </div>
                <div className='user-item__info'>
                    <h2>{name}</h2>
                    <h3>{places} {places === 1 ? 'Place' : 'Places'}</h3>
                </div>
            </Link>
        </Card>        
    </li>
  )
}

export default UserItem