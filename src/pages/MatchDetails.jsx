import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import Header from '../components/Header';

const MatchDetails = () => {
  const { id } = useParams();
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get(`https://v3.football.api-sports.io/fixtures/statistics?fixture=${id}`, {
          headers: {
            'x-apisports-key': 'b570f938b5d86fcf521cf630a5ba54b4',
          },
        });
        setStats(response.data.response);
      } catch (err) {
        setError('Failed to fetch match statistics');
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, [id]);

  return (
    <>
      <Header />
      <div className="p-6">
        <Link to="/" className="text-blue-600 hover:underline">← Back to Matches</Link>
        <h1 className="text-2xl font-bold mt-4 mb-2">Match Statistics</h1>
        {loading && <p>Loading statistics...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {stats.length > 0 ? (
          <ul className="space-y-2">
            {stats.map((teamStat, index) => (
              <li key={index} className="border-b pb-2">
                <h2 className="text-xl font-semibold">{teamStat.team.name}</h2>
                <ul className="ml-4">
                  {teamStat.statistics.map((stat, idx) => (
                    <li key={idx}><strong>{stat.type}:</strong> {stat.value}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        ) : (
          <p>No stats available.</p>
        )}
      </div>
    </>
  );
};

export default MatchDetails;