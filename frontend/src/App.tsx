import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Routes,
  useNavigate
} from "react-router-dom";
import { UserList } from "./User/UserList"
import { Login } from "./Login/Login"
import { Register } from "./Login/Register"
import { EventList } from "./Event/EventList"
import { AddEvent } from "./Event/AddEvent"
import { EventUserRecordFromUser } from "./UserRecord/EventUserRecordFromUser"
import { EventUserRecordFromEvent } from "./UserRecord/EventUserRecordFromEvent"
import { EventGameRecordFromEvent } from "./GameRecord/EventGameRecordFromEvent"
import useToken from './useToken';
import { useState } from 'react';
import { USER_BY_ID_QUERY } from './GraphQL';
import { useQuery } from '@apollo/client';

function App() {
  const {token, setToken} = useToken();
  const {data, error} = useQuery(USER_BY_ID_QUERY, {variables:{ userid: token }});

  if(!token) {
    return <Router>
      <Routes>
        <Route path="*" element={<Login setToken={setToken} />} />
        <Route path="/register" element={<Register/>} />
      </Routes>
      
    </Router>
  }

  return (
    <div>
      <Router>
      <h2>Wargamming Tournament App</h2>
      {data !== undefined && <span>{ data.userByID.name }   </span>}
        <button onClick={() => {
          sessionStorage.removeItem('auth-token');
          window.location.reload(); 
      }}>Logout</button>
      <ul>
      <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/userlist">User list</Link>
        </li>
        <li>
          <Link to="/eventlist">Event list</Link>
        </li>
        <li>
          <Link to="/event/add">Add Event</Link>
        </li>

      </ul>
        <div className="App">
          <Routes>
            <Route path="/" element={<div/>} />
            <Route path="/userlist" element={<UserList/>} />
            <Route path="/eventlist" element={<EventList/>} />
            <Route path="/user/:id" element={<EventUserRecordFromUser/>} />
            <Route path="/event/:id" element={<EventUserRecordFromEvent/>} />
            <Route path="/event/add" element={<AddEvent organizer={token} />} />
            <Route path="/event/:id/games" element={<EventGameRecordFromEvent/>} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
