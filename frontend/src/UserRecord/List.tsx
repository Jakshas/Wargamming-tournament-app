import { useMutation, useQuery } from "@apollo/client";
import React, { useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { GET_LIST_FOR_USER_IN_EVENT, SET_LIST_FOR_USER_IN_EVENT } from "../GraphQL";

interface IListProps{
    token:number
}

export function List(params:IListProps){
    const {eventID, userID} = useParams();
    const reff = useRef()
    const {data, loading} = useQuery(GET_LIST_FOR_USER_IN_EVENT, {variables:{eventID: eventID, userID: userID}});
    const [list, setList] = useState(data?.getListForUserInEvent);
    const [mutatefunction] = useMutation(SET_LIST_FOR_USER_IN_EVENT);
    
    function onClick() {
        mutatefunction({variables:{eventID: eventID, userID: userID, list:list}});
    }

    if (loading) {
        return(
            <span>Loading</span>
        )
    }

    if (params.token == Number(userID)) {
        return(<>
            <textarea defaultValue={data?.getListForUserInEvent} onChange={e => setList(e.target.value)}></textarea><br/>
            <button onClick={onClick}>Change</button>
        </>)
    }

    return(<div style={{whiteSpace: "pre-wrap", textAlign:"left"} }>{data?.getListForUserInEvent}</div>)
}