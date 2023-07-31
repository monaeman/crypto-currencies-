import React from 'react'
import {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'

function Price (){

const [coin, setCoin] = useState(null);

  const apiKey ="78CDBC42-9539-49B6-ADA1-833B8C17AD12"

  const params = useParams()
  const symbol = params.symbol
  // Using the other two variables to create our URL
  const url = `http://rest.coinapi.io/v1/exchangerate/${symbol}/USD?apikey=${apiKey}`;

  
  


//function to fetch coin data
const getCoin = async () => {
  try{
    const response = await fetch(url);
    const data = await response.json();
    setCoin(data);
  } catch(e){
    console.error(e)
  }
};

 // loaded function for when data is fetched
 const loaded = () => {
  return (
    <div>
      <h1>
        {coin.asset_id_base}/{coin.asset_id_quote}
      </h1>
      <h2>{coin.rate}</h2>
    </div>
  );
};
// Function for when data doesn't exist
const loading = () => {
  return <h1>Loading...</h1>;
};
// use this so we dont have infinite loop
useEffect(()=> {
  getCoin();

}, [])




   // if coin has data, run the loaded function, otherwise, run loading
   return coin && coin.rate ? loaded() : loading();
  };

export default Price