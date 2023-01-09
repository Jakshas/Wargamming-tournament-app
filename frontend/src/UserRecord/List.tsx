import { useMutation, useQuery } from "@apollo/client";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { GET_LIST_FOR_USER_IN_EVENT, SET_LIST_FOR_USER_IN_EVENT, USER_BY_ID_QUERY } from "../GraphQL";
import Spinner from 'react-spinner-material';

interface IListProps{
    token:number
}

export function List(params:IListProps){
    const {eventID, userID} = useParams();
    const {data, loading} = useQuery(GET_LIST_FOR_USER_IN_EVENT, {variables:{eventID: eventID, userID: userID}});
    const user = useQuery(USER_BY_ID_QUERY, {variables:{ userid: userID }});
    const [list, setList] = useState(data?.getListForUserInEvent);
    const [mutatefunction] = useMutation(SET_LIST_FOR_USER_IN_EVENT);
    
    function onClick() {
        mutatefunction({variables:{eventID: eventID, userID: userID, list:list}});
    }

    if (loading) {
        return <Spinner radius={120} color={"rgb(218, 218, 218)"} stroke={2} visible={true} />
      }
    if (params.token === Number(userID)) {
        return(<>
            <h3>List of {user.data?.userByID.name}</h3>
            <textarea defaultValue={data?.getListForUserInEvent} onChange={e => setList(e.target.value)}></textarea><br/>
            <button onClick={onClick}>Change</button>
        </>)
    }

    return(<><h3>List of {user.data?.userByID.name}</h3> <div style={{whiteSpace: "pre-wrap", textAlign:"left"} }>{data?.getListForUserInEvent}</div></>)
}