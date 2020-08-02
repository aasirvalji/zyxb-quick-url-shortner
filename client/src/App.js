import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { set } from 'mongoose';

function App() {
  const [urlInput, setUrlInput] = useState(null);
  const [shortUrl, setShortUrl] = useState();

  const createShortUrl = () => {
    axios.post('/api/url/shorten', { url: urlInput }).then((res) => {
      setShortUrl(res);
      console.log(res);
    });
  };

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <input onChange={(e) => setUrlInput(e.target.value)}></input>
          <button onClick={() => createShortUrl()}>YEET</button>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
