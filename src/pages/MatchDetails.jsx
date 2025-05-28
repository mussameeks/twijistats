// src/pages/MatchDetails.jsx
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import Header from '../components/Header';

const MatchDetails = () => {
  const { id } = useParams();
  const [match, setMatch] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMatchDetails = async () => {
      try {
        const response = await axios.get(`https://v3.football.api-sports.io/fixtures?id=${id}`, {
          headers: {
            'x-apisports-key': 'b570f938b5d86fcf521cf630a5ba54b4',
          },
        });
        setMatch(response.data.response[0]);
      } catch (err) {
        setError('Failed to load match details.');
      }
    };
    fetchMatchDetails();
  }, [id]);

  if (error) return <p className="text-red-600">{error}</p>;
  if (!match) return <p className="text-gray-500">Loading match details...</p>;

  const { teams, goals, fixture, league } = match;

  return (
    <>
      <Header />
      <div className="p-6 max-w-3xl mx-auto bg-white shadow-md rounded-xl mt-6">
        <Link to="/" className="text-blue-500 text-sm mb-4 inline-block">← Back to matches</Link>
        <h1 className="text-2xl font-bold text-center mb-6">Match Details</h1>
        <div className="flex justify-between items-center mb-4">
          <div className="text-center">
            <img src={teams.home.logo} alt={teams.home.name} className="w-12 mx-auto" />
            <p className="font-semibold">{teams.home.name}</p>
          </div>
          <div className="text-xl font-bold">{goals.home} - {goals.away}</div>
          <div className="text-center">
            <img src={teams.away.logo} alt={teams.away.name} className="w-12 mx-auto" />
            <p className="font-semibold">{teams.away.name}</p>
          </div>
        </div>
        <p className="text-center text-sm text-gray-600 mb-2">{league.name} - {league.round}</p>
        <p className="text-center text-sm text-gray-500 mb-4">Kickoff: {new Date(fixture.date).toLocaleString()}</p>
        <div className="text-sm text-gray-700">
          <p>Status: {fixture.status.long}</p>
          <p>Stadium: {fixture.venue.name}, {fixture.venue.city}</p>
          <p>Referee: {fixture.referee || 'Not assigned'}</p>
        </div>
      </div>
    </>
  );
};

export default MatchDetails;
