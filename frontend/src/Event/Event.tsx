import { IUser } from "../User/User";
import { USER_BY_ID_QUERY, USER_IN_EVENT, ADD_TO_QUEUE_EVENT, GET_QUEUE_OF_EVENT } from '../GraphQL';
import { useMutation, useQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import { IEventGameRecord } from "../GameRecord/EventGameRecord";
import { IEventUserRecord } from "../UserRecord/EventUserRecord";
import Spinner from 'react-spinner-material';

export interface IEvent {
  id: number
  name: String
  organizer: IUser
  participants: [IUser]
  maxRounds: number
  round: number
  roundStart: String
  lastCalled: String
  eventGameRecords: [IEventGameRecord]
  eventUserRecords: [IEventUserRecord]
  state: "DONE" | "INPROGRESS" | "BEFORE"
}

interface EventProps {
  event: IEvent;
  user: number
}

export function Event(props: EventProps) {
  const user = useQuery(USER_BY_ID_QUERY, { variables: { userid: props.event.organizer.id } });
  const inevent = useQuery(USER_IN_EVENT, { variables: { userID: props.user, eventID: props.event.id } });
  const [mutatefunction, { loading }] = useMutation(ADD_TO_QUEUE_EVENT)
  const { event } = props;

  if (loading || inevent.loading || user.loading) {
    return <Spinner radius={120} color={"rgb(218, 218, 218)"} stroke={2} visible={true} />
  }

  function checkStatus() {
    return props.event.state === "BEFORE" ? (inevent.data && (inevent.data.userInEvent === "Not" ? <button className="SignButton" disabled={inevent.loading} onClick={onClick}>Sign up</button> : inevent.data.userInEvent)) : (props.event.state === "INPROGRESS" ? "In Progress" : "Done")
  }

  function onClick() {
    mutatefunction({
      variables: { eventID: props.event.id, userID: props.user },
      refetchQueries: [{ query: USER_IN_EVENT, variables: { userID: props.user, eventID: props.event.id } }, { query: GET_QUEUE_OF_EVENT, variables: { eventID: props.event.id } }]
    });
  }

  return (
    <tr>
      <td><Link to={"/event/" + event.id}>{event.name}</Link></td>
      <td>{user.data && user.data.userByID.name}</td>
      <td>{checkStatus()}</td>
    </tr>
  )
}