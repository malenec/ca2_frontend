import React from 'react'
import facade from "../apiFacade";
import { useState, useEffect } from 'react'

function Quote({ user }) {
  const [isUpdated, setIsUpdated] = useState(false)
  const [quote, setQuote] = useState("The quote will appear here")
  const [quoteId, setQuoteId] = useState(0)
  const [age, setAge] = useState("")
  const [name, setName] = useState([])
  //url uses a fetch method from the facade and therefore needs a smaller url than the following (it attaches the url to the facade url)
  const url = "/api/ext/kanye"
  const url1 = "http://localhost:8080/backend/api/ext/kanye"
  const url2 = "http://localhost:8080/backend/api/ext/age"
  const url3 = "http://localhost:8080/backend/api/ext/delete"

  const fetchQuote = () => {
    facade.fetchData(url).then(res => {
      console.log(res);
      setQuote(res)
      setIsUpdated(false)
    })
  };

  // THIS USEEFFECT IS NOT DONE YET, IT GETS ACTIVATED TWICE AND ALSO BEFORE BUTTON IS EVEN CLICKED
  useEffect(() => {
    fetchQuote();
  }, [isUpdated])

  const handleClick = (evt) => {
    setIsUpdated(true)
  }

  const saveQuote = () => {
    const options = quoteOptions("POST", { quote: quote });
    return fetch(url1 + "/" + user.username, options)
  }

  const saveAge = () => {
    const options = quoteOptions("POST", { age: age });
    return fetch(url2 + "/" + user.username, options)
  }

  const deleteQuote = () => {
    const options = quoteOptions("DELETE", { quote: quote });
    return fetch(url3 + "/" + user.username + "/" + quoteId, options)
  }

  async function fetchAge(evt) {
    const response = await fetch(url2 + "/" + name);
    const jsonData = await response.json();
    setAge(jsonData);
  }

  const handleChange = (event) => {
    setName(event.target.value);
  };

  const handleQuoteChange = (event) => {
    setQuoteId(event.target.value);
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

      <h4> Type in your name, and we will predict your age</h4>
      <form onSubmit={handleSubmit}>
        <input type="text" value={name} onChange={handleChange} />
        <button type="submit">Predict age</button>
        <p>Your predicted age is: {age}</p>
      </form>

      {user.username === "" ? (<h4>Log in to see Kanye quotes </h4>) :
        (<>
          <button onClick={saveAge}> saveAge </button>
          <h4> Quote from Kanye West  </h4>
          <button onClick={handleClick}> Get Quote </button>
          <p> {quote} </p>

          <h1><button onClick={saveQuote}> saveQuote </button></h1 >

          <h4> Don't like the quote anymore? You can delete it here by typing the id of the quote </h4>

          <p>
            <input type="number" placeholder='Type ID' value={quoteId} onChange={handleQuoteChange} />
            <button onClick={deleteQuote}> Delete quote </button>
          </p>
        </>)}

    </div>
  )
}

export default Quote
