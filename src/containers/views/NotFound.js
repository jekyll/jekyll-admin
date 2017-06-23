import React from 'react';
import { setTitleTag } from '../../utils/helpers';

const NotFound = () => (
  <div className="notfound">
    {setTitleTag('Not found')}
    <img src={require('../../assets/images/logo-black-red.png')} />
    <h1>Huh. It seems that page is Hyde-ing...</h1>
    <h2>The resource you requested was not found.</h2>
  </div>
);

export default NotFound;
