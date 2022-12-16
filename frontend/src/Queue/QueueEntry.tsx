import { USER_BY_ID_QUERY, DELETE_FROM_QUEUE, ADD_USER_TO_EVENT_QUERY, GET_QUEUE_OF_EVENT, GET_EVENT_USER_RECORD_FROM_EVENT_QUERY } from '../GraphQL';
import { useQuery, useMutation } from '@apollo/client';
import { useState } from 'react';


export interface IQueueEntry{
    id:number,
    userID:number,
    eventID:number

}

export interface QueueEntryProps{
    queue:IQueueEntry
    organizerID:number
    lookinguserID:number
    eventID:number
}


export function QueueEntry(props: QueueEntryProps) {
    const userByID = useQuery(USER_BY_ID_QUERY, {variables:{userid: props.queue.userID}});
    const [mutatefunctionDelete] = useMutation(DELETE_FROM_QUEUE);
    const [mutatefunctionAdd,{loading}] = useMutation(ADD_USER_TO_EVENT_QUERY);
    const [enabled, setEnabled] = useState(false);
    const {queue, organizerID,lookinguserID} = props;

    function onClick(){
        mutatefunctionDelete({variables:{ id: props.queue.id }});
        mutatefunctionAdd({variables:{ userID: props.queue.userID, eventID: props.queue.eventID},refetchQueries: [
            { query: GET_QUEUE_OF_EVENT,variables:{eventID: props.eventID} }, {query : GET_EVENT_USER_RECORD_FROM_EVENT_QUERY, variables: {eventid: props.eventID }}
            ]})
        setEnabled(true);
    }

    return(
        <tr>
            {userByID.loading ? <></> : 
            <> 
                <td>{userByID.data.userByID.name}</td>
            {lookinguserID == organizerID && <td><button disabled = {enabled} onClick={onClick}>Accept</button></td>}
         </>}

    </tr>
    )
}