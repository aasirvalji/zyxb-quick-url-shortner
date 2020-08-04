import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { set } from 'mongoose';
import Heading from './components/Heading/Heading';

//material ui imports
import Button from '@material-ui/core/Button';
import CropFreeIcon from '@material-ui/icons/CropFree';

function App() {
  const [urlInput, setUrlInput] = useState(null);
  const [shortUrl, setShortUrl] = useState(null);

  const createShortUrl = () => {
    if (urlInput) {
      if (
        urlInput.match(
          /https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,}/
        )
      ) {
        axios.post('/api/url/shorten', { url: urlInput }).then((res) => {
          console.log(res.data);
          setShortUrl(res.data.shortUrl);
        });
      } else {
        alert('invalid url');
      }
    } else {
      alert('empty url');
    }
  };

  const clearFields = () => {
    setUrlInput('');
    setShortUrl(null);
  };

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Heading></Heading>
          <div className="main-container">
            <input
              id="url-input"
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
            />
            <Button
              variant="contained"
              color="secondary"
              onClick={() => createShortUrl()}
              startIcon={<CropFreeIcon />}
              id="submit-url"
            >
              Generate Url
            </Button>
          </div>

          <div className="clear-fields-container">
            <button onClick={() => clearFields()} id="clear-fields">
              Clear Fields
            </button>
          </div>

          <div className="short-url-container">
            <p>{shortUrl}</p>
          </div>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
