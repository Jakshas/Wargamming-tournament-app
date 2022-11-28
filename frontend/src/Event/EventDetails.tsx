import { useMutation, useQuery } from "@apollo/client";
import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { EVENT_BY_ID_QUERY, MAKE_PARINGS } from "../GraphQL";
import { QueueForEvent } from "../Queue/QueueForEvent";
import { EventUserRecordFromEvent } from "../UserRecord/EventUserRecordFromEvent";
import { RoundsList } from "./RoundsList";
 
interface EventDetailsProps{
    token:number
}

export function EventDetails(props: EventDetailsProps){
    const { id } = useParams()
    const event = useQuery(EVENT_BY_ID_QUERY,{variables:{id:id}});
    const [mutation, {data, loading}] = useMutation(MAKE_PARINGS);
    const [hours, setHours] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);
    const [deadline, setDeadline] = useState(event.data?.eventByID.roundEnd || "");

    function onClick(){
        mutation({variables:{eventID:id}, 
        onCompleted: () => {
            window.location.reload(); 
        }});
    }
    const getTime = () => {
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
    }

    useEffect(() => {
        const interval = setInterval(() => getTime(), 1000);
    
        return () => clearInterval(interval);
      }, []);

    if (loading) {
        return(<>Loading</>)
    }

    return(<>
        {event.loading? <span>LOADING</span>: 
            <div style={{textAlign: "left"}}>
                <h3>Details</h3>
                {deadline !== null && <h2>{hours}:{minutes}:{seconds}</h2>}
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
                <EventUserRecordFromEvent />
                <QueueForEvent eventID={Number(id)} organizerID={event.data?.eventByID.organizer.id} token={props.token}/>
                <RoundsList rounds={event.data?.eventByID.round} maxRounds={event.data?.eventByID.maxRounds} eventID={Number(id)}/><br/>
                {event.data?.eventByID.round == event.data?.eventByID.maxRounds ? <Link to={"/event/"+ id +"/summary"} >Summary of Event</Link> :
                <button onClick={onClick}>{event.data?.eventByID.round == 0 ? "Start Event" : "Next Round"}</button>}
            </div>}
    </>)
}