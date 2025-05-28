
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import { Link } from 'react-router-dom';

const Home = () => {
  const [leagues, setLeagues] = useState([]);
  const [basketballLeagues, setBasketballLeagues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const footballAPIHeaders = {
    'x-apisports-key': 'b570f938b5d86fcf521cf630a5ba54b4',
  };

  const basketballAPIHeaders = {
    'X-RapidAPI-Key': 'b570f938b5d86fcf521cf630a5ba54b4',
    'X-RapidAPI-Host': 'api-basketball.p.rapidapi.com',
  };

  useEffect(() => {
    const fetchLeagues = async () => {
      try {
        // Fetch football leagues from API-FOOTBALL
        const footballResponse = await axios.get('https://v3.football.api-sports.io/leagues', {
          headers: footballAPIHeaders,
        });
        setLeagues(footballResponse.data.response || []);

        // Fetch basketball leagues
        const basketballResponse = await axios.get('https://api-basketball.p.rapidapi.com/leagues', {
          headers: basketballAPIHeaders,
        });
        setBasketballLeagues(basketballResponse.data.response || []);
      } catch (err) {
        console.error('Error fetching leagues:', err);
        setError('Failed to load league data.');
      } finally {
        setLoading(false);
      }
    };

    fetchLeagues();
  }, []);

  if (loading) return <p className="text-center mt-10 text-gray-600">Loading leagues...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;

  return (
    <>
      <Header />
      <div className="p-6 min-h-screen bg-white">
        <div className="max-w-4xl mx-auto bg-gray-50 p-6 rounded-lg shadow">
          <h1 className="text-3xl font-bold text-blue-900 mb-4 text-center">Football Leagues</h1>
          <ul className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm text-gray-700">
            {leagues.map((item, index) => (
              <li key={index} className="bg-white p-4 border rounded shadow text-center">
                <div className="font-semibold text-blue-800">{item.league.name}</div>
                <div className="text-xs text-gray-500">{item.country.name}</div>
                {item.league.logo && <img src={item.league.logo} alt="League Logo" className="mx-auto h-8 mt-2" />}
              </li>
            ))}
          </ul>

          <h1 className="text-3xl font-bold text-red-900 mt-10 mb-4 text-center">Basketball Leagues</h1>
          <ul className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm text-gray-700">
            {basketballLeagues.map((league, index) => (
              <li key={index} className="bg-white p-4 border rounded shadow text-center">
                <div className="font-semibold text-red-800">{league.league.name}</div>
                <div className="text-xs text-gray-500">{league.country.name}</div>
              </li>
            ))}
          </ul>

          <div className="mt-6 text-center">
            <Link to="/match/1354637" className="text-blue-600 hover:underline">Go to Match Details →</Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
