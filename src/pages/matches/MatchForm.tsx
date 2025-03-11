import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  createMatch,
  getMatchById,
  updateMatch,
} from "../../services/matchService";

interface MatchFormData {
  homeTeam: string;
  awayTeam: string;
  matchDate: string;
  stadium: string;
}

const MatchForm: React.FC = () => {
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();
  const isEditMode = !!id;

  const [formData, setFormData] = useState<MatchFormData>({
    homeTeam: "",
    awayTeam: "",
    matchDate: "",
    stadium: "",
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadMatch = async () => {
      if (isEditMode) {
        try {
          setIsLoading(true);
          const response = await getMatchById(id);
          const match = response.data;

          // Format the date for the datetime-local input
          const dateObj = new Date(match.matchDate);
          const formattedDate = dateObj.toISOString().slice(0, 16);

          setFormData({
            homeTeam: match.homeTeam,
            awayTeam: match.awayTeam,
            matchDate: formattedDate,
            stadium: match.stadium,
          });
          setError(null);
        } catch (err) {
          setError("Failed to load match details");
          console.error(err);
        } finally {
          setIsLoading(false);
        }
      }
    };

    loadMatch();
  }, [id, isEditMode]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsLoading(true);

      if (isEditMode) {
        await updateMatch(id, formData);
      } else {
        await createMatch(formData);
      }

      navigate("/matches");
    } catch (err) {
      setError(`Failed to ${isEditMode ? "update" : "create"} match`);
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading && isEditMode) {
    return (
      <div className="flex justify-center items-center h-full">Loading...</div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">
        {isEditMode ? "Edit Match" : "Add New Match"}
      </h1>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
          {error}
        </div>
      )}

      <div className="bg-white rounded-lg shadow p-6">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Home Team
              </label>
              <input
                type="text"
                name="homeTeam"
                value={formData.homeTeam}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Away Team
              </label>
              <input
                type="text"
                name="awayTeam"
                value={formData.awayTeam}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Match Date & Time
              </label>
              <input
                type="datetime-local"
                name="matchDate"
                value={formData.matchDate}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Stadium
              </label>
              <input
                type="text"
                name="stadium"
                value={formData.stadium}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          <div className="mt-6 flex items-center space-x-4">
            <button
              type="submit"
              disabled={isLoading}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
              {isLoading
                ? "Processing..."
                : isEditMode
                ? "Update Match"
                : "Create Match"}
            </button>

            <button
              type="button"
              onClick={() => navigate("/matches")}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MatchForm;
