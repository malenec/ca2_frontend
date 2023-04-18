import React from 'react'
import facade from "../apiFacade";
import { useState, useEffect } from 'react'

function Test() {

    const [quote, setQuote] = useState("Loading")

    async function fetchQuote() {
        const response = await fetch("https://api.kanye.rest/");
        const jsonData = await response.json();
        console.log(jsonData);
        setQuote(jsonData.quote);
    }

    return (
        <div>
            <h4>Quote from Kanye West <button onClick={fetchQuote}> Get Quote </button></h4>

            <p>{quote}</p>
        </div>
    )
}

export default Test
