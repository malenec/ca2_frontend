import React from 'react'
import facade from "../apiFacade";
import { useState, useEffect } from 'react'

function Quote({ user }) {

  const [quote, setQuote] = useState("Loading")
  const [age, setAge] = useState("You have not predicted your age yet")
  const [name, setName] = useState([])
  const url = "http://localhost:8080/backend/api/ext/kanye"
  const url2 = "http://localhost:8080/backend/api/ext/age"

  async function fetchQuote() {
    const response = await fetch(url);
    const jsonData = await response.json();
    console.log(jsonData);
    setQuote(jsonData);
  }

  const saveQuote = () => {
    const options = quoteOptions("POST", { quote: quote });
    return fetch(url + "/" + user.username, options)
  }

  const saveAge = () => {
    const options = quoteOptions("POST", { age: age });
    return fetch(url2 + "/" + user.username, options)
  }

  async function fetchAge(evt) {
    const response = await fetch(url2 + "/" + name);
    const jsonData = await response.json();
    setAge(jsonData);
  }

  const handleChange = (event) => {
    setName(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetchAge();
    setName('');
  };


  const quoteOptions = (method, body) => {
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

      <p> Type in your name, and we will predict your age</p>
      <form onSubmit={handleSubmit}>
        <input type="text" value={name} onChange={handleChange} />
        <button type="submit">Predict age</button>
        <p>Your predicted age is: {age}</p>
      </form>

      {user.username === "" ? (<h4>Log in to see Kanye quotes </h4>) :
        (<>
          <p> Quote from Kanye West <button onClick={fetchQuote}> Get Quote </button> </p>
          <button onClick={saveQuote}> saveQuote </button>
          <button onClick={saveAge}> saveAge </button>
        </>)}
      <p>{quote}</p>
    </div>
  )
}

export default Quote
