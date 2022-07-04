import React, { useContext, useState } from 'react'
import Button from '../../../shared/components/FormElements/Button/Button'
import Card from '../../../shared/components/UIElements/Card/Card'
import './PlaceItem.css'
import Modal from '../../../shared/components/UIElements/Modal/Modal'
import Map from '../../../shared/components/UIElements/Map/Map'
import AuthContext from '../../../shared/context/auth-context'
import { useHttpClient } from '../../../shared/hooks/http-hook'
import LoadingSpinner from '../../../shared/components/UIElements/LoadingSpinner/LoadingSpinner'
import ErrorModal from '../../../shared/components/UIElements/ErrorModal/ErrorModal'
// import { useNavigate } from 'react-router-dom'


const PlaceItem = ({id,image,title,description,address,creatorId, location, onDeletePlace}) => {
    const {loading, error, sendRequest, clearError} = useHttpClient();
    const {isLoggedIn, userId, token} = useContext(AuthContext)
    const [showMap, setShowMap] = useState(false);
    // const [deleteMessage, setDeleteMessage] = useState('')
    // const navigate = useNavigate();

    const openMapHandler = ()=> setShowMap(true);
    const closeMapHandler = ()=> setShowMap(false);
    
    const [showDelete, setShowDelete] = useState(false);
    const openDeleteHandler = ()=> setShowDelete(true);
    const closeDeleteHandler = ()=> setShowDelete(false);


    const deletePlace = async ()=> {
        try {
            closeDeleteHandler();
            await sendRequest(`http://localhost:5000/api/places/${id}`,'DELETE',null, {'Authorization': `Bearer ${token}`});
            onDeletePlace(id)
            
        } catch (error) {
            
        }

        
    }



    return (
        <>
        <ErrorModal error={error} onClear={clearError}/>
        <Modal
            show={showMap}
            onCancel={closeMapHandler}
            header={address}
            contentClass="place-item__modal-content"
            footerClass="place-item__modal-actions"
            footer={<Button onClick={closeMapHandler}>CLOSE</Button>}
        >
            <div className='map-container'>
                <Map center={location} zoom={10}/>
            </div>
        </Modal>
        <Modal
            show={showDelete}
            onCancel={closeDeleteHandler}
            header="Are you sure?"
            footerClass="place-item__modal-actions"
            footer ={<><Button inverse onClick={closeDeleteHandler}>CANCEL</Button> <Button danger onClick={deletePlace}>DELETE</Button></>}
        
        >
            Are you sure that you want to delete this place? This action cannot be undone.
        </Modal>
        <li className='place-item'>
            
            <Card className='place-item__content'>
            {loading && <LoadingSpinner asOverlay/>}
            {/* <p className='center'>{deleteMessage}</p> */}
                <div className='place-item__image'>
                    <img src={`http://localhost:5000/${image}`} alt={title} />
                </div>
                <div className='place-item__info'>
                    <h2>{title}</h2>
                    <h3>{address}</h3>
                    <p>{description}</p>
                </div>
                <div className='place-item__actions'>
                    <Button inverse onClick={openMapHandler}>VIEW ON MAP</Button>
                    {isLoggedIn && (creatorId === userId) &&<><Button to={`/places/${id}`}>EDIT</Button>
                    <Button danger onClick={openDeleteHandler}>DELETE</Button></>}


                </div>
            </Card>
        </li>
    </>
  )
}

export default PlaceItem