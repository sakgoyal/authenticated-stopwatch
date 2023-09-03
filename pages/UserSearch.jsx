import { useState } from 'react';

export default function UserSearch() {
  const [username, setUsername] = useState('');
  const [userData, setUserData] = useState(null);


  async function handleButton(endpoint){
    try{
      if (!username) {
        console.error('Error: username is required');
        setUserData(null);
        return;
      }
      const response = await fetch(`/api/${endpoint}`, { method: 'POST', headers: { 'Content-Type': 'application/json'}, body: JSON.stringify({ username }), });
      if (response.ok) {
        setUserData(await response.json());
      } else {
        setUserData(null);
        console.error('Error:', await response.json().error);
      }
    }catch(error){
      console.error('Error:', error);
    }
  }

  return (
    <div>
      <input type="text" placeholder="Enter username" value={username} onChange={(e) => setUsername(e.target.value)} />
      <button onClick={() => handleButton("getUser")}>Get User Data</button>
      <button onClick={() => handleButton("setUser")}>Set User Data</button>
      {userData && (
        <div> <h2>User Data</h2> <pre>{JSON.stringify(userData, null, 2)}</pre> </div>
      )}
    </div>
  );
}
