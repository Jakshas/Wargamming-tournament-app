import { useQuery } from "@apollo/client";
import { GET_EVENT_USER_RECORD_FROM_USER_QUERY } from "../GraphQL";
import React from "react";
import { IEventUserRecord, EventUserRecord } from "./EventUserRecord";
import { useParams } from "react-router-dom";
import Spinner from 'react-spinner-material';

export function EventUserRecordFromUser(){
    const { id } = useParams()
    const { data, error, loading } = useQuery(GET_EVENT_USER_RECORD_FROM_USER_QUERY, {
        variables: { id }
    });

    if (loading) {
      return <Spinner radius={120} color={"rgb(218, 218, 218)"} stroke={2} visible={true} />
    }

    return (
        <ul className="listContainer">
            {data?.events.map((event: IEventUserRecord, idx: number) => (
              <EventUserRecord key={idx} record={event} index={idx+1} />
            ))}
          </ul>
  );
}