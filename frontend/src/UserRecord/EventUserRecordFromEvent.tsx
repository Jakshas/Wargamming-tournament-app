import { useQuery } from "@apollo/client";
import { GET_EVENT_USER_RECORD_FROM_EVENT_QUERY } from "../GraphQL";
import React from "react";
import { IEventUserRecord, EventUserRecord } from "./EventUserRecord";
import { useParams } from "react-router-dom";
export function EventUserRecordFromEvent(){
    const { id } = useParams()
    const { data, error, loading } = useQuery(GET_EVENT_USER_RECORD_FROM_EVENT_QUERY, {
        variables: { id }
    });

    return (
        <ul className="listContainer">
            {data?.events.map((event: IEventUserRecord, idx: number) => (
              <EventUserRecord key={idx} record={event} />
            ))}
          </ul>
  );
}