import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom'
import Button from '../../shared/components/FormElements/Button/Button';
import Input from '../../shared/components/FormElements/Input/Input';
import Card from '../../shared/components/UIElements/Card/Card';
import { useForm } from '../../shared/hooks/form-hook';
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from '../../shared/util/validators';

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
        title: 'Badshahi Mosque',
        description: 'One of the most famous Mosques of the world',
        imageURL: 'https://www.maxpixel.net/static/photo/1x/Badshahi-Mosque-Lahore-Lhr-Badshahi-Mosque-Lahore-2299807.jpg',
        address: '20 W 34th St., New York, NY 10001, United States',
        location: {
            lat: 31.5879664,
            lng: 74.3085249,
        },
        creatorId: 'u1'
    }
]


const UpdatePlace = () => {
    const placeId = useParams().pid;
    const [isLoading,setIsLoading] = useState(true);
    const [formState, inputHandler, setFormData] = useForm({
        title: {
            value: '',
            isValid: false,
        },
        description: {
            value: '',
            isValid: false,
        }
    },false)
    console.log(formState);
    const identifiedPlace = DUMMY_PLACES.find(p => p.id === placeId)
    
    useEffect(()=> {
        if(identifiedPlace)
        {
            console.log(identifiedPlace.title);
            setFormData({
                title: {
                    value: identifiedPlace.title,
                    isValid: true,
                },
                description: {
                    value: identifiedPlace.description,
                    isValid: true,
                }
            }, true)
            console.log(formState.inputs.title.value);
            setIsLoading(false);
        }
    },[identifiedPlace])
    


    const placeUpdateHandler = (e)=> {
        e.preventDefault();
        console.log(formState);
    }

    if(!identifiedPlace)
    {
        return (
            <div className='center'>
                <Card>
                 <h2>Could not find place!</h2>
                </Card>
            </div>
        )
    }
    if(isLoading){
        return (
            <div className='center'>
                <h2>Loading...</h2>
            </div>
        ) 
    }
    
    return (
        <form className='place-form'>
            <Input id="title" element="input" type="text" label="Title" validators={[VALIDATOR_REQUIRE()]}
             value={formState.inputs.title.value} valid={true} onInput={inputHandler}
             errorText="Please enter a valid title."
            />
            <Input id="description" element="textarea" label="Description" validators={[VALIDATOR_MINLENGTH(5)]}
             value={formState.inputs.description.value}  valid={true} onInput={inputHandler}
             errorText="Please enter a valid description."
            />
            <Button onClick={placeUpdateHandler} type="submit" disabled={!formState.isValid}>UPDATE PLACE</Button>
        </form>
    )
}

export default UpdatePlace