import { useMutation } from "@apollo/client"
import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { IEvent } from "../Event/Event"
import { DELETE_USER_FROM_EVENT, GET_EVENT_USER_RECORD_FROM_EVENT_QUERY, SET_BONUS_POINTS } from "../GraphQL"
import { IUser } from "../User/User"
import { Confirm } from "react-admin"
import useID from "../Hooks/useID"

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

export function EventUserRecord(props: EventUserRecordProps) {
    const { ID } = useID();
    const navigate = useNavigate();
    const [setMutation] = useMutation(SET_BONUS_POINTS);
    const [deleteMuatation] = useMutation(DELETE_USER_FROM_EVENT);
    const { record, index } = props;
    const [bonuspoints, setBonusPoints] = useState(record.bonusPoints);
    const [open, setOpen] = useState(false);

    function onClickList() {
        navigate("/event/" + props.record.event.id + "/user/" + record.user.id);
    }

    function onBlur() {
        setMutation({ variables: { id: record.id, bonusPoints: bonuspoints } })
    }
    return (
        <>
            <tr>
                <td>{index}</td>
                <td>{record.user.name}</td>
                <td>{record.wins}</td>
                <td>{record.loses}</td>
                <td>{record.points}</td>
                <td>{Number(record.event.organizer.id) === Number(ID) ? <input type="number" data-testid="point-input" defaultValue={bonuspoints} onChange={e => setBonusPoints(Number(e.target.value))} onBlur={onBlur} /> : bonuspoints}</td>
                <td><button className="ListButton" onClick={onClickList}>List</button></td>
                {Number(record.event.organizer.id) === Number(ID) && <td ><button className="ListButton" onClick={() => setOpen(true)}>Delete user</button></td>}
            </tr>
            <Confirm
                isOpen={open}
                title="confirm deletion"
                content={"Do you want to delete user?"}
                onConfirm={() => { deleteMuatation({ variables: { id: record.id }, refetchQueries: [{ query: GET_EVENT_USER_RECORD_FROM_EVENT_QUERY, variables: { eventid: record.event.id } }], onCompleted: () => setOpen(false) }); window.location.reload(); }}
                onClose={() => setOpen(false)}
                confirm="Yes"
                cancel="No"
            />
        </>
    )
}