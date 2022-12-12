import React from "react";
import { Link } from "react-router-dom";

interface IRoundsList{
    eventID:number
    rounds: number
    maxRounds: number
}

export function RoundsList(props: IRoundsList) {
    const rows = [];
    for (let i = 1; i <= props.rounds && i <= props.maxRounds ; i++) {
        rows.push(<div className="Round" key={i}><Link key={i} to={"/event/"+ props.eventID+"/game/" + i} >Round {i} </Link></div>);
    }
    for (let i = props.rounds + 1; i <= props.maxRounds; i++) {
        rows.push(<div className="Round" key={i}><span key={i} >Round {i} </span></div>);
    }
    return <div className="RoundBox">{rows}</div>;
}