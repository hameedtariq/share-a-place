import React from 'react'
import UsersList from '../components/UsersList/UsersList'

const Users = () => {
    const USERS =[
        {
            id: 'u1',
            name: "Hameed",
            image: "https://i.pinimg.com/736x/93/0e/4e/930e4efc34caaa6cdcc7e43ae9647747.jpg",
            places: 3,
        },
    ]
  return (
    <div>
        <UsersList items={USERS} />
    </div>
    
  )
}

export default Users