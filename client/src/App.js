import './App.css';
import { useState } from 'react';
import axios from 'axios';


function App() {
  const [dateInput, setDateInput] = useState("");
  const [timeStamp, setTimeStamp] = useState(null);
  const fetchTimestamp = async () => {
    const apiUrl = process.env.REACT_APP_API_URL;
    try {
      const endPoint= `${apiUrl}/date?${dateInput}`
      const response = await axios.get(endPoint);
      setTimeStamp(response.data);
    } catch (error) {
      console.error(error);
      setTimeStamp({ error: 'Error fetching timestamp' });
    }
  };
  return (
    <div className="App">
      <h1 className='timeStamp-title'>Timestamp Microservice</h1>
      <hr></hr>
      <input type="text"
        placeholder='Enter a Date'
        value={dateInput}
        onChange={(e) => setDateInput(e.target.value)}
      />
      <button onClick={fetchTimestamp}>FetchTimeStamp</button>
      <div>
        {timeStamp && (
          <div>
            <h3>Unix: {timeStamp.unix}</h3>
            <h3>UTC: {timeStamp.utc}</h3>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
