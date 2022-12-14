import { Event } from "../Event/Event";

export interface IUser {
    id: number;
    name: string;
    email: string;
    password: string;
    events: [typeof Event]
    // eventUserRecords: [EventUserRecord]
  }

interface UserProps {
    user: IUser;
}

export function User(props: UserProps){
    const { user } = props;
    return(
        <tr>
            <td>{user.name}</td><td>{user.email}</td>
        </tr>
    )
}