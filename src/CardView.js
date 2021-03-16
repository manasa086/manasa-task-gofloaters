import React, {useState, useEffect } from 'react'  
import "slick-carousel/slick/slick.css";  
import "slick-carousel/slick/slick-theme.css";  
import Slider from "react-slick";  
import {useHistory} from "react-router-dom";
import './CardView.css';  
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button
  } from 'reactstrap';

  
function CardView () {  
    const [cardDetails,setCardDetails]=useState([])
    const [cardDetails1,setCardDetails1]=useState([])
    const [resultsFound,setResultsFound]=useState("");
    const [searchValue,setSearchValue]=useState("");
    const history=useHistory();
    useEffect(()=>{
        fetch("https://gofloaters.firebaseapp.com/spaces/incity?city=Chennai&lat=12.9653652&lng=80.2461057")
        .then((res)=>res.json())
        .then((data)=>{
            let store=[]
            for(let key in data)
            {
                store.push(data[key])
                console.log(data[key].originalName)
            }
            setCardDetails(store)
            setCardDetails1(store)

        })


    },[])
   
    let price="";
    let pricepertext="";
    var imgSlides = (photos) =>  
    photos.map(num => (  
      
          <CardImg className="cardimg" src= {num} width="100%"/>    
  
    ));  

    
   

    const changeSearchValue=(e)=>{
        setSearchValue(e.target.value)
    }

    const searchPlaces=(e)=>{
        if(e.key=="Enter")
        {
            let cards=[];
            for(let k=0;k<cardDetails1.length;k++)
            {
                if(JSON.stringify(cardDetails1[k].address).search(new RegExp(searchValue,"i"))>0)
                {
                   cards.push(cardDetails1[k]) 
                }
                if(cardDetails1[k].originalName.toString().toLowerCase().substring(0,cardDetails1[k].originalName.toString().length-1)==searchValue.toString().toLowerCase()){
                    cards.push(cardDetails1[k])

                }
                

            }
            if(cards.length>0)
                setCardDetails(cards)
            else{
                setResultsFound("No Results Found")
            }
        }
    } 
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
            setCardDetails(store)
            setResultsFound("");
        })

    }
    const navigateToMap=()=>{
        history.push("/mapview");
    }
    const navigateToCard=()=>{
        history.push("/cardview")
    }

    const searchByClick=()=>{
        let cards=[];
            for(let k=0;k<cardDetails1.length;k++)
            {
                if(JSON.stringify(cardDetails1[k].address).search(new RegExp(searchValue,"i"))>0)
                {
                   cards.push(cardDetails1[k]) 
                }
                if(cardDetails1[k].originalName.toString().toLowerCase().substring(0,cardDetails1[k].originalName.toString().length-1)==searchValue.toString().toLowerCase()){
                    cards.push(cardDetails1[k])

                }
                

            }
            if(cards.length>0)
                setCardDetails(cards)
            else{
                setResultsFound("No Results Found")
            }
    }
    if(sessionStorage.getItem("auth")=="Authenticated")
    {
        if(!(resultsFound.length>0))
        {
        return (  
            <div className="App">  
            <div className="sidenav">
            <a className="link1" onClick={navigateToMap}>Map Listing View</a>
            <a className="link1"  onClick={navigateToCard}>Card Listing View</a>
            </div>
            <div className="search">
            <input type="text" name="search"  className="searchText" id="search" value={searchValue} placeholder="Search by Address/Name" onKeyDown={searchPlaces} onChange={changeSearchValue}></input>
            <button onClick={searchByClick} className="searchIcon"><i className="fa fa-search"></i></button></div>
            <div className="container-fluid main">
            
            {cardDetails.map((each,index)=>{
                if(each.priceperhr)
                {
                    price=each.priceperhr
                    pricepertext="Price Per Hour"
                }
                else if(each.priceperday)
                {
                    price=each.priceperday
                    pricepertext="Price Per Day"
                }
                else if(each.pricepermonth)
                {
                    price=each.pricepermonth
                    pricepertext="Price Per Month"
                }
                return(
                    <div className="row">
                    <Card className="card">
                    <Slider  
                dots={true}  
                    slidesToShow={1}  
                    slidesToScroll={1}  
                    autoplay={false}  
                    arrows={true}  
                    autoplaySpeed={3000}>{imgSlides(each.photos)}</Slider>  
                    <CardBody>
                        <CardTitle tag="h5">{each.originalName}</CardTitle>
                        <CardText className="price">
                        <i>{pricepertext}</i>:&nbsp;
                        <b>₹{price}</b>
                        </CardText>
                        <CardText><span>{each.address.street},{each.address.landmark}</span>
                        <br></br>
                        <span>{each.address.locality}, {each.address.city}, {each.address.country} - {each.address.zipcode}</span></CardText>
                        
                    </CardBody>
                    </Card>
                    </div>
                )
                })
            }  
            
            
            </div>  
            </div>  
        );  
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
export default CardView 