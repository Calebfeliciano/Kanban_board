import { useState, useEffect, FormEvent, ChangeEvent } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { retrieveTicket, updateTicket } from '../api/ticketAPI';
import { TicketData } from '../interfaces/TicketData';

const EditTicketForm = () => {
  const [ticket, setTicket] = useState<TicketData | undefined>();
  const navigate = useNavigate();
  const { state } = useLocation(); // expects { id: number }

  useEffect(() => {
    const fetchTicket = async () => {
      try {
        const data = await retrieveTicket(state.id);
        setTicket(data);
      } catch (err) {
        console.error('Failed to retrieve ticket:', err);
      }
    };

    if (state?.id) {
      fetchTicket();
    }
  }, [state]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setTicket((prev) => prev ? { ...prev, [name]: value } : undefined);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!ticket?.id) return;

    try {
      await updateTicket(ticket.id, ticket);
      navigate('/');
    } catch (err) {
      console.error('Failed to update ticket:', err);
    }
  };

  return (
    <div className='form-container'>
      {ticket ? (
        <form className='form' onSubmit={handleSubmit}>
          <h1>Edit Ticket</h1>

          <label htmlFor='tName'>Ticket Name</label>
          <textarea
            id='tName'
            name='name'
            value={ticket.name || ''}
            onChange={handleChange}
          />

          <label htmlFor='tStatus'>Ticket Status</label>
          <select
            name='status'
            id='tStatus'
            value={ticket.status || ''}
            onChange={handleChange}
          >
            <option value='Todo'>Todo</option>
            <option value='In Progress'>In Progress</option>
            <option value='Done'>Done</option>
          </select>

          <label htmlFor='tDescription'>Ticket Description</label>
          <textarea
            id='tDescription'
            name='description'
            value={ticket.description || ''}
            onChange={handleChange}
          />

          <button type='submit'
          className='btn'
          >Update Ticket</button>
        </form>
      ) : (
        <div>Loading ticket info...</div>
      )}
    </div>
  );
};

export default EditTicketForm;
