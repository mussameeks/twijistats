import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import Header from '../components/Header';

const MatchDetails = () => {
  const { id } = useParams();
  const [match, setMatch] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMatchDetails = async () => {
      try {
        const response = await axios.get(`https://api-football-v1.p.rapidapi.com/v3/fixtures?id=${id}`, {
          headers: {
            'X-RapidAPI-Key': 'a2b2e6987cmsh91ddc6012cbd00dp16cc01jsn5ce76f7384d3',
            'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com',
          },
        });
        setMatch(response.data.response[0]);
      } catch (err) {
        console.error('Error fetching match details:', err);
        setError('Failed to load match details.');
      } finally {
        setLoading(false);
      }
    };

    fetchMatchDetails();
  }, [id]);

  if (loading) return <p className="text-center mt-10 text-gray-600">Loading match details...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;
  if (!match) return <p className="text-center mt-10 text-gray-500">No match data available.</p>;

  return (
    <>
      <Header />
      <div className="p-6 min-h-screen bg-white">
        <div className="max-w-3xl mx-auto bg-gray-50 p-6 rounded-lg shadow">
          <h1 className="text-2xl font-bold text-blue-900 mb-4 text-center">Match Details</h1>
          <div className="text-center mb-4 text-gray-700">
            <div>{match.teams.home.name} vs {match.teams.away.name}</div>
            <div>{match.fixture.date}</div>
            <div>Status: {match.fixture.status.long}</div>
            <div>Score: {match.goals.home} - {match.goals.away}</div>
          </div>
          <div className="text-center">
            <Link to="/" className="text-blue-600 hover:underline">← Back to Home</Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default MatchDetails;