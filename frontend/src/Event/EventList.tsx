import { useQuery } from "@apollo/client";
import { EVENT_QUERY } from "../GraphQL";
import React, { useState } from "react";
import { IEvent, Event } from "./Event";

interface EventListProps {
  user: number
}


export function EventList(props: EventListProps){
    const [inputValue, setInputValue] = useState("");
    const { data, error, loading } = useQuery(EVENT_QUERY);

    let events = data ? data.events: [];
    events = events.filter((event:IEvent) => event.name.includes(inputValue));
    
    return (
      <div style={{textAlign: "left"}}>
        <label >Search <input value={inputValue} onChange={(e) => setInputValue(e.target.value)}></input></label>
        
        {loading ? <span>LOADING</span> : 
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
        }
      </div>
  );
}