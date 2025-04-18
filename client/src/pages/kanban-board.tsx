import { useEffect, useState, useLayoutEffect } from 'react';
import { retrieveTickets, deleteTicket } from '../api/ticketAPI';
import { TicketData } from '../interfaces/TicketData';
import { ApiMessage } from '../interfaces/ApiMessage';
import Swimlane from '../components/Swimlane';
import ErrorPage from './ErrorPage';
import auth from '../utils/auth-service';

const boardStates = ['Todo', 'In Progress', 'Done'];

const KanbanBoard = () => {
  const [tickets, setTickets] = useState<TicketData[]>([]);
  const [error, setError] = useState(false);
  const [loginCheck, setLoginCheck] = useState(false);

  // ✅ Check login status on layout mount
  useLayoutEffect(() => {
    setLoginCheck(auth.loggedIn());
  }, []);

  // ✅ Fetch tickets once user is confirmed logged in
  useEffect(() => {
    if (!loginCheck) return;

    const fetchTickets = async () => {
      try {
        const data = await retrieveTickets();
        setTickets(data);
      } catch (err) {
        console.error('Failed to retrieve tickets:', err);
        setError(true);
      }
    };

    fetchTickets();
  }, [loginCheck]);

  // ✅ Handle deletion of individual tickets
  const handleDelete = async (ticketId: number): Promise<ApiMessage> => {
    try {
      const data = await deleteTicket(ticketId);
      const updated = await retrieveTickets();
      setTickets(updated);
      return data;
    } catch (err) {
      return Promise.reject('Failed to delete ticket');
    }
  };

  if (error) return <ErrorPage />;

  return (
    <>
      {!loginCheck ? (
        <div className='login-notice'>
          <h1>Login to create & view tickets</h1>
        </div>
      ) : (
        <div className='board'>
          <div className='board-display'>
            {boardStates.map((status) => {
              const filtered = tickets.filter(ticket => ticket.status === status);
              return (
                <Swimlane
                  key={status}
                  title={status}
                  tickets={filtered}
                  deleteTicket={handleDelete}
                />
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};

export default KanbanBoard;
