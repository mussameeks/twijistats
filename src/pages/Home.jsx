import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Header from '../components/Header';

const Home = () => {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const today = new Date().toISOString().split('T')[0];
        const response = await axios.get(`https://v3.football.api-sports.io/fixtures?date=${today}`, {
          headers: {
            'x-apisports-key': 'b570f938b5d86fcf521cf630a5ba54b4',
          },
        });
        setMatches(response.data.response);
      } catch (err) {
        setError('Failed to fetch match data');
      } finally {
        setLoading(false);
      }
    };
    fetchMatches();
  }, []);

  return (
    <>
      <Header />
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Today’s Matches</h1>
        {loading && <p>Loading matches...</p>}
        {error && <p className="text-red-500">{error}</p>}
        <ul className="space-y-4">
          {matches.map((match) => (
            <li key={match.fixture.id} className="border p-4 rounded shadow">
              <Link to={`/match/${match.fixture.id}`} className="text-lg font-semibold hover:underline">
                {match.teams.home.name} vs {match.teams.away.name} - {match.goals.home} : {match.goals.away}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Home;