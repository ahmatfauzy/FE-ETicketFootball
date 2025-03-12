import React, { useEffect, useState } from "react";
import { Calendar, Ticket } from "lucide-react";
import { fetchAllMatches } from "../../services/matchService";
import { fetchAllTickets } from "../../services/ticketService";
import Loading from "../../assets/loading.gif"

const Dashboard: React.FC = () => {
  useEffect(() => {
    document.title = "Dashboard - FootieGate";
  }, []);
  
  const [matchCount, setMatchCount] = useState<number>(0);
  const [ticketCount, setTicketCount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const matchesResponse = await fetchAllMatches();
        const ticketsResponse = await fetchAllTickets();

        setMatchCount(matchesResponse.data.length);
        setTicketCount(ticketsResponse.length);
      } catch (error) {
        console.error("Failed to load dashboard data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-full">
        <img src={Loading} alt="Loading..." />
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="bg-blue-100 p-3 rounded-full">
              <Calendar className="h-8 w-8 text-blue-600" />
            </div>
            <div className="ml-4">
              <h2 className="text-sm font-medium text-gray-500">
                Total Matches
              </h2>
              <p className="text-3xl font-bold">{matchCount}</p>
            </div>
          </div>
          <div className="mt-4">
            <a
              href="/matches"
              className="text-blue-600 hover:underline text-sm"
            >
              View all matches →
            </a>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="bg-green-100 p-3 rounded-full">
              <Ticket className="h-8 w-8 text-green-600" />
            </div>
            <div className="ml-4">
              <h2 className="text-sm font-medium text-gray-500">
                Total Tickets
              </h2>
              <p className="text-3xl font-bold">{ticketCount}</p>
            </div>
          </div>
          <div className="mt-4">
            <a
              href="/tickets"
              className="text-green-600 hover:underline text-sm"
            >
              View all tickets →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
