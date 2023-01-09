import { useQuery } from "@apollo/client";
import { EVENTS_OF_USER, EVENT_QUERY, ORGANIZED_EVENTS } from "../GraphQL";
import React, { useState } from "react";
import { IEvent, Event } from "./Event";
import Spinner from 'react-spinner-material';

interface EventListProps {
  user: number
}


export function EventList(props: EventListProps){
    const [inputValue, setInputValue] = useState("");
    const allevents = useQuery(EVENT_QUERY);
    const organizedevents = useQuery(ORGANIZED_EVENTS, {variables:{userid: props.user}});
    const usersevents = useQuery(EVENTS_OF_USER,{variables:{userid: props.user}});
    const [radio, setRadio] = useState("ALL");
    let events = allevents.data?.events;
    if (radio === "ORG") {
      events =  organizedevents.data?.organizedEvents;
    }else{
      if (radio === "MY") {
        events =  usersevents.data?.eventsOfUser;
      }
    }
    if (allevents.loading || usersevents.loading || organizedevents.loading) {
      return <Spinner radius={120} color={"rgb(218, 218, 218)"} stroke={2} visible={true} />
    }
    
    events = events.filter((event:IEvent) => event.name.includes(inputValue));

    return (
      <div style={{textAlign: "left"}}>
        <div>
        <label >Search <input value={inputValue} onChange={(e) => setInputValue(e.target.value)}></input></label>
        <div>
          <input type="radio" value={"ALL"} name="search" checked={radio === "ALL"}  onChange={(event) => setRadio(event.target.value)}/> <label>All Events</label> 
          <input type="radio"  value={"ORG"} name="search" checked={radio === "ORG"} onChange={(event) => setRadio(event.target.value)}/> <label>Organized by You</label>  
          <input type="radio"  value={"MY"} name="search"  checked={radio === "MY"} onChange={(event) => setRadio(event.target.value)}/> <label>My Events</label> 
        </div>
        </div>
          <table>  
            <thead>
              <tr>
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