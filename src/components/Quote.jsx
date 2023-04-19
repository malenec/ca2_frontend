import React from 'react'
import facade from "../apiFacade";
import { useState, useEffect } from 'react'

function Quote() {

    const [quote, setQuote] = useState("Loading")

    async function fetchQuote() {
        const response = await fetch("http://localhost:8080/backend/api/ext/kanye");
        const jsonData = await response.json();
        console.log(jsonData);
        setQuote(jsonData);
    }

    return (
        <div>
            <h4>Quote from Kanye West <button onClick={fetchQuote}> Get Quote </button></h4>

            <p>{quote}</p>
        </div>
    )
}

export default Quote
