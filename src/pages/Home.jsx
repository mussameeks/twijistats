import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import { Link } from 'react-router-dom';

const Home = () => {
  const [leagues, setLeagues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLeagues = async () => {
      try {
        const response = await axios.get('/api/leagues'); // old API path assumed
        setLeagues(response.data);
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
      <div className="p-6 min-h-screen bg-gray-100">
        <div className="max-w-5xl mx-auto bg-white p-6 rounded-lg shadow-md">
          <h1 className="text-4xl font-bold text-center text-blue-900 mb-6">Welcome to TwijiStats</h1>
          <p className="text-center text-gray-700 mb-4">Track your favorite football leagues in real-time!</p>
          <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {leagues.map((league, idx) => (
              <li key={idx} className="bg-blue-50 p-4 rounded shadow hover:shadow-lg transition">
                <div className="font-semibold text-lg text-blue-800">{league.name}</div>
                <div className="text-sm text-gray-500">{league.country}</div>
              </li>
            ))}
          </ul>
          <div className="mt-8 text-center">
            <Link to="/match/1354637" className="inline-block text-white bg-blue-700 px-4 py-2 rounded hover:bg-blue-800 transition">
              View Match Details
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;