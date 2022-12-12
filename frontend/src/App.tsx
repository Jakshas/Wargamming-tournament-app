import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Routes,
  useNavigate
} from "react-router-dom";
import { UserList } from "./User/UserList"
import { UserDetails } from "./User/UserDetails"
import { Login } from "./Login/Login"
import { Register } from "./Login/Register"
import { EventList } from "./Event/EventList"
import { EventsForUser } from "./Event/EventsForUser"
import { EventSumarry } from "./Event/EventSumarry"
import { AddEvent } from "./Event/AddEvent"
import { EventDetails } from "./Event/EventDetails"
import { EventUserRecordFromUser } from "./UserRecord/EventUserRecordFromUser"
import { EventUserRecordFromEvent } from "./UserRecord/EventUserRecordFromEvent"
import { EventGameRecordFromEvent } from "./GameRecord/EventGameRecordFromEvent"
import useToken from './useToken';
import { USER_BY_ID_QUERY } from './GraphQL';
import { useQuery } from '@apollo/client';
import { EventOrgaznizingList } from "./Event/EventOrganizingList";
import { List } from "./UserRecord/List";
import useID from './useID';
import image from './Images/image.jpg';
import Spinner from 'react-spinner-material';

function App() {
  const {token, setToken} = useToken();
  const {ID, setID} = useID();
  const {data, loading, error} = useQuery(USER_BY_ID_QUERY, {variables:{ userid: ID }});

  if (loading) {
    return <Spinner radius={120} color={"rgb(218, 218, 218)"} stroke={2} visible={true} />
  }

  if (error?.message == "Forbidden") {
    sessionStorage.removeItem('auth-token');
    sessionStorage.removeItem('ID');
    window.location.reload(); 
  }

  if(!token) {
    return(      
      <Routes>
        <Route path="*" element={<Login setToken={setToken} setID={setID} />} />
        <Route path="/register" element={<Register/>} />
      </Routes>)

  }

  return (
    <div className='App'>
      <div className='TitleHeader'>
        <h1>Wargamming Tournament App</h1>
        
        <div className='Login'>
        User: { data?.userByID.name }
        <button className='TitleHeader' onClick={() => {
          sessionStorage.removeItem('auth-token');
          sessionStorage.removeItem('ID');
          window.location.reload(); 
        }}>Logout</button>
        </div>

      </div>
      <ul className='Applist'>
      <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to={"/user/"+ID}>User Details</Link>
        </li>
        <li>
          <Link to="/userlist">Users</Link>
        </li>
        <li>
          <Link to="/eventlist">Events</Link>
        </li>
        <li>
          <Link to="/event/add">Add Event</Link>
        </li>


      </ul>
        <div>
          <Routes>
            <Route path="*" element={<div><img src={image} alt="Image" className='Images' /></div>} />
            <Route path="/userlist" element={<UserList/>} />
            <Route path="/eventlist" element={<EventList user={Number(ID)} />} />
            <Route path="/myevents" element={<EventsForUser user={Number(ID)} />} />
            <Route path="/eventlist/organizing" element={<EventOrgaznizingList user={Number(ID)} />} />
            <Route path="/user/:id" element={<UserDetails/>} />
            <Route path="/event/:id" element={<EventDetails token={Number(ID)}/>} />
            <Route path="/event/:id/summary" element={<EventSumarry/>} />
            <Route path="/event/add" element={<AddEvent organizer={ID ? ID : ""} />} />
            <Route path="/event/:eventID/user/:userID" element={<List token={Number(ID)} />}/>
            <Route path="/event/:id/game/:gamenumber" element={<EventGameRecordFromEvent/>} />
          </Routes>
        </div>
    </div>
  );
}

export default App;
