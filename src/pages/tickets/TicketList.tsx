import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { fetchAllTickets, deleteTicket } from '../../services/ticketService';
import Loading from "../../assets/loading.gif"

interface Ticket {
  id: string;
  matchId: string;
  userId: string;
  seatNumber: string;
  price: number;
  createdAt: string;
  updatedAt: string;
  match: {
    id: string;
    homeTeam: string;
    awayTeam: string;
  };
  user: {
    id: string;
    name: string;
  };
}

const TicketList: React.FC = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const loadTickets = async () => {
    try {
      setIsLoading(true);
      const response = await fetchAllTickets();
      setTickets(response);
      setError(null);
    } catch (err) {
      setError('Failed to load tickets');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadTickets();
  }, []);

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this ticket?')) {
      try {
        await deleteTicket(id);
        loadTickets();
      } catch (err) {
        setError('Failed to delete ticket');
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
        <h1 className="text-2xl font-bold">Ticket Management</h1>
        <Link 
          to="/tickets/add" 
          className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center hover:bg-green-700 transition-colors"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Ticket
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
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Match</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Seat Number</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {tickets.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-4 text-center text-gray-500">
                  No tickets found
                </td>
              </tr>
            ) : (
              tickets.map((ticket) => (
                <tr key={ticket.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {ticket.match ? `${ticket.match.homeTeam} vs ${ticket.match.awayTeam}` : 'N/A'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {ticket.user ? ticket.user.name : 'N/A'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{ticket.seatNumber}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{ticket.price}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex space-x-2">
                      <Link 
                        to={`/tickets/edit/${ticket.id}`} 
                        className="text-indigo-600 hover:text-indigo-900"
                      >
                        <Edit className="h-5 w-5" />
                      </Link>
                      <button 
                        onClick={() => handleDelete(ticket.id)} 
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

export default TicketList;