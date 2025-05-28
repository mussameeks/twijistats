import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import { Link } from 'react-router-dom';
import dummyData from '../data/dummyData.json';

const Home = () => {
  const [leagues, setLeagues] = useState([]);
  const [basketballLeagues, setBasketballLeagues] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDummyData = async () => {
      try {
        setLeagues(dummyData.footballLeagues || []);
        setBasketballLeagues(dummyData.basketballLeagues || []);
      } catch (err) {
        console.error('Failed to load dummy data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDummyData();
  }, []);

  if (loading) return <p className="text-center mt-10 text-gray-600">Loading leagues...</p>;

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
