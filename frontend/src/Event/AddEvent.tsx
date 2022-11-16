import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ADD_EVENT_MUTATION } from "../GraphQL";
import { IUser } from "../User/User";

interface EventProps{
    organizer: string;
}

export function AddEvent(props: EventProps) {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [rounds, setRounds] = useState(0);
    const [ mutateFunction, {loading}] = useMutation(ADD_EVENT_MUTATION);

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();

        mutateFunction({variables:{name: name, maxRounds: rounds, organizer: props.organizer},
            onCompleted: (addEvent) => {
                navigate('/event/' + addEvent.addEvent);
                window.location.reload(); 
            }});
      }
    return(
        <div>
            <form onSubmit={handleSubmit}>
            <label>
                <p>Name</p>
                <input type="text" onChange={e => setName(e.target.value)}/>
            </label>
            <label>
                <p>Rounds</p>
                <input type="number" onChange={e => setRounds(Number(e.target.value))}/>
            </label>
            <div>
                <button type="submit">Submit</button>
            </div>
            </form>
        </div>
    )
}