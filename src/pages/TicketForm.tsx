import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getMatchById } from '../services/matchService';
import { createTicket } from '../services/ticketService';
import { format } from 'date-fns';

interface Match {
  id: string;
  homeTeam: string;
  awayTeam: string;
  matchDate: string;
  stadium: string;
}

const TicketForm: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const queryParams = new URLSearchParams(location.search);
  const matchId = queryParams.get('matchId');

  const [match, setMatch] = useState<Match | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [seatNumber, setSeatNumber] = useState<string>('');
  const [price] = useState<number>(50000); 
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState<boolean>(false);

  useEffect(() => {
    const fetchMatchData = async () => {
      if (!matchId) {
        setError('No match ID provided');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const response = await getMatchById(matchId);
        setMatch(response.data);
      } catch (err) {
        setError('Failed to fetch match details');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMatchData();
  }, [matchId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!matchId || !user) {
      setSubmitError('Invalid match ID or user not logged in');
      return;
    }

    try {
      setIsSubmitting(true);
      setSubmitError(null);
      
      const ticketData = {
        matchId,
        userId: user.id,
        seatNumber,
        price
      };
      
      await createTicket(ticketData);
      setSubmitSuccess(true);
      
      // Reset form
      setSeatNumber('');
      
      // Redirect after 2 seconds
      setTimeout(() => {
        navigate('/my-tickets');
      }, 2000);
      
    } catch (err) {
      setSubmitError('Failed to create ticket. Please try again.');
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), 'dd MMMM yyyy, HH:mm');
    } catch {
      return dateString;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-gray-100 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 font-medium">Loading match details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-gray-100 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
          <div className="text-center text-red-500">
            <h2 className="text-xl font-semibold mb-3">Error</h2>
            <p className="mb-4">{error}</p>
            <button 
              onClick={() => navigate('/matches/user')} 
              className="bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white font-medium py-2 px-6 rounded-md transition duration-200"
            >
              Back to Matches
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!match) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-gray-100 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
          <div className="text-center">
            <h2 className="text-xl font-semibold mb-3">Match Not Found</h2>
            <p className="mb-4 text-gray-600">The match you are looking for does not exist.</p>
            <button 
              onClick={() => navigate('/matches/user')} 
              className="bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white font-medium py-2 px-6 rounded-md transition duration-200"
            >
              Back to Matches
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-100 py-6 px-4">
      <div className="max-w-lg mx-auto">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-gray-700 to-gray-800 text-white p-6">
            <h1 className="text-2xl font-bold text-center">Pesan Tiket</h1>
          </div>
          
          <div className="p-8">
            {submitSuccess ? (
              <div className="bg-gray-50 border border-gray-200 text-gray-700 px-4 py-4 rounded-md mb-4" role="alert">
                <div className="flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                  </svg>
                  <div>
                    <p className="font-medium">Tiket berhasil dipesan</p>
                    <p className="text-sm">Mengalihkan ke halaman tiket Anda...</p>
                  </div>
                </div>
              </div>
            ) : (
              <>
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-center mb-2">{match.homeTeam} vs {match.awayTeam}</h2>
                  <div className="text-gray-500 text-center">
                    <p className="mb-1">{formatDate(match.matchDate)}</p>
                    <p>{match.stadium}</p>
                  </div>
                </div>

                {submitError && (
                  <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md mb-6" role="alert">
                    <div className="flex">
                      <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"></path>
                      </svg>
                      <span>{submitError}</span>
                    </div>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="seatNumber" className="block text-gray-700 text-sm font-medium mb-2">
                      Nomor Kursi
                    </label>
                    <input
                      type="text"
                      id="seatNumber"
                      value={seatNumber}
                      onChange={(e) => setSeatNumber(e.target.value)}
                      className="shadow-sm border border-gray-300 rounded-md w-full py-3 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition duration-200"
                      placeholder="Contoh: A-123"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="price" className="block text-gray-700 text-sm font-medium mb-2">
                      Harga
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                        <span className="text-gray-500 font-medium">Rp</span>
                      </div>
                      <input
                        type="text"
                        id="price"
                        value={price.toLocaleString('id-ID')}
                        className="shadow-sm border border-gray-300 bg-gray-50 rounded-md w-full py-3 pl-12 pr-4 text-gray-700 cursor-not-allowed"
                        disabled
                      />
                    </div>
                    <p className="text-sm text-gray-500 mt-1">Harga tiket sudah ditetapkan</p>
                  </div>
                  
                  <div className="flex items-center justify-between pt-4">
                    <button
                      type="button"
                      onClick={() => navigate('/matches/user')}
                      className="bg-white hover:bg-gray-100 text-gray-700 font-medium py-3 px-6 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 transition duration-200"
                    >
                      Kembali
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white font-medium py-3 px-6 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition duration-200 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                      {isSubmitting ? (
                        <div className="flex items-center">
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          <span>Memesan...</span>
                        </div>
                      ) : 'Pesan Tiket'}
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketForm;