import React from "react";
import { useQuery } from "@apollo/client";
import { GET_QUEUE_OF_EVENT } from "../GraphQL";
import { QueueEntry, IQueueEntry } from "./QueueEntry";
import Spinner from 'react-spinner-material';

export interface Props{
    eventID:number
    organizerID:number
    token: number
}

export function QueueForEvent(props:Props) {
    const { data , loading} = useQuery(GET_QUEUE_OF_EVENT, {variables:{eventID: props.eventID},fetchPolicy: "no-cache"});

    if (loading) {
      return <Spinner radius={120} color={"rgb(218, 218, 218)"} stroke={2} visible={true} />
    }


    if(data?.getQueueOfEvent.length > 0 ){
      return(<div>
          <h3>Queue</h3>
            <table  className="listContainer">
            <thead>
              <tr>
                <th>Name</th>
              </tr>
              </thead>
              <tbody>
                {data?.getQueueOfEvent.map((queue: IQueueEntry, idx: number) => (
                  <QueueEntry key={idx} queue={queue} organizerID={props.organizerID} lookinguserID={props.token} eventID={props.eventID} />
                ))}
                </tbody>
              </table>
          </div>)
          }
    return(<></>)
}