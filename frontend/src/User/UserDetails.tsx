import { useQuery } from "@apollo/client";
import { STATS_FOR_USER } from "../GraphQL";
import useID from "../Hooks/useID";
import { EventUserRecordFromUser } from "../UserRecord/EventUserRecordFromUser";

export function UserDetails(){
    const {ID} = useID();
    const {data} = useQuery(STATS_FOR_USER, {variables:{ id: ID }});


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