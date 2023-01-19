import { useQuery } from "@apollo/client";
import { GET_EVENT_USER_RECORD_FROM_USER_QUERY } from "../GraphQL";
import { IEventUserRecord, EventUserRecordDetails } from "./EventUserRecordDetails";
import { useParams } from "react-router-dom";
import Spinner from 'react-spinner-material';

export function EventUserRecordFromUser(){
    const { id } = useParams()
    const { data, loading } = useQuery(GET_EVENT_USER_RECORD_FROM_USER_QUERY, {
        variables: {userid: id }
    });

    if (loading) {
      return <Spinner radius={120} color={"rgb(218, 218, 218)"} stroke={2} visible={true} />
    }

    return (
        <table>
          <thead>
            <tr>
              <th>Event</th>
              <th>Place</th>
              <th>Wins</th>
              <th>Loses</th>
              <th>Points</th>
              <th>Bonus Points</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {data?.getEventUserRecordForUser.map((event: IEventUserRecord, idx: number) => (
              <EventUserRecordDetails key={idx} record={event} index={idx+1} />
            ))}      
          </tbody>
          </table>
  );
}