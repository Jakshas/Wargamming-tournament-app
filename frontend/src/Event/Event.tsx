import { IUser, User } from "../User/User";

export interface IEvent {
    id: number
    name: String
    organizer: IUser
    participants: [IUser]
    maxRounds: number
    round: number
    // eventGameRecords: [EventGameRecord]
    // eventUserRecords: [EventUserRecord]
  }

interface EventProps {
  event: IEvent;
}

export function Event(props: EventProps){
  const { event } = props;
  return(
      <li>
          <span> {event.id}, {event.name}, {event.organizer.id} </span>
      </li>
  )
}