
// ... Unchanged imports and setup above

// Modified Home.jsx with team logos, league names, search, filter, animations, and countdown
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Header from '../components/Header';

const Home = () => {
  const [matches, setMatches] = useState([]);
  const [filteredMatches, setFilteredMatches] = useState([]);
  const [search, setSearch] = useState('');
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
        setFilteredMatches(response.data.response);
      } catch (err) {
        setError('Failed to fetch match data');
      } finally {
        setLoading(false);
      }
    };
    fetchMatches();
  }, []);

  useEffect(() => {
    const lowerSearch = search.toLowerCase();
    setFilteredMatches(
      matches.filter((match) =>
        match.teams.home.name.toLowerCase().includes(lowerSearch) ||
        match.teams.away.name.toLowerCase().includes(lowerSearch) ||
        match.league.name.toLowerCase().includes(lowerSearch)
      )
    );
  }, [search, matches]);

  const renderCountdown = (kickoff) => {
    const matchTime = new Date(kickoff).getTime();
    const now = new Date().getTime();
    const diff = matchTime - now;
    if (diff <= 0) return 'Live or Finished';

    const mins = Math.floor((diff / (1000 * 60)) % 60);
    const hrs = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    return `${days > 0 ? `${days}d ` : ''}${hrs}h ${mins}m`;
  };

  return (
    <>
      <Header />
      <div className="p-6 bg-gradient-to-br from-blue-50 to-white min-h-screen">
        <div className="text-center mb-10 animate-fade-in">
          <h1 className="text-4xl font-bold text-blue-900 mb-2">Welcome to TwijiStats</h1>
          <p className="text-lg text-gray-600">Live Football Match Statistics at Your Fingertips</p>
        </div>

        <input
          type="text"
          placeholder="Search teams or leagues..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="block w-full md:w-1/2 mx-auto mb-6 p-2 border border-gray-300 rounded-lg"
        />

        <h2 className="text-2xl font-bold mb-4 text-blue-800">Today’s Matches</h2>
        {loading && <p className="text-gray-600">Loading matches...</p>}
        {error && <p className="text-red-500">{error}</p>}
        <ul className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMatches.map((match) => (
            <li key={match.fixture.id} className="bg-white border border-gray-200 p-4 rounded-xl shadow hover:shadow-md transition-all animate-fade-in-up">
              <Link to={`/match/${match.fixture.id}`} className="block">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <img src={match.teams.home.logo} alt={match.teams.home.name} className="w-6 h-6" />
                    <span className="font-semibold">{match.teams.home.name}</span>
                  </div>
                  <span className="text-sm text-gray-600">vs</span>
                  <div className="flex items-center space-x-2">
                    <img src={match.teams.away.logo} alt={match.teams.away.name} className="w-6 h-6" />
                    <span className="font-semibold">{match.teams.away.name}</span>
                  </div>
                </div>
                <p className="text-sm text-gray-500">League: {match.league.name}</p>
                <p className="text-sm text-gray-400">Kickoff: {new Date(match.fixture.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                <p className="text-sm text-green-600 mt-1">⏳ {renderCountdown(match.fixture.date)}</p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Home;
