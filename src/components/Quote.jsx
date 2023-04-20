import React from 'react'
import facade from "../apiFacade";
import { useState, useEffect } from 'react'

function Quote({ user }) {
  const [isUdated, setIsUpdated] = useState(false)
  const [quote, setQuote] = useState("Loading")
  const [age, setAge] = useState("You have not predicted your age yet")
  const [name, setName] = useState([])
  const url = "/api/ext/kanye"
  const url2 = "http://localhost:8080/backend/api/ext/age"

  const fetchQuote = () => {
    facade.fetchData(url).then(res => {
      console.log(res);
      setQuote(res)
      setIsUpdated(false)
  })};

  // THIS USEEFFECT IS NOT DONE YET, IT GETS ACTIVATED TWICE AND ALSO BEFORE BUTTON IS EVEN CLICKED
  useEffect(() => {
    fetchQuote();
  }, [isUdated])

  const handleClick = (evt) => {
    setIsUpdated(true)
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
          <p> Quote from Kanye West <button onClick={handleClick}> Get Quote </button> </p>
          <p> {quote} </p>
          <button onClick={saveQuote}> saveQuote </button>
          <button onClick={saveAge}> saveAge </button>
        </>)}
      
    </div>
  )
}

export default Quote
