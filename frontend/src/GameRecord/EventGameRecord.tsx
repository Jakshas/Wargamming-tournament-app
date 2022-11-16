import React from "react"
import { IEvent } from "../Event/Event"
import { IUser } from "../User/User"

export interface IEventGameRecord {
    id: number
    event: IEvent
    round: number
    playerOne: IUser
    playerTwo: IUser
    playerOnePoints: number
    playerTwoPoints: number
  }

interface EventGameRecordProps {
    record: IEventGameRecord;
}

export function EventGameRecord(props: EventGameRecordProps){
    const { record } = props;
    return(
        <li>
            <span> {record.id}, {record.round}, {record.playerOne.name}, {record.playerOnePoints} , {record.playerTwo.name}, {record.playerTwoPoints}</span>
        </li>
    )
}