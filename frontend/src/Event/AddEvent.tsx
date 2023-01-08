import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ADD_EVENT_MUTATION } from "../GraphQL";
import { IUser } from "../User/User";
import Spinner from 'react-spinner-material';

interface EventProps{
    organizer: string;
}

export function AddEvent(props: EventProps) {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [description, setDesc] = useState("");
    const [rounds, setRounds] = useState(0);
    const [roundTime, setRoundTime] = useState(0);
    const [ mutateFunction, {loading}] = useMutation(ADD_EVENT_MUTATION);

    if (loading) {
        return <Spinner radius={120} color={"rgb(218, 218, 218)"} stroke={2} visible={true} />
      }

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();

        mutateFunction({variables:{name: name, maxRounds: rounds, organizer: props.organizer, roundTime: roundTime, descryption: description},
            onCompleted: (addEvent) => {
                navigate('/event/' + addEvent.addEvent);
                window.location.reload(); 
            }});
      }
      function validate():String[] {
        let errorTable :String[] = [];  
        if (rounds == 0) {
            errorTable.push("Rounds cannot be 0");
        }
        if (roundTime == 0) {
            errorTable.push("Round time cannot be 0");
        }
        if (rounds > 10) {
            errorTable.push("Rounds cannot be more than 10");
        }
        if(name.length > 100){
            errorTable.push("Name can be no longer than 100 characters");
        }
        if(name.length == 0){
            errorTable.push("Name cannot be blank");
        }
        return errorTable;
      }
      let validation :String[] = validate();
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
            <label>
                <p>Round time in minutes</p>
                <input type="number" onChange={e => setRoundTime(Number(e.target.value))}/>
            </label>
            <label>
                <p>Description</p>
                <textarea onChange={e => setDesc(e.target.value)}/>
            </label>
            <div>
                <button className="SubbmitButton" type="submit" disabled={validation.length != 0}>Submit</button>
            </div>
            </form>
            {validation.map((error: String, idx: number) => (
                <span key={idx} style={{color:"red"}}>{error}<br/></span>
              ))}
        </div>
    )
}