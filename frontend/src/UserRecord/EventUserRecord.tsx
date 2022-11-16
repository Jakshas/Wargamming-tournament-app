import React from "react"
import { IEvent } from "../Event/Event"
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
  }

interface EventUserRecordProps {
    record: IEventUserRecord;
}

export function EventUserRecord(props: EventUserRecordProps){
    const { record } = props;
    return(
        <li>
            <span> {record.id}, {record.event.name}, {record.user.name}, {record.wins} , {record.loses}, {record.points}<br/>{record.list}</span>
        </li>
    )
}