
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMatchDetailsWithEvents } from "../api/sportsmonks";

const MatchDetail = () => {
  const { id } = useParams();
  const [match, setMatch] = useState(null);

  useEffect(() => {
    const fetchMatch = async () => {
      const data = await getMatchDetailsWithEvents(id);
      setMatch(data);
    };
    fetchMatch();
  }, [id]);

  if (!match) return <div>Loading...</div>;

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-2">
        {match.teams.home} vs {match.teams.away}
      </h1>
      <p className="text-sm text-gray-600 mb-6">{match.startTime}</p>

      <h2 className="text-xl font-semibold mb-4">Match Events</h2>
      <ul className="space-y-3">
        {match.events.map(event => (
          <li key={event.id} className="border-b pb-2">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">{event.minute}'</span>
              <span className="capitalize font-medium">{event.type}</span>
              <span>{event.player}</span>
              {event.result && <span className="text-xs text-blue-600">{event.result}</span>}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MatchDetail;
