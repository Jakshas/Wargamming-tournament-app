
import { Link, useNavigate } from "react-router-dom"
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
    bonusPoints: number
    place: number
  }

interface EventUserRecordProps {
    record: IEventUserRecord;
    index: number
}

export function EventUserRecordDetails(props: EventUserRecordProps){
    const navigate = useNavigate();
    const { record} = props;

    function onClickList(){
        navigate("/event/"+ props.record.event.id +"/user/"+ record.user.id);
    }
    
    return(
        <>
        <tr>
             <td><Link to={"/event/"+ record.event.id}>{record.event.name}</Link></td>
             <td>{record.place !== 0 ? record.place : "In Progress"}</td>
             <td>{record.wins}</td>
             <td>{record.loses}</td>
             <td>{record.points}</td>
             <td>{record.bonusPoints}</td>
             <td><button className="ListButton" onClick={onClickList}>List</button></td>
        </tr>
        </>
    )
}