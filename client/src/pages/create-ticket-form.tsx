import { useState, useEffect, FormEvent, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { createTicket } from '../api/ticketAPI';
import { retrieveUsers } from '../api/userAPI';
import { TicketData } from '../interfaces/TicketData';
import { UserData } from '../interfaces/UserData';

const CreateTicketForm = () => {
  const [ticket, setTicket] = useState<TicketData>({
    id: 0,
    name: '',
    description: '',
    status: 'Todo',
    assignedUserId: 1,
    assignedUser: null
  });

  const [users, setUsers] = useState<UserData[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await retrieveUsers();
        setUsers(data);
      } catch (err) {
        console.error('Failed to retrieve users:', err);
      }
    };

    fetchUsers();
  }, []);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setTicket((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await createTicket(ticket);
      navigate('/');
    } catch (err) {
      console.error('Failed to create ticket:', err);
    }
  };

  return (
    <div className='form-container'>
      <form className='form' onSubmit={handleSubmit}>
        <h1>Create Ticket</h1>

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

        <label htmlFor='tUserId'>Assigned User</label>
        <select
          name='assignedUserId'
          id='tUserId'
          value={ticket.assignedUserId ?? ''}
          onChange={handleChange}
        >
          {users.map((user) => (
            <option key={user.id} value={user.id ?? ''}>
              {user.username}
            </option>
          ))}
        </select>

        <button type='submit' className='btn btn--edit'>Create Ticket</button>
      </form>
    </div>
  );
};

export default CreateTicketForm;


