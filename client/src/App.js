import React, { useState } from 'react';
import './App.css';
import axios from 'axios';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Heading from './components/Heading/Heading';

import Button from '@material-ui/core/Button';
import CropFreeIcon from '@material-ui/icons/CropFree';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import AssignmentIcon from '@material-ui/icons/Assignment';
import Divider from '@material-ui/core/Divider';

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
          if (shortUrls.length > 4) {
            let su = [...shortUrls]
            su = su.slice(0, 4)
            setShortUrls(su)
          }
          if (longUrls.length > 4) 
          {
            let lu = [...longUrls]
            lu = lu.slice(0, 4)
            setLongUrls(lu)
          }
          console.log(shortUrls, longUrls)
          setShortUrls(state => [res.data.shortUrl, ...state]);
          setLongUrls(state => [res.data.longUrl, ...state]);
        });

        clearFields()
      } else {
        alert('Sorry, thats an invalid url');
      }
    } else {
      alert('Empty input, please add a url');
    }
  };

  const clearFields = () => {
    setUrlInput('');
  };

  function copyToClipboard(text) {
    if (window.clipboardData && window.clipboardData.setData) {
        // Internet Explorer-specific code path to prevent textarea being shown while dialog is visible.
        return window.clipboardData.setData("Text", text);

    }
    else if (document.queryCommandSupported && document.queryCommandSupported("copy")) {
        var textarea = document.createElement("textarea");
        textarea.textContent = text;
        textarea.style.position = "fixed";  // Prevent scrolling to bottom of page in Microsoft Edge.
        document.body.appendChild(textarea);
        textarea.select();
        try {
            return document.execCommand("copy");  // Security exception may be thrown by some browsers.
        }
        catch (ex) {
            console.warn("Copy to clipboard failed.", ex);
            return false;
        }
        finally {
            document.body.removeChild(textarea);
        }
    }
}

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Heading></Heading>
          <div className='main-container'>
          <div className="input-container">
            <input
              id="url-input"
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
            />
            <Button
              variant="contained"
              onClick={() => createShortUrl()}
              startIcon={<CropFreeIcon />}
              style={{backgroundColor: '#1B36E1', color: 'white'}}
              className='ui-btn'
              id="submit-url"
            >
              Generate Url
            </Button>
          </div>

          <div className="clear-fields-container">
          <Button
              variant="contained"
              onClick={() => clearFields()} 
              startIcon={<HighlightOffIcon />}
              style={{backgroundColor: '#1B36E1', color: 'white'}}
              id="clear-fields">
              Clear Entry
            </Button>
          </div>
          </div>
          <div className="result-container">
            {!(shortUrls === undefined || shortUrls.length == 0) && 
            <>
            <div className='result-content'>
            <div className='first-short-url-and-copy'>
            <p>
              Short Url: <b>{shortUrls[0]}</b>
            </p>
            <Button
              variant="contained"
              startIcon={<AssignmentIcon />}
              className='ui-btn'
              style={{backgroundColor: '#1B36E1', color: 'white'}}
              onClick={() => copyToClipboard(shortUrls[0])}
              id="clipboard">
              Copy
            </Button>
            </div>
            <div className='long-short-url' id={longUrls.length < 2 && 'first-recent-url'}>
            <p>
              Long Url: <b>{longUrls[0]}</b>
              {/* longurl length: {longUrls.length} */}
            </p>
            </div>
            {(shortUrls.length > 1 && longUrls.length > 1) && <Divider style={{backgroundColor: 'white'}} className='divider'/>}
            </div>

            <div className='recent-urls-container'>
            {!(shortUrls === undefined || shortUrls.length < 2) && 
            <div>
            {shortUrls.map((shortUrl, index) => (
              <>
              {index > 0 && 
                <div className='result-content'>
            <div className='first-short-url-and-copy'>
            <p>
              Short Url: <b>{shortUrl}</b>
            </p>
            <Button
              variant="contained"
              className='ui-btn'
              style={{backgroundColor: '#1B36E1', color: 'white'}}
              startIcon={<AssignmentIcon />}
              id="clipboard"
              onClick={() => copyToClipboard(shortUrl)}
              >
              Copy
            </Button>
            </div>
            <div className='long-short-url' id={index === shortUrls.length - 1 ? 'last-recent-url' : ''}>
            <p>
              Long Url: <b>{longUrls[index]}</b>
            </p>
            </div>
            {(index < shortUrls.length - 1) && <Divider style={{backgroundColor: 'white'}} className='divider'/>}
            </div>
              }
              </>
            ))}
            </div>
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
