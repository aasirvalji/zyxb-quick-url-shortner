import React from 'react';
import './Heading.css';

const Heading = () => {
  return (
    <div>
      <div class="heading-container">
        <div id="heading-content-1" class="heading-content">
          <div id="icon-1" class="icon">
            <h2>urlShortner</h2>
            <a href='http://www.aasirvalji.com' target="_blank" rel="noopener noreferrer">
            <i class="far fa-user" id='person-icon'></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Heading;
