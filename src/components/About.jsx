import React, { useContext } from 'react';
import MyContext from '../MyContext';

export const About = () => {
  const { autor } = useContext(MyContext);

  return (
    <div>
      <h1>About Page</h1>
      <p>This is the about page of the Crypto Dashboard application.</p>
      <p>Author: {autor}</p>
    </div>
  );
}
