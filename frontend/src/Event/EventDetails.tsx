import { useMutation, useQuery } from "@apollo/client";
import React, { useCallback, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ADD_TO_QUEUE_EVENT, CHANGE_DESCRIPTION, EVENT_BY_ID_QUERY, GET_QUEUE_OF_EVENT, MAKE_PARINGS, USER_IN_EVENT } from "../GraphQL";
import { QueueForEvent } from "../Queue/QueueForEvent";
import { EventUserRecordFromEvent } from "../UserRecord/EventUserRecordFromEvent";
import { RoundsList } from "./RoundsList";
import Spinner from 'react-spinner-material';
import useID from "../Hooks/useID";

interface EventDetailsProps{
    token:number
}

export function EventDetails(props: EventDetailsProps){
    const { id } = useParams()
    const {ID} = useID();
    const event = useQuery(EVENT_BY_ID_QUERY,{variables:{id:id}});
    const inevent = useQuery(USER_IN_EVENT, {variables:{ userID: ID, eventID: id }});
    const [mutation, {loading}] = useMutation(MAKE_PARINGS);
    const [mutatefunction] = useMutation(ADD_TO_QUEUE_EVENT);
    const [mutatefunctionDesc] = useMutation(CHANGE_DESCRIPTION);
    const [hours, setHours] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);
    const [deadline, setDeadline] = useState("");
    const [description, setDescription] = useState("");

    function onClick(){
        mutation({variables:{eventID:id}, 
        onCompleted: () => {
            window.location.reload(); 
        }});
    }
    function onChangeDesc(){
        mutatefunctionDesc({
            variables:{id: id, description:description}})
    }
    function onClickSignup(){
        mutatefunction({
            variables:{eventID: id, userID: ID}, 
            refetchQueries: [{query: USER_IN_EVENT,variables:{ userID: ID, eventID: id }}, {query: GET_QUEUE_OF_EVENT, variables:{eventID: id}}]
          });
    }
    const getTime = useCallback(() => {
        const time = Date.parse(deadline) - Date.now();
        if (time < 0) {
            setHours(0);
            setMinutes(0);
            setSeconds(0);
        }else{
            setHours(Math.floor((time / (1000 * 60 * 60)) % 24));
            setMinutes(Math.floor((time / 1000 / 60) % 60));
            setSeconds(Math.floor((time / 1000) % 60));
        }
    },[deadline])
    useEffect(()=> {
        if(event.data !== undefined){
            setDeadline(event.data?.eventByID.roundEnd);
        }
        else
        {
            setDeadline("1/1/2000")
        }
        setDescription(event.data?.eventByID.description);
            
    }, [event.loading, event.data])

    useEffect(
        () => {
            getTime();
            const interval = setInterval(() => getTime(), 1000);
    
            return () => clearInterval(interval);      
      }, [deadline, getTime]);

    if (loading || event.loading || inevent.loading) {
        return <Spinner radius={120} color={"rgb(218, 218, 218)"} stroke={2} visible={true} />
    }

    return(<>
        {
            <div>
                {deadline !== "1/1/2000" && deadline !== null && <h2>{hours}:{minutes}:{seconds}</h2>}
                <h3>Details</h3>
                <div className="EventDetails">
                    <table>  
                        <thead>
                            <tr>
                                <th>Event name</th>
                                <th>Rounds</th>
                                <th>Number of participants</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{event.data?.eventByID.name}</td>
                                <td>{event.data?.eventByID.maxRounds}</td>
                                <td>{event.data?.eventByID.eventUserRecords.length}</td>
                            </tr>
                        </tbody>
                    </table>
                    {inevent.data.userInEvent === "Not" && <button className="SignButton" disabled ={inevent.loading} onClick={onClickSignup}>Sign up</button>}
                </div>
                <EventUserRecordFromEvent />
                <QueueForEvent eventID={Number(id)} organizerID={event.data?.eventByID.organizer.id} token={props.token}/>
                <RoundsList rounds={event.data?.eventByID.round} maxRounds={event.data?.eventByID.maxRounds} eventID={Number(id)}/><br/>
                {event.data?.eventByID.round === event.data?.eventByID.maxRounds + 1 ? <div className="Round"><Link to={"/event/"+ id +"/summary"} >Summary of Event</Link></div> :
                event.data?.eventByID.organizer.id === ID && <button onClick={onClick}>{event.data?.eventByID.round === 0 ? "Start Event" : event.data?.eventByID.round === event.data?.eventByID.maxRounds ? "End Event" : "Next Round"}</button>}
                <br/>
                <h3>Description</h3>
                {event.data?.eventByID.organizer.id === ID ?<> <textarea defaultValue={description} onChange={e => setDescription(e.target.value)}></textarea><br/><button onClick={onChangeDesc}>Change Description</button></> : <div style={{whiteSpace: "pre-wrap", textAlign:"left"} }>{description}</div>}
            </div>}
    </>)
}