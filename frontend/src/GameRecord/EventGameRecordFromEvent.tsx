import { useQuery } from "@apollo/client";
import { GET_EVENT_GAME_RECORD_FROM_EVENT_FOR_GAME_QUERY } from "../GraphQL";
import React from "react";
import { IEventGameRecord, EventGameRecord } from "./EventGameRecord";
import { Link, useParams } from "react-router-dom";
import Spinner from 'react-spinner-material';

export function EventGameRecordFromEvent(){
    const { id, gamenumber } = useParams()
    const { data, loading } = useQuery(GET_EVENT_GAME_RECORD_FROM_EVENT_FOR_GAME_QUERY, {
        variables: {eventid: id, round: gamenumber },fetchPolicy:"no-cache"
    });
    if (loading) {
      return <Spinner radius={120} color={"rgb(218, 218, 218)"} stroke={2} visible={true} />
    }

    return (
    <div style={{textAlign:"left"}}>
        <table>
          
            <thead>
              <tr>
                <th>Table</th>
                <th>Player one name</th>
                <th>Player one points</th>
                <th>Player two name</th>
                <th>Player two points</th>
              </tr>
            </thead>
          <tbody>
            {data?.getEventGameRecordForEventForGame.map((event: IEventGameRecord, idx: number) => (
              <EventGameRecord key={idx} record={event} index={idx+1} />
            ))}
          </tbody>
        </table>
        <div className="Navdiv"><Link to={"/event/"+ id}>Back to Event</Link></div>
      </div>
  );
}