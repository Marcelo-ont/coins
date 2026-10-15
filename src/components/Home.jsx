import React, { useState, useEffect } from 'react';
// Fix: useNavigate must start with a lowercase 'u'
import { useNavigate } from 'react-router-dom';

export const Home = () => {
  const [coins, setCoins] = useState([]);
  
  // Initialize the navigate function
  const navigate = useNavigate();

  useEffect(() => {
    fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error en la respuesta del servidor');
        }
        return response.json();
      })
      .then((data) => {
        setCoins(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  // Handler function for the click event
  const handleCoinClick = (id) => {
    navigate(`/coin/${id}`);
  };

  return (
    <div>
      <h1>Home - Crypto Markets</h1>
      <ul>
        {coins.map((coin) => (
          <li 
            key={coin.id} 
            onClick={() => handleCoinClick(coin.id)}
            style={{ cursor: 'pointer', color: 'blue', textDecoration: 'underline', marginBottom: '8px' }}
          >
            {coin.name} ({coin.symbol.toUpperCase()})
          </li>
        ))}
      </ul>
    </div>
  );
};