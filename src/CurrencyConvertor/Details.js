import Reac, { useState, useEffect, Fragment } from 'react'
import { Link } from "react-router-dom";
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area, BarChart, Bar } from 'recharts';
import '../App.css'
import { HiSwitchHorizontal } from 'react-icons/hi';
import { useHistory } from "react-router-dom";
// import { ContactSupportOutlined } from '@material-ui/icons';
import '../App.css';

const Details = () => {
  const history = useHistory();
  const [initialState, setState] = useState({
    currencies: ["USD", "SGD", "PHP", "EUR", "INR", "PKR", "GBP", "AED"],
    base: `${localStorage.getItem('base')}`,
    amount: `${localStorage.getItem('amount')}`,
    convertTo: `${localStorage.getItem('convertTo')}`,
    result: `${localStorage.getItem('result')}`,
    fromdate: `${localStorage.getItem('date')}`,
    excrate: `${localStorage.getItem('excrate')}`,
    pdata: []

  });
  var temp = "";
  var rangedataa = ""
  var currencydata = {};


  var te = 1;
  const { currencies, base, amount, convertTo, result, fromdate, excrate, pdata } = initialState;

  useEffect(() => {
    if (amount === NaN) {
      return;
    }
    else {

      console.log("More Detais Use Effect")
      const getCurrencyto = async () => {
        console.log("the date is ", fromdate)
        const response = await axios.get(`https://api.exchangerate.host/timeseries?start_date=2022-05-18&end_date=${fromdate}`);
        console.log(" The response of ==>", response);
        const rangedata = response.data.rates
        console.log("the value of rangedata", rangedata)
        let pdataa = [];
        for (let i in rangedata) {
          console.log(i, rangedata[i][convertTo])
          currencydata.exchval = i
          pdataa.push({ dat: i, val: te * 10, price: rangedata[i][convertTo] })
          te++
        }
        console.log("the padata", pdata)
        if (result !== null) {
          setState({
            ...initialState,
            pdata: pdataa
          })
        }

        console.log(result)
      };
      getCurrencyto();
    }
  }, [result]);

  const enterAmount = (event) => {
    setState({
      ...initialState,
      amount: event.target.value,
      result: null,
      date: null,
    })
  }

  const handleCurrencyFrom = (event) => {
    setState({
      ...initialState,
      [event.target.name]: event.target.value,
      result: null,
    });
  };

  const handleCurrencyTo = (event) => {
    setState({
      ...initialState,
      [event.target.name]: event.target.value,
      result: null,
    })
  }

  const convertTheExhangeRate = async () => {
    if (amount === NaN) {
      return;
    }
    else {
      const response = await axios.get(`https://api.exchangerate.host/latest?base=${base}`);
      console.log("response==>", response);
      const date = response.data.date;
      const result = (response.data.rates[convertTo] * amount).toFixed(3)
      const excratee = response.data.rates[convertTo]
      setState({
        ...initialState,
        result,
        date,
        excrate: excratee
      })

    }

  }

  const handleSwap = (e) => {
    setState({
      ...initialState,
      temp: base,
      convertTo: base,
      base: convertTo,
      result: null,
    }
    );
  };

  const backToHome = () => {
    history.goBack();
  }

  return (
    <Fragment>

      <div className="ex3">
        <div className="container-fuild">
          <div className="card text-left">
            <div class="row">
              <div class="col-xs-6 col-md-8">
                <div className="card-header"> <h1>Currency Exchanger Details</h1></div>
              </div>
              <div class="col-xs-6 col-md-4 ">
                <Link className="bth" to="/"> Back To Home </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="ex3">
        <div className="container-fuild">

          <div class="row">

            <div class="col-xs-6 col-md-4">
              <label align="left">Amount : <input type="number" value={amount} onChange={enterAmount} /></label>
            </div>
            <div class="col-xs-6 col-md-3">

              <label align="left">Currency From :<select name="base" value={base} onChange={handleCurrencyFrom}>
                {currencies.map((item, index) => (
                  <option key={index} value={item}>
                    {item}
                  </option>
                ))}
              </select></label>
            </div>

            <div class="col-xs-6 col-md-1">
              <HiSwitchHorizontal size="30px" onClick={handleSwap} />
            </div>
            <div class="col-xs-6 col-md-3">
              <label align="left">Currency To : <select name="convertTo" value={convertTo} onChange={handleCurrencyTo}>
                {currencies.map((item, index) => (
                  <option key={index} value={item}>
                    {item}
                  </option>
                ))}
              </select></label>
            </div>
          </div>
        </div>
        <br />
        <div class="row">
          <div class="col-xs-6 col-md-4">
          </div>
          <div class="col-xs-6 col-md-6">
            <button type="button" className="button button3" onClick={convertTheExhangeRate}>Convert</button>
          </div>
        </div>
        <br />
        <div class="row">
          <div class="col-xs-6 col-md-4">
            <label> Calculated Value : </label>
            <input disabled={true} value={amount === "" ? 0 : result === null ? "" : result} />
          </div>
          <div class="col-xs-6 col-md-8">
            <label> Exchange Rate Value  : </label>
            <input disabled={true} value={amount === "" ? 0 : result === null ? "" : excrate} />
          </div>
        </div>
      </div>
      <br />
      <hr />
      <div className="ex3">
        <h1 className="chart-heading">Area Chart</h1>
        {console.log("The Pdata by Puspendra", pdata)}
        <ResponsiveContainer width="100%" aspect={3}>
          <AreaChart
            width={500}
            height={300}
            debugger
            data={pdata}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="dat" />
            <YAxis datakey="val" />
            <Tooltip />
            <Legend />
            <Area type="monotone" dataKey="price" stroke="#8884d8" fill="#8884d8" />
          </AreaChart>
        </ResponsiveContainer>

        <h1 className="chart-heading">Line Chart</h1>
        <ResponsiveContainer width="100%" aspect={3}>
          <LineChart data={pdata} width={500} height={300} margin={{ top: 5, right: 300, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="dat" interval={'preserveStartEnd'} />
            <YAxis />
            <Tooltip contentStyle={{ backgroundColor: 'yellow' }} />
            <Legend />
            <Line type="monotone" dataKey="price" stroke="red" activeDot={{ r: 8 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Fragment>
  )
}

export default Details
