import { useQuery } from '@apollo/client';
import React, { useEffect }  from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { GET_EVENT_USER_RECORD_FROM_EVENT_SUMMARY_QUERY } from '../GraphQL';
import { IUser } from '../User/User';
import { IEvent } from './Event';
import { IEventUserRecordSummary, EventUserRecordSummary } from "../UserRecord/EventUserRecordSummary";
import Spinner from 'react-spinner-material';

export function EventSumarry() {
    const navigate = useNavigate();
    const { id } = useParams()
    const { data, error, loading } = useQuery(GET_EVENT_USER_RECORD_FROM_EVENT_SUMMARY_QUERY, {
        variables: {eventid: id },
        fetchPolicy: "no-cache"
    });
    
    if (loading) {
      return <Spinner radius={120} color={"rgb(218, 218, 218)"} stroke={2} visible={true} />
    }

    return( <table className="listContainer">
    <thead>
        <tr>
          <th>Place</th>
          <th>Name</th>
          <th>Wins</th>
          <th>Loses</th>
          <th>Points</th>
          <th>SoS</th>
          <th>List</th>
        </tr>
        </thead>
        <tbody>
        {data?.getEventUserRecordForEventSummary.map((record: IEventUserRecordSummary, idx: number) => (
            <EventUserRecordSummary key={idx} record={record} index={idx+1} />
        ))}
        </tbody>
      </table>)
}