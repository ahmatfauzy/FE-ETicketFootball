import React, { useState, useEffect } from 'react';
import { fetchAllTickets, deleteTicket } from '../services/ticketService';
import { useAuth } from '../context/AuthContext';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';

interface Ticket {
  id: string;
  matchId: string;
  userId: string;
  seatNumber: string;
  price: number;
  createdAt: string;
  match: {
    id: string;
    homeTeam: string;
    awayTeam: string;
    matchDate: string;
    stadium: string;
  };
}

const MyTicketsPage: React.FC = () => {
  const { user } = useAuth();
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [deleteLoading, setDeleteLoading] = useState<boolean>(false);

  useEffect(() => {
    const getTickets = async () => {
      try {
        setLoading(true);
        const response = await fetchAllTickets();
        // Show only user's tickets - fixed null check for user
        if (user) {
          setTickets(response.filter((ticket: Ticket) => ticket.userId === user.id));
        }
      } catch (err) {
        setError('Failed to fetch tickets');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      getTickets();
    }
  }, [user]);

  const handleDeleteClick = (ticketId: string) => {
    setDeleteConfirm(ticketId);
  };

  const confirmDelete = async (ticketId: string) => {
    try {
      setDeleteLoading(true);
      await deleteTicket(ticketId);
      setTickets(tickets.filter(ticket => ticket.id !== ticketId));
    } catch (err) {
      setError('Failed to delete ticket');
      console.error(err);
    } finally {
      setDeleteLoading(false);
      setDeleteConfirm(null);
    }
  };

  const cancelDelete = () => {
    setDeleteConfirm(null);
  };

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), 'dd MMM yyyy, HH:mm');
    } catch {
      return dateString;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-800 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-700 mx-auto"></div>
          <p className="mt-4 text-white">Loading tickets...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-800 flex items-center justify-center">
        <div className="text-center">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-16 w-16 text-red-500 mx-auto mb-4" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
            />
          </svg>
          <h2 className="text-2xl font-bold mb-2 text-white">Error</h2>
          <p className="text-gray-300 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="bg-gradient-to-r from-gray-700 to-gray-900 hover:from-gray-800 hover:to-gray-900 text-white font-bold py-2 px-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-800 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <h1 className="text-3xl font-bold text-white">Tiket Saya</h1>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link to="/dashboard" className="bg-gradient-to-r from-gray-700 to-gray-900 hover:from-gray-800 hover:to-gray-900 text-white font-bold py-2 px-6 rounded-lg shadow-sm hover:shadow transition-all duration-300">
              Kembali ke Home
            </Link>
            <Link to="/matches/user" className="bg-gradient-to-r from-gray-700 to-gray-900 hover:from-gray-800 hover:to-gray-900 text-white font-bold py-2 px-6 rounded-lg shadow-sm hover:shadow transition-all duration-300">
              Pesan Tiket Baru
            </Link>
          </div>
        </div>

        {tickets.length === 0 ? (
          <div className="bg-gray-700 rounded-lg shadow-md p-8 text-center border border-gray-600">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-16 w-16 text-gray-400 mx-auto mb-4" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" 
              />
            </svg>
            <p className="text-gray-300 text-lg mb-6">Anda belum memiliki tiket.</p>
            <Link to="/matches/user" className="inline-block bg-gradient-to-r from-gray-700 to-gray-900 hover:from-gray-800 hover:to-gray-900 text-white font-bold py-3 px-8 rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
              Lihat Pertandingan
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tickets.map((ticket) => (
              <div key={ticket.id} className="bg-gray-700 rounded-lg shadow-md overflow-hidden border border-gray-600 transition-all duration-300 hover:shadow-lg">
                <div className="bg-gradient-to-r from-gray-800 to-gray-900 text-white p-4">
                  <div className="text-center font-bold">
                    {ticket.match && formatDate(ticket.match.matchDate)}
                  </div>
                </div>
                <div className="p-6">
                  {ticket.match && (
                    <>
                      <div className="flex justify-between items-center mb-4">
                        <div className="text-lg font-bold text-white">{ticket.match.homeTeam}</div>
                        <div className="text-lg font-medium text-gray-300">VS</div>
                        <div className="text-lg font-bold text-white">{ticket.match.awayTeam}</div>
                      </div>
                      <div className="text-gray-300 mb-2">
                        <div className="flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          <span className="truncate">{ticket.match.stadium}</span>
                        </div>
                      </div>
                    </>
                  )}
                  <div className="border-t border-gray-600 pt-4 mt-4">
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-300">Nomor Kursi:</span>
                      <span className="font-medium text-white">{ticket.seatNumber}</span>
                    </div>
                    <div className="flex justify-between mb-4">
                      <span className="text-gray-300">Harga:</span>
                      <span className="font-medium text-white">Rp {ticket.price.toLocaleString()}</span>
                    </div>
                    
                    {deleteConfirm === ticket.id ? (
                      <div className="mt-4 border-t border-gray-600 pt-4">
                        <p className="text-red-400 mb-4 text-center font-medium">Yakin ingin membatalkan tiket ini?</p>
                        <div className="flex justify-between gap-3">
                          <button 
                            onClick={cancelDelete}
                            className="flex-1 bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-lg transition-all duration-300 shadow-sm hover:shadow"
                            disabled={deleteLoading}
                          >
                            Batal
                          </button>
                          <button 
                            onClick={() => confirmDelete(ticket.id)}
                            className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg transition-all duration-300 shadow-sm hover:shadow"
                            disabled={deleteLoading}
                          >
                            {deleteLoading ? (
                              <span className="flex items-center justify-center">
                                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Menghapus...
                              </span>
                            ) : 'Hapus Tiket'}
                          </button>
                        </div>
                      </div>
                    ) : (
                      <button 
                        onClick={() => handleDeleteClick(ticket.id)}
                        className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-bold py-2 px-4 rounded-lg transition-all duration-300 shadow-sm hover:shadow"
                      >
                        Batalkan Tiket
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyTicketsPage;