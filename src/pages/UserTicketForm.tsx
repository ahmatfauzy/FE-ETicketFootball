import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  createTicket,
  getTicketById,
  updateTicket,
} from "../services/ticketService";
import { fetchAllMatches } from "../services/matchService";
import { useAuth } from "../context/AuthContext";

interface Match {
  id: string;
  homeTeam: string;
  awayTeam: string;
}

interface TicketFormData {
  matchId: string;
  userId: string;
  seatNumber: string;
  price: number;
}

const UserTicketForm: React.FC = () => {
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();
  const isEditMode = !!id;
  const { user } = useAuth(); // Get current user from auth context

  const [formData, setFormData] = useState<TicketFormData>({
    matchId: "",
    userId: user?.id || "", // Auto-populate with logged-in user's ID
    seatNumber: "",
    price: 20000, // Fixed price set to 20000
  });

  const [matches, setMatches] = useState<Match[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);

        // Load matches for the dropdown
        const matchesResponse = await fetchAllMatches();
        setMatches(matchesResponse.data);

        // If editing, load ticket data
        if (isEditMode && id) {
          const ticketResponse = await getTicketById(id);

          // Verify the ticket belongs to the current user
          if (ticketResponse.userId !== user?.id) {
            setError("You can only edit your own tickets");
            setIsLoading(false);
            return;
          }

          setFormData({
            matchId: ticketResponse.matchId,
            userId: user?.id || "",
            seatNumber: ticketResponse.seatNumber,
            price: 20000,
          });
        }

        setError(null);
      } catch (err) {
        setError("Failed to load data");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [id, isEditMode, user?.id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    if (name === "matchId" || name === "seatNumber") {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsLoading(true);

      const ticketData = {
        ...formData,
        userId: user?.id || "",
        price: 20000,
      };

      if (isEditMode && id) {
        await updateTicket(id, ticketData);
      } else {
        await createTicket(ticketData);
      }

      navigate("/my-tickets");
    } catch (err) {
      setError(`Failed to ${isEditMode ? "update" : "create"} ticket`);
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading && isEditMode) {
    return (
      <div className="min-h-screen bg-gray-800 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-700 mx-auto"></div>
          <p className="mt-4 text-white">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-800 flex items-center justify-center">
        <div className="bg-gray-700 rounded-lg shadow-md p-8 text-center">
          <p className="text-gray-300">Please log in to purchase or edit tickets.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-800 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-6">
          {isEditMode ? "Edit Ticket" : "Purchase Ticket"}
        </h1>

        {error && (
          <div className="bg-red-600 rounded-lg shadow-md p-4 mb-6">
            <p className="text-white">{error}</p>
          </div>
        )}

        <div className="bg-gray-700 rounded-lg shadow-md p-6 border border-gray-600">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Match
                </label>
                <select
                  name="matchId"
                  value={formData.matchId}
                  onChange={handleChange}
                  required
                  className="w-full p-2 bg-gray-800 border border-gray-600 rounded-md text-white focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="" className="text-gray-300">Select Match</option>
                  {matches.map((match) => (
                    <option key={match.id} value={match.id} className="text-white">
                      {match.homeTeam} vs {match.awayTeam}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  User
                </label>
                <div className="w-full p-2 bg-gray-800 border border-gray-600 rounded-md text-gray-300">
                  {user.name || user.email || user.id}
                </div>
                <input type="hidden" name="userId" value={user.id} />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Seat Number
                </label>
                <input
                  type="text"
                  name="seatNumber"
                  value={formData.seatNumber}
                  onChange={handleChange}
                  required
                  className="w-full p-2 bg-gray-800 border border-gray-600 rounded-md text-white focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Price
                </label>
                <div className="w-full p-2 bg-gray-800 border border-gray-600 rounded-md text-gray-300 font-medium">
                  Rp 20,000
                </div>
                <input type="hidden" name="price" value="20000" />
              </div>
            </div>

            <div className="mt-6 flex items-center space-x-4">
              <button
                type="submit"
                disabled={isLoading}
                className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-4 py-2 rounded-lg shadow-md transition-all duration-300 disabled:opacity-50"
              >
                {isLoading
                  ? "Processing..."
                  : isEditMode
                  ? "Update Ticket"
                  : "Purchase Ticket"}
              </button>

              <button
                type="button"
                onClick={() => navigate("/my-tickets")}
                className="bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white px-4 py-2 rounded-lg shadow-md transition-all duration-300"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserTicketForm;