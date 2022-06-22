import React, { Fragment,useState, useEffect ,createContext} from "react";
import axios from "axios";
import Details from "./Details"
import {BrowserRouter as Router,Switch,Route,Link} from "react-router-dom";
import Button from 'react-bootstrap/Button';
import { HiSwitchHorizontal } from 'react-icons/hi';
import '../App.css'


const Convertor = () =>{
 // const [info, setInfo] = useState([]);
  const [initialState, setState] = useState({
    currencies: ["USD", "SGD", "PHP", "EUR", "INR","PKR" ,"GBP","AED"],
    base : "EUR",
    amount : "",  
    convertTo: "USD",
    result: "0",
    date: "",
    excrate:""
  });
  var temp="";
  const { currencies, base, amount, convertTo, result, date,excrate } = initialState;

 

  const enterAmount = (event) =>{
    setState({
      ...initialState,
      amount : event.target.value,
      result:null,
      date:null,
    })
  }

  const handleCurrencyFrom = (event) =>{
      setState({
        ...initialState,
        [event.target.name]: event.target.value,
        result: null,
      });
  };

  const handleCurrencyTo = (event) =>{
    setState({
      ...initialState,
      [event.target.name]: event.target.value,
      result: null,
    })
  }

  const convertTheExhangeRate = async() =>{
    if(amount === NaN){
      return;
    }
    else{
      const response = await axios.get(`https://api.exchangerate.host/latest?base=${base}`);
      // console.log("response==>", response);
      const date = response.data.date;
      const result = (response.data.rates[convertTo]*amount).toFixed(3)
      const excratee = response.data.rates[convertTo]
      setState({
        ...initialState,
        result,
        date,
        excrate : excratee
      })
      localStorage.setItem('base', base);
      localStorage.setItem('result', result);
      localStorage.setItem('convertTo', convertTo);
      localStorage.setItem('amount', amount);
      localStorage.setItem('date', date);
      localStorage.setItem('excrate', excratee);    
    }   
  }

  const handleSwap = (e) => {    
    setState({
      ...initialState,
      temp : base,
      convertTo: base,
      base: convertTo,
      result: null,
    }   
    );
  };
  return(
    <Fragment> 

      <div className="ex2">

      <div className="container-fuild">
      <div className="card text-left">
      <div className="card-header"> <h1>Currency Exchanger</h1></div>      
      </div>
      <br/>
      <div className="row">
      <div className="col-xs-6 col-md-4">
          <label align="left">Amount : <input type="number" value={amount} onChange={enterAmount}/></label>
      </div>
      <div className="col-xs-6 col-md-3">
        
        <label align="left">Currency From :<select name="base" value={base} onChange={handleCurrencyFrom}>
      {currencies.map((item,index) => (
            <option key={index} value={item}>
              {item}
            </option>
          ))}
      </select></label>       
        </div>
    <div className="col-xs-6 col-md-1">
    <HiSwitchHorizontal size="30px"  onClick={handleSwap}/>
    </div>
    <div className="col-xs-6 col-md-3">
    <label align="left">Currency To : <select name="convertTo" value={convertTo} onChange={handleCurrencyTo}>
      {currencies.map((item,index) => (
            <option key={index} value={item}>
              {item}
            </option>
          ))}
      </select></label>
     </div>
    </div>
    </div>
   <br/>

   <div className="row">
        <div className="col-xs-6 col-md-4">
         </div>
        <div className="col-xs-6 col-md-6">
        <button type="button" className="button button3"  onClick = {convertTheExhangeRate}>Convert</button>
         </div>
   </div>
   <br/>
  
        <div className="row">
          <div className="col-xs-6 col-md-4">
            <label> Calculated Value : </label>
            <input disabled={true} value={amount ==="" ? 0 : result ===null ? "": result}/>
          </div>
          <div className="col-xs-6 col-md-4">
            <label> Exchange Rate : </label>
          <input disabled={true} value={amount ==="" ? 0 : result ===null ? "": excrate}/>
          </div>
          <div className="col-xs-6 col-md-4">
            <Link className="Link" to="/details">More Details</Link>
          </div>
        </div>      
      </div>      
    </Fragment>
  )
}

 export default Convertor;