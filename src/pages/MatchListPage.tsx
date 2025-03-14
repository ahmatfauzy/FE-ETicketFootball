import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchAllMatches } from "../services/matchService";
import { format } from "date-fns";

interface Match {
  id: string;
  homeTeam: string;
  awayTeam: string;
  matchDate: string;
  stadium: string;
}

const MatchListPage: React.FC = () => {
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getMatches = async () => {
      try {
        setLoading(true);
        const response = await fetchAllMatches();
        setMatches(response.data);
        setError(null);
      } catch (err) {
        setError("Failed to fetch matches");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    getMatches();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-800 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-700 mx-auto"></div>
          <p className="mt-4 text-white">Loading matches...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-800 flex items-center justify-center">
        <div className="bg-gray-700 rounded-lg shadow-md p-8 text-center">
          <h2 className="text-2xl font-bold mb-2 text-white">Error</h2>
          <p className="mb-4 text-gray-300">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-gradient-to-r from-gray-700 to-gray-900 hover:from-gray-800 hover:to-gray-900 text-white font-bold py-2 px-6 rounded-lg shadow-md transition-all duration-300"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), "dd MMM yyyy, HH:mm");
    } catch {
      return dateString;
    }
  };

  return (
    <div className="min-h-screen bg-gray-800 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <h1 className="text-3xl font-bold text-white">Daftar Pertandingan</h1>
          <Link
            to="/dashboard"
            className="bg-gradient-to-r from-gray-700 to-gray-900 hover:from-gray-800 hover:to-gray-900 text-white font-bold py-2 px-6 rounded-lg shadow-md transition-all duration-300"
          >
            Kembali ke Home
          </Link>
        </div>

        {matches.length === 0 ? (
          <div className="bg-gray-700 rounded-lg shadow-md p-8 text-center border border-gray-600">
            <p className="text-lg text-gray-300">Tidak ada pertandingan yang tersedia saat ini.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {matches.map((match) => (
              <div
                key={match.id}
                className="bg-gray-700 rounded-lg shadow-md p-6 transition-all duration-300 hover:shadow-lg border border-gray-600"
              >
                <div className="text-center font-bold text-lg mb-4 text-white">
                  {formatDate(match.matchDate)}
                </div>
                <div className="flex justify-between items-center mb-4">
                  <div className="text-lg font-bold text-white">{match.homeTeam}</div>
                  <div className="text-lg font-medium text-gray-300">VS</div>
                  <div className="text-lg font-bold text-white">{match.awayTeam}</div>
                </div>
                <p className="text-sm text-center mb-6 text-gray-300">{match.stadium}</p>
                <div className="flex justify-center">
                  <Link to={`/tickets/user/add?matchId=${match.id}`} className="w-full">
                    <button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-2 px-4 rounded-lg shadow-md transition-all duration-300">
                      Pesan Tiket
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MatchListPage;