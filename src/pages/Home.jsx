
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import { Link } from 'react-router-dom';

const Home = () => {
  const [leagues, setLeagues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const rapidAPIHeaders = {
    'X-RapidAPI-Key': 'a2b2e6987cmsh91ddc6012cbd00dp16cc01jsn5ce76f7384d3',
    'X-RapidAPI-Host': 'free-api-live-football-data.p.rapidapi.com',
  };

  useEffect(() => {
    const fetchLeagues = async () => {
      try {
        const response = await axios.get('https://free-api-live-football-data.p.rapidapi.com/football-get-all-leagues', {
          headers: rapidAPIHeaders,
        });
        setLeagues(response.data.result || []);
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
            {leagues.map((league, index) => (
              <li key={index} className="bg-white p-4 border rounded shadow text-center">
                <div className="font-semibold text-blue-800">{league.league_name}</div>
                <div className="text-xs text-gray-500">{league.country_name}</div>
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
