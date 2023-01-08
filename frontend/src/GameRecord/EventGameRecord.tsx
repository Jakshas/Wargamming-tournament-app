import { useMutation } from "@apollo/client"
import React, { useState } from "react"
import { IEvent } from "../Event/Event"
import { SET_MATCH_POINTS } from "../GraphQL"
import { IUser } from "../User/User"
import useID from '../Hooks/useID';
import { Link } from "react-router-dom"
export interface IEventGameRecord {
    id: number
    event: IEvent
    round: number
    playerOne: IUser
    playerTwo: IUser
    playerOnePoints: number
    playerTwoPoints: number
    done: boolean
  }

interface EventGameRecordProps {
    record: IEventGameRecord;
    index: number
}

export function EventGameRecord(props: EventGameRecordProps){
    const {ID} = useID();
    const { record } = props;
    const [playerOnePoints, setplayerOnePoints] = useState(record.playerOnePoints);
    const [playerTwoPoints, setplayerTwoPoints] = useState(record.playerTwoPoints);
    const [enable , setEnable] = useState(true);
    const [mutation] = useMutation(SET_MATCH_POINTS);
    function onClick() {
        mutation({variables:{matchID: record.id, playerOnePoints: playerOnePoints, playerTwoPoints: playerTwoPoints}});
        setEnable(false);
    }

    return(
        <tr className={(!record.done && enable) ? "none" : "Settled"}>
            <td>{props.index}</td>
            <td style={  Number(ID) === record.playerOne.id ? { backgroundColor:"yellow"}: {}}><Link to={"/event/"+ props.record.event.id +"/user/"+ record.playerOne.id} style={{color:"purple"}}>{record.playerOne.name}</Link></td>
            <td>{ record.event.organizer.id === Number(ID) ? <input type="number" defaultValue={playerOnePoints} onChange={e => setplayerOnePoints(Number(e.target.value))}></input>: playerOnePoints}</td>
            <td style={ record.playerTwo != null &&  Number(ID) === record.playerTwo.id ? { backgroundColor:"rgb(253, 255, 105)" }: {}}>{record.playerTwo != null ? <Link to={"/event/"+ props.record.event.id +"/user/"+ record.playerTwo.id} style={{color:"purple"}}>{record.playerTwo.name}</Link>: "BYE" }</td>
            <td>{ record.event.organizer.id === Number(ID) ? <input type="number" disabled={!record.playerTwo} defaultValue={playerTwoPoints} onChange={e => setplayerTwoPoints(Number(e.target.value))}></input>: playerTwoPoints}</td>
            {(!record.done && enable && record.event.organizer.id === Number(ID)) && <td><button className="SettleScore" onClick={onClick}>Settle score</button></td>}
        </tr>
    )
}