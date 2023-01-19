import { useNavigate } from "react-router-dom"
import { IEvent } from "../Event/Event"
import { IUser } from "../User/User"

export interface IEventUserRecordSummary {
    id: number
    user: IUser
    event: IEvent
    rounds: number
    points: number
    wins: number
    loses: number
    list: String
    bonusPoints: number
    sos: number
}

interface EventUserRecordSummaryProps {
    record: IEventUserRecordSummary;
    index: number
}

export function EventUserRecordSummary(props: EventUserRecordSummaryProps) {
    const navigate = useNavigate();
    const { record, index } = props;

    function onClick() {
        navigate("/event/" + props.record.event.id + "/user/" + record.user.id);
    }
    return (
        <tr>
            <td>{index}</td>
            <td>{record.user.name}</td>
            <td>{record.wins}</td>
            <td>{record.loses}</td>
            <td>{record.points}</td>
            <td>{record.sos}</td>
            <td><button className="ListButton" onClick={onClick}>List</button></td>
        </tr>
    )
}