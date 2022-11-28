import { useQuery } from "@apollo/client";
import { GET_EVENT_GAME_RECORD_FROM_EVENT_FOR_GAME_QUERY, GET_EVENT_GAME_RECORD_FROM_EVENT_QUERY } from "../GraphQL";
import React from "react";
import { IEventGameRecord, EventGameRecord } from "./EventGameRecord";
import { Link, useParams } from "react-router-dom";
export function EventGameRecordFromEvent(){
    const { id, gamenumber } = useParams()
    const { data, error, loading } = useQuery(GET_EVENT_GAME_RECORD_FROM_EVENT_FOR_GAME_QUERY, {
        variables: {eventid: id, round: gamenumber },fetchPolicy:"no-cache"
    });
    if (loading) {
      return(<>Loading</>)
    }

    return (
    <div style={{textAlign:"left"}}>
      <Link to={"/event/"+ id}>Back to Event</Link>
        <table>
          
            <thead>
              <tr>
                <th>Player one name</th>
                <th>Player one points</th>
                <th>Player two name</th>
                <th>Player two points</th>
                <th></th>
              </tr>
            </thead>
          <tbody>
            {data?.getEventGameRecordForEventForGame.map((event: IEventGameRecord, idx: number) => (
              <EventGameRecord key={idx} record={event} />
            ))}
          </tbody>
        </table>
      </div>
  );
}