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
  const [shortUrls, setShortUrls] = useState([]);
  const [longUrls, setLongUrls] = useState([]);

  const createShortUrl = () => {
    if (urlInput) {
      if (
        urlInput.match(
          /https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,}/
        )
      ) {
        axios.post('/api/url/shorten', { url: urlInput }).then((res) => {
          if (shortUrls.length > 4) setShortUrls(state => state.slice(0,2))
          if (longUrls.length > 4) setShortUrls(state => state.slice(0,2))
          setShortUrls(state => [res.data.shortUrl, ...state]);
          setLongUrls(state => [res.data.longUrl, ...state]);
        });

        clearFields()
      } else {
        alert('invalid url');
      }
    } else {
      alert('empty url');
    }
  };

  const clearFields = () => {
    setUrlInput('');
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
          <Button
              variant="contained"
              color="secondary"
              onClick={() => clearFields()} 
              startIcon={<CropFreeIcon />}
              id="clear-fields">
              Clear Entry
            </Button>
          </div>

          <div className="short-url-container">
            {!(shortUrls === undefined || shortUrls.length == 0) && 
            <>
            <div>
         
            <p>
              Short Url: {shortUrls[0]}
              shorturl length: {shortUrls.length}
            </p>
            <p>
              Long Url: {longUrls[0]}
              longurl length: {longUrls.length}
            </p>
            </div>

            <div className='recent-urls-container'>
            {!(shortUrls === undefined || shortUrls.length < 2) && 
            <>
            {shortUrls.map(shortUrl => (
              <>
              {shortUrl}
              </>
            ))}
            </>
            }
            </div>
            </>
            }
          </div>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
