import { useMutation } from "@apollo/client"
import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { IEvent } from "../Event/Event"
import { SET_BONUS_POINTS } from "../GraphQL"
import { IUser } from "../User/User"

export interface IEventUserRecord {
    id: number
    user: IUser
    event: IEvent
    rounds: number
    points: number
    wins: number
    loses: number
    list: String
    bonusPoints: number
  }

interface EventUserRecordProps {
    record: IEventUserRecord;
    index: number
}

export function EventUserRecord(props: EventUserRecordProps){
    const navigate = useNavigate();
    const [mutateFunction] = useMutation(SET_BONUS_POINTS);
    const { record, index} = props;
    const [bonuspoints, setBonusPoints] = useState(record.bonusPoints);

    function onClick(){
        navigate("/event/"+ props.record.event.id +"/user/"+ record.user.id);
    }
    function onBlur(){
        mutateFunction({variables:{id: record.id, bonusPoints: bonuspoints}})
    }
    return(
        <tr>
             <td>{index}</td><td>{record.user.name}</td><td>{record.wins}</td><td>{record.loses}</td><td>{record.points}</td><td><input type="number" defaultValue={bonuspoints} onChange={e => setBonusPoints(Number(e.target.value))} onBlur={onBlur}/></td><td><button onClick={onClick}>List</button></td>
        </tr>
    )
}