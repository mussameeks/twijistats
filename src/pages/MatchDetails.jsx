import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import Header from '../components/Header';

const MatchDetails = () => {
  const { id } = useParams();
  const [match, setMatch] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [leagues, setLeagues] = useState([]);

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
        setError('Failed to fetch league data.');
      } finally {
        setLoading(false);
      }
    };

    fetchLeagues();
  }, [id]);

  if (loading) return <p className="text-center mt-10 text-gray-600">Loading league details...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;

  return (
    <>
      <Header />
      <div className="p-6 min-h-screen bg-white">
        <div className="max-w-4xl mx-auto bg-gray-50 p-6 rounded-lg shadow">
          <div className="text-right mb-4">
            <Link to="/" className="text-sm text-blue-600 hover:underline">← Back to Home</Link>
          </div>
          <h1 className="text-2xl font-bold text-blue-900 mb-4 text-center">Leagues List</h1>
          <ul className="grid grid-cols-2 gap-4 text-sm text-gray-700">
            {leagues.map((league, index) => (
              <li key={index} className="bg-white p-3 border rounded shadow">
                <span className="font-semibold">{league.league_name}</span><br />
                <span className="text-xs text-gray-500">Country: {league.country_name}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default MatchDetails;
