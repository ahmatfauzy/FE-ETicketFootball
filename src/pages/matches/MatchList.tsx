import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Plus, Edit, Trash2 } from "lucide-react";
import { fetchAllMatches, deleteMatch } from "../../services/matchService";
import { format } from "date-fns";
import Loading from "../../assets/loading.gif";

interface Match {
  id: string;
  homeTeam: string;
  awayTeam: string;
  matchDate: string;
  stadium: string;
}

const MatchList: React.FC = () => {
  const [matches, setMatches] = useState<Match[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const loadMatches = async () => {
    try {
      setIsLoading(true);
      const response = await fetchAllMatches();
      setMatches(response.data);
      setError(null);
    } catch (err) {
      setError("Failed to load matches");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadMatches();
  }, []);

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this match?")) {
      try {
        await deleteMatch(id);
        loadMatches();
      } catch (err) {
        setError("Failed to delete match");
        console.error(err);
      }
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-full">
        <img src={Loading} alt="Loading..." />
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Match Management</h1>
        <Link
          to="/matches/add"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center hover:bg-blue-700 transition-colors"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Match
        </Link>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
          {error}
        </div>
      )}

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Home Team
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Away Team
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Stadium
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {matches.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-4 text-center text-gray-500">
                  No matches found
                </td>
              </tr>
            ) : (
              matches.map((match) => (
                <tr key={match.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {match.homeTeam}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {match.awayTeam}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {format(new Date(match.matchDate), "dd MMM yyyy, HH:mm")}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {match.stadium}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex space-x-2">
                      <Link
                        to={`/matches/edit/${match.id}`}
                        className="text-indigo-600 hover:text-indigo-900"
                      >
                        <Edit className="h-5 w-5" />
                      </Link>
                      <button
                        onClick={() => handleDelete(match.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MatchList;
