import React from "react";
import { useQuery } from "@apollo/client";
import { GET_QUEUE_OF_EVENT } from "../GraphQL";
import { QueueEntry, IQueueEntry } from "./QueueEntry";

export interface Props{
    eventID:number
    organizerID:number
    token: number
}

export function QueueForEvent(props:Props) {
    const { data , loading} = useQuery(GET_QUEUE_OF_EVENT, {variables:{eventID: props.eventID},fetchPolicy: "no-cache"});

    if(loading) return(<span>LOADING</span>);


    if(data?.getQueueOfEvent.length > 0 ){
      return(<div>
          <h3>Queue</h3>
            <table  className="listContainer">
            <thead>
              <tr>
                <th>Name</th>
                <th></th>
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