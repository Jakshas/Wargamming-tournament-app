import { useQuery } from "@apollo/client";
import { STATS_FOR_USER } from "../GraphQL";
import useID from "../useID";
import { EventUserRecordFromUser } from "../UserRecord/EventUserRecordFromUser";

interface UserStats{
    wins:number
    loses:number
    averagePoints:number
}

export function UserDetails(){
    const {ID, setID} = useID();
    const {data, loading, error} = useQuery(STATS_FOR_USER, {variables:{ id: ID }});


    return(<>
        <table>
            <thead>
                <tr>
                    <th>Wins</th>
                    <th>Loses</th>
                    <th>Average Points</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>
                        {data?.statsForUser.wins}
                    </td>
                    <td>
                        {data?.statsForUser.loses}
                    </td>
                    <td>
                        {data?.statsForUser.averagePoints}
                    </td>
                </tr>
            </tbody>
        </table>
        <EventUserRecordFromUser></EventUserRecordFromUser>
    </>)
}