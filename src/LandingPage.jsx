import React from "react";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
const LandingPage= () =>{

    const [restaurantid, setRestaurantid] = useState("")
    const navigate = useNavigate();
    const handleRestaurantChange = (e) => {
        setRestaurantid(e.target.value)
    }
    const navigateToRestaurnatPage = () => {
        navigate(`/${restaurantid}`,{ state: restaurantid })
    }
    return(
        <>
        <p>Enter the restaurantid:<input type="text" onChange={handleRestaurantChange}/> </p>
        <button type="submit" onClick={navigateToRestaurnatPage}>Submit</button>
        </>
    )
}

export default LandingPage