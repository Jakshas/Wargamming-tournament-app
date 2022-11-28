import { useQuery } from "@apollo/client";
import { ORGANIZED_EVENTS } from "../GraphQL";
import React from "react";
import { IEvent, Event } from "./Event";

interface EventListProps {
  user: number
}


export function EventOrgaznizingList(props: EventListProps){
    const { data, error, loading } = useQuery(ORGANIZED_EVENTS, {variables:{userid: props.user}});

    return (
      <div style={{textAlign: "left"}}>
        <h3>Organized Events</h3>
      {loading ? <span >LOADING</span> : 
        <table className="listContainer">
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Organizer</th>
              <th>Status</th>
            </tr>
            {data?.organizedEvents.map((event: IEvent, idx: number) => (
              <Event key={idx} event={event} user={props.user} />
            ))}
          </table>
      }</div>
  );
}