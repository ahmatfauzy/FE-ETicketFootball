import React from 'react';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';

interface Match {
    id: string;
    homeTeam: string;
    awayTeam: string;
    matchDate: string;
    stadium: string;
  }
  
  interface Ticket {
    id: string;
    matchId: string;
    userId: string;
    seatNumber: string;
    price: number;
    match?: Match;
  }
  
//   interface User {
//     id: string;
//     name: string;
//     email: string;
//   }

interface TicketListProps {
  tickets: Ticket[];
}

const TicketList: React.FC<TicketListProps> = ({ tickets }) => {
  return (
    <div>
      {tickets.length === 0 ? (
        <p className="text-gray-500 text-center py-4">Anda belum memiliki tiket</p>
      ) : (
        <div className="space-y-4">
          {tickets.map((ticket) => (
            <div key={ticket.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex justify-between flex-wrap">
                <div>
                  <h3 className="font-bold">
                    {ticket.match?.homeTeam} vs {ticket.match?.awayTeam}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {ticket.match ? format(new Date(ticket.match.matchDate), 'dd MMMM yyyy, HH:mm', { locale: id }) : 'Tanggal tidak tersedia'}
                  </p>
                  <p className="text-sm text-gray-600">
                    Stadion: {ticket.match?.stadium || 'Tidak tersedia'}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold bg-blue-100 text-blue-800 px-2 py-1 rounded">
                    Nomor Kursi: {ticket.seatNumber}
                  </p>
                  <p className="font-bold text-green-600 mt-2">
                    Rp {ticket.price.toLocaleString('id-ID')}
                  </p>
                </div>
              </div>
              <div className="mt-3 pt-3 border-t border-gray-200 flex justify-between items-center">
                <p className="text-xs text-gray-500">
                  ID Tiket: {ticket.id}
                </p>
                <button
                  className="text-sm text-white bg-green-500 hover:bg-green-600 px-3 py-1 rounded"
                  onClick={() => window.print()}
                >
                  Cetak Tiket
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TicketList;