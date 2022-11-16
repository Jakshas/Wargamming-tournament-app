import { useQuery } from "@apollo/client";
import { GET_EVENT_GAME_RECORD_FROM_EVENT_QUERY } from "../GraphQL";
import React from "react";
import { IEventGameRecord, EventGameRecord } from "./EventGameRecord";
import { useParams } from "react-router-dom";
export function EventGameRecordFromEvent(){
    const { id } = useParams()
    const { data, error, loading } = useQuery(GET_EVENT_GAME_RECORD_FROM_EVENT_QUERY, {
        variables: { id }
    });

    return (
        <ul className="listContainer">
            {data?.events.map((event: IEventGameRecord, idx: number) => (
              <EventGameRecord key={idx} record={event} />
            ))}
          </ul>
  );
}