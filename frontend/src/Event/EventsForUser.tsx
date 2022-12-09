import { useQuery } from "@apollo/client";
import { EVENTS_OF_USER, EVENT_QUERY } from "../GraphQL";
import React, { useState } from "react";
import { IEvent, Event } from "./Event";
import Spinner from 'react-spinner-material';
interface EventListProps {
  user: number
}


export function EventsForUser(props: EventListProps){
    const [inputValue, setInputValue] = useState("");
    const { data, error, loading } = useQuery(EVENTS_OF_USER,{variables:{userid: props.user}});

    let events = data ? data.eventsOfUser: [];
    events = events.filter((event:IEvent) => event.name.includes(inputValue));
    
    if (loading) {
      return <Spinner radius={120} color={"rgb(218, 218, 218)"} stroke={2} visible={true} />
    }

    return (
      <div style={{textAlign: "left"}}>
        <label >Search <input value={inputValue} onChange={(e) => setInputValue(e.target.value)}></input></label>
        
          <table>  
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Organizer</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {events.map((event: IEvent, idx: number) => (
                <Event key={idx} event={event} user={props.user} />
              ))}
            </tbody>
            </table>
      </div>
  );
}