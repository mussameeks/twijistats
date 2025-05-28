import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import Header from '../components/Header';

const MatchDetails = () => {
  const { id } = useParams();
  const [match, setMatch] = useState(null);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
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
        setError('Failed to fetch match details.');
      } finally {
        setLoading(false);
      }
    };

    const fetchMatchEvents = async () => {
      try {
        const response = await axios.get(`https://v3.football.api-sports.io/fixtures/events?fixture=${id}`, {
          headers: {
            'x-apisports-key': 'b570f938b5d86fcf521cf630a5ba54b4',
          },
        });
        setEvents(response.data.response);
      } catch (err) {
        console.error('Error fetching match events:', err);
      }
    };

    fetchMatchDetails();
    fetchMatchEvents();
  }, [id]);

  if (loading) return <p className="text-center mt-10 text-gray-600">Loading match details...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;

  return (
    <>
      <Header />
      <div className="p-6 min-h-screen bg-white">
        <div className="max-w-4xl mx-auto bg-gray-50 p-6 rounded-lg shadow">
          <h1 className="text-2xl font-bold text-blue-900 mb-4 text-center">Match Details</h1>

          <div className="flex justify-between items-center border-b pb-4 mb-4">
            <div className="flex items-center gap-2">
              <img src={match.teams.home.logo} alt="Home Logo" className="w-10 h-10" />
              <span className="font-semibold text-lg">{match.teams.home.name}</span>
            </div>
            <span className="text-sm text-gray-500">{match.goals.home} - {match.goals.away}</span>
            <div className="flex items-center gap-2">
              <img src={match.teams.away.logo} alt="Away Logo" className="w-10 h-10" />
              <span className="font-semibold text-lg">{match.teams.away.name}</span>
            </div>
          </div>

          <div className="text-gray-700 mb-4">
            <p><strong>League:</strong> {match.league.name}</p>
            <p><strong>Stadium:</strong> {match.fixture.venue.name} ({match.fixture.venue.city})</p>
            <p><strong>Kickoff:</strong> {new Date(match.fixture.date).toLocaleString()}</p>
            <p><strong>Status:</strong> {match.fixture.status.long}</p>
          </div>

          {events.length > 0 && (
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-blue-900 mb-2">Live Match Events</h2>
              <ul className="text-sm text-gray-700">
                {events.map((event, index) => (
                  <li key={index} className="mb-1">
                    <strong>{event.time.elapsed}'</strong> - {event.team.name}: {event.player.name} ({event.type} - {event.detail})
                  </li>
                ))}
              </ul>
            </div>
          )}

          {match.statistics ? (
            <div className="grid grid-cols-2 gap-4 text-sm">
              {match.statistics.map((stat, index) => (
                <div key={index}>
                  <h3 className="font-bold text-blue-800 mb-1">{stat.team.name}</h3>
                  <ul className="text-gray-600">
                    {stat.statistics.map((item, i) => (
                      <li key={i}>{item.type}: {item.value}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No stats available.</p>
          )}

          {match.lineups?.length > 0 && (
            <div className="mt-6">
              <h2 className="text-lg font-semibold text-blue-900 mb-2">Lineups</h2>
              <div className="grid grid-cols-2 gap-6">
                {match.lineups.map((lineup, index) => (
                  <div key={index}>
                    <h3 className="font-bold text-gray-800 mb-1">{lineup.team.name}</h3>
                    <ul className="text-gray-600 text-sm">
                      {lineup.startXI.map((player, i) => (
                        <li key={i}>{player.player.name}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="mt-6 text-center">
            <Link to="/" className="inline-block bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition">Back to Home</Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default MatchDetails;