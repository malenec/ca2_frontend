import React from 'react'
import facade from "../apiFacade";
import { useState, useEffect } from 'react'

function Quote({user}) {

    const [quote, setQuote] = useState("Loading")
    const url = "http://localhost:8080/backend/api/ext/kanye"

    async function fetchQuote() {
        const response = await fetch(url);
        const jsonData = await response.json();
        console.log(jsonData);
        setQuote(jsonData);
    }


    const saveQuote = () => {
        const options = quoteOptions("POST", {quote : quote} );
        return fetch(url + "/" + user.username, options)
  
    }

    const quoteOptions= (method,body) =>{
        var opts = {
          method: method,
          headers: {
            "Content-type": "application/json",
            'Accept': 'application/json',
          }
        }
       
        if (body) {
          opts.body = JSON.stringify(body);
        }
        return opts;
      }

    return (
        <div>
            <h4>Quote from Kanye West <button onClick={fetchQuote}> Get Quote </button></h4>
            <button onClick={saveQuote}> save </button>

            <p>{quote}</p>
        </div>
    )
}

export default Quote
