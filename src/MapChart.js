import React,{useEffect,useState} from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import "./CardView.css";
import {useHistory} from "react-router-dom";
const MapChart = () => {

    const [location,setLocation]=useState([]);
    const [locations,setLocations]=useState([]);
    const [searchValue,setSearchValue]=useState("");
    const [resultsFound,setResultsFound]=useState("");
    const history=useHistory();

    const changeSearchValue=(e)=>{
        setSearchValue(e.target.value)
    }

    const searchPlaces=(e)=>{
        if(e.key=="Enter")
        {
            let locate=[];
            for(let k=0;k<locations.length;k++)
            {
                if(JSON.stringify(locations[k].address).search(new RegExp(searchValue,"i"))>0)
                {
                   locate.push(locations[k]) 
                }
                if(locations[k].originalName.toString().toLowerCase().substring(0,locations[k].originalName.toString().length-1)==searchValue.toString().toLowerCase()){
                    locate.push(locations[k])

                }

            }
            if(locate.length>0)
                setLocation(locate)
            else{
                setResultsFound("No Results Found")
            }
            
        }
    }
/*Perungudi*/
    useEffect(()=>{
        fetch("https://gofloaters.firebaseapp.com/spaces/incity?city=Chennai&lat=12.9653652&lng=80.2461057")
        .then((res)=>res.json())
        .then((data)=>{
            let locate=[];
            let i=0;
            for(let key in data){
                locate.push({
                    name:i++,
                    ...data[key]


                })
             
            }
            setLocation(locate)
            setLocations(locate)
        })



    },[])

    const navigateToHome=()=>{
        history.push("/");
    }

    const navigateBack=()=>{

        fetch("https://gofloaters.firebaseapp.com/spaces/incity?city=Chennai&lat=12.9653652&lng=80.2461057")
        .then((res)=>res.json())
        .then((data)=>{
            let store=[]
            for(let key in data)
            {
                store.push(data[key])
              
            }
            setLocation(store)
            setResultsFound("");
        })

    }
    const searchByClick=()=>{
        let locate=[];
            for(let k=0;k<locations.length;k++)
            {
                if(JSON.stringify(locations[k].address).search(new RegExp(searchValue,"i"))>0)
                {
                   locate.push(locations[k]) 
                }
                if(locations[k].originalName.toString().toLowerCase().substring(0,locations[k].originalName.toString().length-1)==searchValue.toString().toLowerCase()){
                    locate.push(locations[k])

                }

            }
            if(locate.length>0)
                setLocation(locate)
            else{
                setResultsFound("No Results Found")
            }
    }
    const navigateToMap=()=>{
        history.push("/mapview");
    }
    const navigateToCard=()=>{
        history.push("/cardview")
    }
      const mapStyles = {        
        height: "100vh",
        width: "100%"};
      
      const defaultCenter = {
        lat: 12.978333, lng: 80.249856
      }
      if(sessionStorage.getItem("auth")=="Authenticated")
      {
        if(!(resultsFound.length>0))
        {
        return (
            <>
            <div className="sidenav">
            <a className="link1" onClick={navigateToMap}>Map Listing View</a>
            <a className="link1"  onClick={navigateToCard}>Card Listing View</a>
           
            </div>
            <div className="search">
            <input type="text" name="search"  className="searchText" id="search" value={searchValue} placeholder="Search by Address/Name" onKeyDown={searchPlaces} onChange={changeSearchValue}></input>
            <button onClick={searchByClick} className="searchIcon"><i className="fa fa-search"></i></button></div>
            <div className="map main">
            <LoadScript
            googleMapsApiKey='AIzaSyAcQjrfAudzl6Ton7GA7D-gVqOINMFE7ns'>
            <GoogleMap
            mapContainerStyle={mapStyles}
            zoom={13}
            center={defaultCenter}>
            {
                location.map(item => {
                    // console.log(item)
                    let locations={
                        lat:Number(item.location.split(",")[0]),
                        lng:Number(item.location.split(",")[1])
                    }
                return (
                <Marker key={item.name} position={locations}/>
                )
                })
            }
        </GoogleMap>
        </LoadScript>
        </div>
        </>
        )
        }
        else{
            return (  
                <div className="App1">  
                
                <input type="text" name="search"  className="searchText" id="search" value={searchValue} placeholder="Search by Address/Name" onKeyDown={searchPlaces} onChange={changeSearchValue}></input>
                <button onClick={searchByClick} className="searchIcon"><i className="fa fa-search"></i></button>
                <div className="container-fluid">
                
                <p>No Results Found</p>
                <a className="link" onClick={navigateBack}>Navigate Back</a>
                
                </div>  
                </div>  
            );
        }
    }
    else{
        return (
            <div className="App1">
                <h1>Go Floaters Task</h1><br></br>
                <a className="link" onClick={navigateToHome}>Navigate Back to Login ↩</a>
            </div>
        )

    }
    
  }

  export default MapChart