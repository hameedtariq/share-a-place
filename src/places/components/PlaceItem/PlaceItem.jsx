import React, { useState } from 'react'
import Button from '../../../shared/components/FormElements/Button/Button'
import Card from '../../../shared/components/UIElements/Card/Card'
import './PlaceItem.css'
import Modal from '../../../shared/components/UIElements/Modal/Modal'
import Map from '../../../shared/components/UIElements/Map/Map'


const PlaceItem = ({id,imageURL,title,description,address,creatorId, location}) => {
    const [showMap, setShowMap] = useState(false);

    const openMapHandler = ()=> setShowMap(true);
    const closeMapHandler = ()=> setShowMap(false);





    return (
        <>
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
        <li className='place-item'>
            <Card className='place-item__content'>
                <div className='place-item__image'>
                    <img src={imageURL} alt={title} />
                </div>
                <div className='place-item__info'>
                    <h2>{title}</h2>
                    <h3>{address}</h3>
                    <p>{description}</p>
                </div>
                <div className='place-item__actions'>
                    <Button inverse onClick={openMapHandler}>VIEW ON MAP</Button>
                    <Button to={`/places/${id}`}>EDIT</Button>
                    <Button danger>DELETE</Button>


                </div>
            </Card>
        </li>
    </>
  )
}

export default PlaceItem