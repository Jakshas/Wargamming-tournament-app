import { useQuery } from "@apollo/client";
import { EVENT_QUERY } from "../GraphQL";
import React from "react";
import { IEvent, Event } from "./Event";
export function EventList(){
    const { data, error, loading } = useQuery(EVENT_QUERY);

    return (
        <ul className="listContainer">
            {data?.events.map((event: IEvent, idx: number) => (
              <Event key={idx} event={event} />
            ))}
          </ul>
  );
}