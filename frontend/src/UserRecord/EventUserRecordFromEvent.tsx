import { useQuery } from "@apollo/client";
import { GET_EVENT_USER_RECORD_FROM_EVENT_QUERY } from "../GraphQL";
import React from "react";
import { IEventUserRecord, EventUserRecord } from "./EventUserRecord";
import { useParams } from "react-router-dom";

export function EventUserRecordFromEvent(){
    const { id } = useParams()
    const { data, error, loading } = useQuery(GET_EVENT_USER_RECORD_FROM_EVENT_QUERY, {
        variables: {eventid: id },
        fetchPolicy: "no-cache"
    });

    return (<>
    <h3>Participants</h3>
        <table className="listContainer">
        <thead>
            <tr>
              <th>Place</th>
              <th>Name</th>
              <th>Wins</th>
              <th>Loses</th>
              <th>Points</th>
              <th>Bonus Points</th>
              <th>List</th>
            </tr>
            </thead>
            <tbody>
            {data?.getEventUserRecordForEvent.map((event: IEventUserRecord, idx: number) => (
              <EventUserRecord key={idx} record={event} index={idx+1} />
            ))}
            </tbody>
          </table>
          </>
  );
}