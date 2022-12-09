import { useMutation } from "@apollo/client"
import React, { useState } from "react"
import { IEvent } from "../Event/Event"
import { SET_MATCH_POINTS } from "../GraphQL"
import { IUser } from "../User/User"

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
}

export function EventGameRecord(props: EventGameRecordProps){
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
            <td>{record.playerOne.name}</td>
            <td><input type="number" defaultValue={playerOnePoints} onChange={e => setplayerOnePoints(Number(e.target.value))}></input></td>
            <td>{record.playerTwo ? record.playerTwo.name: "BYE" }</td>
            <td><input type="number" disabled={!record.playerTwo} defaultValue={playerTwoPoints} onChange={e => setplayerTwoPoints(Number(e.target.value))}></input></td>
            <td>{(!record.done && enable) && <button onClick={onClick}>Settle score</button>}</td>
        </tr>
    )
}