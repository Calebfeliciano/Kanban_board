import { UserLogin } from '../interfaces/UserLogin';

const login = async (userInfo: UserLogin): Promise<{ token: string }> => {
  try {
    const response = await fetch('/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userInfo)
    });

    // ✅ Check response status before parsing
    if (!response.ok) {
      throw new Error('User information not retrieved, check network tab!');
    }

    const data = await response.json();
    return data;
  } catch (err) {
    console.error('Error from user login:', err);
    return Promise.reject('Could not fetch user info');
  }
};

export { login };
